import { useState, useEffect } from 'react'


import Countries from './components/Countries'
import countriesService from './services/countries'
import Filter from './components/Filter'
import Country from './components/Country'

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')

  const onChangeSelectedCountry = (e) => {
    setSelectedCountry(e.target.value)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
      setCountries(countries)
    })
    
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(selectedCountry.toLowerCase())
  )
  
  const showCountry = (value) => {
    setSelectedCountry(value);
  }

  return (
    <div>
      <Filter filter={selectedCountry} onChange={onChangeSelectedCountry} />
      {
        filteredCountries.length === 1 
        ?  
          <Country country={filteredCountries[0]}/>
        : 
        ( selectedCountry !== '' ?
          (filteredCountries.length > 10 ? (
            <p>To many to macht, specify your search</p>
          ) : (
            <Countries countries={filteredCountries} showCountry={showCountry}/>
          ))
          :
          null
          
        )
      }
    </div>
  )
}

export default App
