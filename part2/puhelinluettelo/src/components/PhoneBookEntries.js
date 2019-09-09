import React from 'react'

const Entry = ({ name, number }) => {
  return (
    <li>
      {name} : {number}
    </li>
  )
};

const PhoneBookEntries = ({ people, deletePersonClickHandler }) => {
  const getRows = () => { 
    return people.map(person => 
      <div key={person.id}>
        <Entry 
          number={person.number} 
          name={person.name} 
        ></Entry>

        <button 
          onClick={() => deletePersonClickHandler(person)}>
          delete
        </button>

      </div>
    );
  };
  
  return (
    <ul>
      {getRows()}
    </ul>
  )
};

export default PhoneBookEntries;