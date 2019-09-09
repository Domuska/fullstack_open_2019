import React, { useState, useEffect  } from 'react'

import services from './services';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PhoneBookEntries from './components/PhoneBookEntries';
import InfoBox from './components/InfoBox';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ info, setInfo ] = useState({text: null, isError: false});

  const [ filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    console.log('useEffect called');
    
    services
      .getAll()
      .then(people => {
        console.log('response:', people);
        setPersons(people);
        setFilteredPersons(people);
      })
      .catch(err => {
        console.error('error at fetching json:', err);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  // for checking if a single name passes the search filter
  function passesFilter(name, searchTerm) {
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const handleSearchChange = (event) => {
    const { value: newTerm } = event.target;
    setSearchTerm(newTerm);
    if (newTerm !== '') {
      setFilteredPersons(persons.filter(person => passesFilter(person.name, newTerm)));
    } else {
      setFilteredPersons(persons);
    }
  }

  // helper for interacting with the info box object
  const setInfoBox = (text, isError) => {
    setInfo({text, isError});
    setTimeout(() => {
      setInfo({text: null})
    }, 5000)
  }

  const addPersonClickHandler = (event) => {
    event.preventDefault();

    const found = persons.find(person => person.name === newName);

    if (found) {
      // update if user so wishes
      const shouldUpdate = window.confirm(`Update person's ${found.name} number?`);
      if (shouldUpdate) {
        const updatedPerson = {...found, number:newNumber};
      services
        .update(updatedPerson,updatedPerson.id)
        .then(responsePerson => {
          setPersons(persons.map(p => p.id !== found.id ? p : responsePerson));
          setFilteredPersons(filteredPersons.map(p => p.id !== found.id ? p : responsePerson));
          setInfoBox(`Updated person ${responsePerson.name}`, false)
        })
        .catch(err => {
          if (err.response.status === 404) {
            // remove the person from lists
            setPersons(persons.filter(p => p.id !== found.id));
            setFilteredPersons(persons.filter(p => p.id !== found.id));
            setInfoBox(`Failed to update person ${found.name} number, person not found on server`, true);
          } else {
            console.error(err);
            setInfoBox(`Failed to update person ${found.name} number, unknown error`, true);
          }
        });
      }

    } else {
      // add new person
      const newPerson = {name: newName, number: newNumber};

      services
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setInfoBox(`Added person ${person.name}`, false)
          // check if the new person passes the filter that might be set
          if (passesFilter(person.name, searchTerm)) {
            setFilteredPersons(filteredPersons.concat(person));
          }
        })
        .catch(err => {
          alert('Error while adding new person');
          console.err(err);
        })
      
      setNewName('');
      setNewNumber('');
    }
  };

  const deletePersonClickHandler = (person) => {
    const shouldDelete = window.confirm(`Delete person ${person.name}?`);
    if (shouldDelete) {
      services
      .deletePerson(person.id)
      .then(res => {
        setPersons(persons.filter(p => p.id !== person.id));
        setFilteredPersons(filteredPersons.filter(p => p.id !== person.id));
        setInfoBox(`Removed person ${person.name}`, false);
      })
      .catch(err => {
        alert('Error while deleting person');
        console.error(err);
      })
    }
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <InfoBox text={info.text} isError={info.isError}></InfoBox>

      <h3>Search</h3>
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      ></Filter>
      
      <h3>Add new person</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPersonClickHandler={addPersonClickHandler}
      ></PersonForm>

      <h3>Numbers</h3>
      <PhoneBookEntries
        people={filteredPersons}
        deletePersonClickHandler={deletePersonClickHandler}
      ></PhoneBookEntries>
    </div>
  )

}

export default App