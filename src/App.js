import React, {useState, useEffect} from 'react'
import './App.css';
import {Route, Link, Switch} from 'react-router-dom'
import Display from './Display'
import Form from './Form'

function App() {
const url = "http://localhost:4000"

// Create state to hold list of all places
const [places, setPlaces] = useState([])

// empty place - for create form 
const emptyPlace = { 
  img: "", 
  name: "", 
  description: ""
}

// new state for selected places for updating
const [selectedPlace, setSelectedPlace] = useState(emptyPlace)

//get all places
const getPlaces = () => { 
  fetch(url + "/places")
  .then((response) => response.json())
  .then((data) => { 
    setPlaces(data)
  })
}

useEffect(() => { 
  getPlaces()
}, [])

// handleCreate - function for when the Create form is submitted
const handleCreate = (newPlace) => { 
  fetch(url + "/places", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify(newPlace)
  })
  .then(() => getPlaces())
}

// handleUpdate - function for when edited form is submitted
const handleUpdate = (place) => { 
  fetch(url + "/places/" + place._id, { 
    method: "PUT", 
    headers: { 
      "Content-Type": "application/json"
    }, 
    body: JSON.stringify(place)
  })
  .then(() => { 
    getPlaces()
  })
}

// function to specify which place we are updating
const selectPlace = (place) => { 
  setSelectedPlace(place)
}

// deletePlace to delete individual places
const deletePlace = (place) => { 
  fetch (url + "/places/" + place._id, { 
    method: "delete"
  })
  .then(() => getPlaces())
}

  return (
    <div className="App">
      <h1>Your Favorite Places</h1>
      <hr/>
      <Link to="/create">
      <button className="favorite">Add Favorite Place</button>
      </Link>
      <main>
     
        <Switch>
          <Route exact path='/' render={(rp) => <Display {...rp} places={places} selectPlace={selectPlace} deletePlace={deletePlace}/> } />
          <Route exact path='/create' render={(rp) => (<Form {...rp} label="create" place={emptyPlace} handleSubmit={handleCreate}/>)} />
          <Route exact path='/edit' render={(rp) => (<Form {...rp} label="update" place={selectedPlace} handleSubmit={handleUpdate}/>)} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
