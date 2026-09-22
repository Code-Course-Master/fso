import {useState, useEffect} from 'react' 
import climbservice from '../services/climb'

const Country = ({ country }) => {
    const [climb, setClimb] = useState(null)
    const languajes = country.languages

    useEffect(() => {
        climbservice.getClimb(country.capital[0])   
        .then(climb => {
            setClimb(climb)
        })
    },[])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {
                    languajes !== null ?
                    Object.keys(languajes)
                    .map( description => <li key={description}>{languajes[description]}</li>
                    ) :
                    <p>No tiene idiomas</p>
                }
            </ul>
            <img src={country.flags.png} alt={country.flag} />
            {
                climb === null 
                ? 
                null : (
                    <div>
                        <h2>Wather in {climb.name}</h2>
                        <p>Temperature {climb.main.temp} Celsius</p>
                        <img src={`https://openweathermap.org/img/wn/${climb.weather[0].icon}@2x.png`} alt={climb.name} />
                        <p>Wind {climb.wind.speed} m/s</p>
                    </div>
                )
                
            }
            
        </div>
    )
}



export default Country