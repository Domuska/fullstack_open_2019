import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Search from './components/Search';
import Content from './components/Content';


const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ filteredCountries, setFilteredCountries ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        console.log('got countries res:', res.data);
        setCountries(res.data);
        setFilteredCountries(res.data);
      })
      .catch(err => {
        console.log('error while fetching countries:', err);
        
      })
  }, []);

  function countryPassesFilter(name, searchTerm) {    
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  const onSearchChange = (event) => {
    const { value: newSearchTerm } = event.target;
    console.log('onsearchchagnge, value:', newSearchTerm);
    setSearchTerm(newSearchTerm);
    if (newSearchTerm !== '') {
      setFilteredCountries(countries.filter(country => countryPassesFilter(country.name, newSearchTerm)));
    } else {
      setFilteredCountries(countries.slice());
    }
  }

  return(
    <div>  
      <Search onSearchChange={onSearchChange} searchTerm={searchTerm}></Search>
      <Content countries={filteredCountries}></Content>
    </div>
  )
};

export default App;
