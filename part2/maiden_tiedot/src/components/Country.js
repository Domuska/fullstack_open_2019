import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Country = (({country}) => {

  const [wind, setWind] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weatherImgSrc, setWeatherImgSrc] = useState('');

    // just deal with showing the single country, let Content handle the logic
    const getLanguages = () => {
        return country.languages.map(language => {
            return (
                <li key={language.iso639_1}>{language.name}</li>
            );
        });
    }

    const apiKey = ''; // enter your apixu API key here
    if (apiKey === '') throw new Error('Enter API key before using this app');
    const requestUrl = `http://api.apixu.com/v1/current.json?key=${apiKey}&q=`;

    useEffect(() => {
      axios
        .get(`${requestUrl}${country.capital}`)
        .then(res => {
          console.log('got weather response:');
          console.log(res.data);
          setWind(res.data.current.wind_kph);
          setTemperature(res.data.current.temp_c);
          setWeatherImgSrc(res.data.current.condition.icon);
        })
        .catch(err => console.error(err));

    }, []);


    return (
        <>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>{getLanguages()}</ul>
            <img src={country.flag} style={{maxWidth:'350px'}}></img>
            <h2>Weather</h2>
            <p>Current temperature: {temperature}C</p>
            <img src={weatherImgSrc}></img>
            <p>Wind:{wind}</p>
        </>
    )
});

export default Country;