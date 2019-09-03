import React from 'react'

const Search = ({searchTerm, onSearchChange}) => {
  return(
    <>
    <p>Enter search term</p>
    <input value={searchTerm} onChange={onSearchChange}></input>
    </>
  )
}

export default Search;