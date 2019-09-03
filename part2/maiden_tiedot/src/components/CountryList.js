import React from 'react';

const CountryList = ({countries, onShowCountryClick}) => {
    // just show the whole list of countries, let Content figure out the logic
    const mapCountries = () => {
        return countries.map(country => {
            return (
                <li key={country.numericCode}>
                    {country.name}
                    <button onClick={() => onShowCountryClick(country.numericCode)}>show</button>
                </li>
            )
        })
    }
    return (
        <ul>
            {mapCountries()}
        </ul>
    )
}

export default CountryList;