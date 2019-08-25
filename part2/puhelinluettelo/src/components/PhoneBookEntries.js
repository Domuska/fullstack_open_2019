import React from 'react'

const Entry = ({ name, number }) => {
  return (
    <li>
      {name} : {number}
    </li>
  )
};

const PhoneBookEntries = ({ people }) => {
  const getRows = () => { 
    return people.map(person => 
      <Entry number={person.number} name={person.name} key={person.name}></Entry>
    );
  };
  
  return (
    <ul>
      {getRows()}
    </ul>
  )
};

export default PhoneBookEntries;