import React from 'react';

const Country = (({country}) => {
    // just deal with showing the single country, let Content handle the logic
    const getLanguages = () => {
        return country.languages.map(language => {
            return (
                <li key={language.iso639_1}>{language.name}</li>
            );
        });
    }

    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>{getLanguages()}</ul>
            <img src={country.flag} style={{maxWidth:'350px'}}></img>
        </>
    )
});

export default Country;