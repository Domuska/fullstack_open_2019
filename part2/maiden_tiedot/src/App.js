import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Search from './components/Search';
import Content from './components/Content';


const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ visibleCountries, setVisibleCountries ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
        setVisibleCountries(res.data);
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
      setVisibleCountries(countries.filter(country => countryPassesFilter(country.name, newSearchTerm)));
    } else {
      setVisibleCountries(countries.slice());
    }
  }

  const onShowCountryClick = (numericCode) => {
    console.log('onShowCountryClick', numericCode);
    
    setVisibleCountries(countries.filter(country => country.numericCode === numericCode));
  }; 

  return(
    <div>  
      <Search onSearchChange={onSearchChange} searchTerm={searchTerm}></Search>
      <Content countries={visibleCountries} onShowCountryClick={onShowCountryClick}></Content>
    </div>
  )
};

export default App;
