import React, { Component } from 'react'
import pf from 'petfinder-client'
import { navigate } from '@reach/router/lib/history'
import Carousel from './Carousel'

const petfinder = pf({
  key: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET
})

class Details extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    petfinder.pet
      .get({
        output: 'full',
        id: this.props.id
      })
      .then(data => {
        const pet = data.petfinder.pet
        let breed = Array.isArray(pet.breeds.breed)
          ? pet.breeds.breed.join(', ')
          : pet.breeds.breed
        this.setState({
          name: pet.name,
          animal: pet.animal,
          location: `${pet.contact.city}, ${pet.contact.state}`,
          description: pet.description,
          media: pet.media,
          breed,
          loading: false
        })
      })
      .catch(() => {
        navigate('/')
      })
  }
  render() {
    const {
      name,
      animal,
      breed,
      location,
      description,
      loading,
      media
    } = this.state

    return loading ? (
      <h1>Loading...</h1>
    ) : (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

export default Details
