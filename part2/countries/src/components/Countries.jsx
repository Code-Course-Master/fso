const Countries = ({ countries, showCountry}) => {
    
    return (
        <ul>
            {countries.map(country => {
                return (
                    <li key={country.name.common}>{country.name.common}
                        {
                            countries.length > 10 ?
                            null
                            :
                            <button onClick={() => {showCountry(country.name.common)}}>Show</button>
                        }
                    </li>
                    
                )
            })}
        </ul>
    )
}

export default Countries