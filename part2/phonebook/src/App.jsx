import { useEffect, useState } from 'react'
import Persons from './Persons.jsx'
import Filter from './Filter.jsx'
import PersonForm from './PersonForm.jsx'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addName = (e) => {
    e.preventDefault()
    const person = { name: newName, number: newNumber , id: persons.length + 1 }

    const nameExists = persons.some(p => p.name === newName || p.number === newNumber)
    if (nameExists) {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
      return
    }
    setPersons([...persons, person])
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App