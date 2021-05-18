import React from 'react'
import './App.css';

const Display = ({places, selectPlace, history, deletePlace}) => {

    const loaded = () => (
        <div className="places" >
            {places.map((place) => ( 
                <article className="card" key={place._id}>
                    <img className="image" src={place.img}/>
                    <h1>{place.name}</h1>
                    <h3>{place.description}</h3>
                    <button onClick={() => {
                        selectPlace(place)
                        history.push('/edit')
                    }}>Edit </button>
                    <button onClick={() => {deletePlace(place)}}>Delete</button>
                </article>
            ))}
        </div>
    )

    const loading = () => <h1>Loading...</h1>

    return places.length > 0 ? loaded() : loading()
}

export default Display
