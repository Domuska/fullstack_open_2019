import React, { useState, useEffect  } from 'react'

import services from './services';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PhoneBookEntries from './components/PhoneBookEntries';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');

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
        })
        .catch(err => {
          alert('Error while updating phone number');
          console.error(err);
        });
      }

    } else {
      // add new person
      const newPerson = {name: newName, number: newNumber};

      services
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
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
        console.log(res);
        setPersons(persons.filter(p => p.id !== person.id));
        setFilteredPersons(filteredPersons.filter(p => p.id !== person.id));
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