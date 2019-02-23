import React, { Component } from 'react'
import './App.css'
import Pet from './Pet'
import pf from 'petfinder-client'
import SearchBox from './SearchBox'
import { Consumer } from './SearchContext'
import PropTypes from 'prop-types'

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

  componentDidMount = () => {
    this.search()
  }

  search = () => {
    petfinder.pet
      .find({
        output: 'full',
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
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
        <SearchBox search={this.search} />
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

Results.propTypes = {
  searchParams: PropTypes.object,
  animal: PropTypes.string,
  breed: PropTypes.string
}

// Normal Function not an arrow function because it will show up in the call stack if we've an error
export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  )
}
