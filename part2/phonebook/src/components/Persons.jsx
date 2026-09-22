const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <ul>
      { persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(
        person => <li key={person.id}>{person.name} {person.number} 
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li> 
      )}
    </ul>
  )
}

export default Persons