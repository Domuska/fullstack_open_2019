import React from 'react';

const CountryList = ({countries}) => {
    const mapCountries = () => {
        return countries.map(country => {
            return (
                <li key={country.numericCode}>{country.name}</li>
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