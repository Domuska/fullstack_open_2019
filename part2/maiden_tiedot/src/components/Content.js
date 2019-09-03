import React from 'react';

import CountryList from './CountryList';
import Country from './Country';


const Content = ({countries, onShowCountryClick}) => {
  // figure out what we should be showing
  if (countries.length > 10) {
    return (
      <p>Too many countries, please make your filter more specific</p>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]}></Country>
    )
  }

  return (
    <CountryList countries={countries} onShowCountryClick={onShowCountryClick}>
    </CountryList>
  )
}

export default Content;