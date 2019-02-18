import React, { Component } from 'react'
import './App.css'
import Pet from './Pet'
import pf from 'petfinder-client'
import SearchBox from './SearchBox'

const petfinder = pf({
  key: process.env.REACT_APP_API_KEY
})

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pets: []
    }
  }

  componentDidMount() {
    petfinder.pet
      .find({ output: 'full', location: 'Seattle, WA' })
      .then(data => {
        let pets =
          data.petfinder.pets && data.petfinder.pets.pet
            ? Array.isArray(data.petfinder.pets.pet)
              ? data.petfinder.pets.pet
              : [data.petfinder.pets.pet]
            : []
        this.setState({ pets })
      })
  }

  render() {
    return (
      <div className="search">
        <SearchBox />
        {this.state.pets.map(pet => {
          let breed = Array.isArray(pet.breeds.breed)
            ? pet.breeds.breed.join(', ')
            : pet.breeds.breed

          return (
            <Pet
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          )
        })}
      </div>
    )
  }
}

export default Results
