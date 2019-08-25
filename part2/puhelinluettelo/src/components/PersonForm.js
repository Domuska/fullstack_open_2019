import React from 'react'

const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPersonClickHandler}) => {
  return (
    <form>
      <div>
        name: 
        <input 
          value={newName}
          onChange={handleNameChange}
        />
        <br></br>
        number: 
        <input
          value={newNumber}
          onChange={handleNumberChange}
        ></input>
      </div>
      <div>
        <button type="submit" onClick={addPersonClickHandler}>add</button>
      </div>
    </form>
  )
}

export default PersonForm;