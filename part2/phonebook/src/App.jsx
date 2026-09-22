import { useEffect, useState } from 'react'
import Persons from './components/Persons.jsx'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification.jsx'

import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [style, setStyle] = useState(null)
  
  useEffect(() => {

    personService
      .getAll()
      .then(reponse => {
        setPersons(reponse)
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
    const person = { name: newName, number: newNumber}

    const nameExists = persons.find(p => p.name === newName)
    if (nameExists) {
      console.log("si existe");
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(nameExists.id, person)
          .then(response => {
            setPersons(persons.map(p => p.id !== nameExists.id ? p : response))
          })
        setNewName('')
        setNewNumber('')
        window.alert('Number updated successfully')
        return 
      } else {
        setNewName('')
        setNewNumber('')
        return
      }
    }
    personService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response))
      })
    setErrorMessage(`Added ${newName}`)
    setStyle({ color: 'green', background: 'lightgrey', fontSize: 20, borderStyle: 'solid', borderRadius: 5, padding: 10, marginBottom: 10 })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personService
        .eliminatePerson(id)
        .then((response) => {
          setPersons(persons.filter(p => p.id !== response.id))
          window.alert('Person deleted successfully')
        })
        .catch(error => {
          setErrorMessage(`Information of ${persons.find(p => p.id === id).name} has already been removed from server`)
          setStyle({ color: 'red', background: 'lightgrey', fontSize: 20, borderStyle: 'solid', borderRadius: 5, padding: 10, marginBottom: 10 })
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} style={style} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App

















