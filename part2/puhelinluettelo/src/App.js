import React, { useState } from 'react'

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PhoneBookEntries from './components/PhoneBookEntries';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchTerm, setSearchTerm ] = useState('');

  // copy array to prevent possibly odd behaviour that could happen (?)
  const [ filteredPersons, setFilteredPersons] = useState(persons.slice());
  console.log(filteredPersons);

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
      window.alert(`${newName} has already been added, please choose another`);
    } else {
      const newPerson = {name: newName, number: newNumber};
      setPersons(persons.concat(newPerson));

      // check if the new person passes the filter that might be set
      if (passesFilter(newName, searchTerm)) {
        setFilteredPersons(filteredPersons.concat(newPerson));
      }
      setNewName('');
      setNewNumber('');
    }
  };

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
      ></PhoneBookEntries>
    </div>
  )

}

export default App