import React, { Component } from 'react'
import { Link } from '@reach/router'
import PropTypes from 'prop-types'

class Pet extends Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props
    let photos =
      media && media.photos && media.photos.photo
        ? media.photos.photo.filter(photo => photo['@size'] === 'pn')
        : []

    const hero = photos[0] ? photos[0].value : 'http://placecorgi.com/300/300'

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={hero} alt={name} />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </Link>
    )
  }
}

Pet.propTypes = {
  name: PropTypes.string,
  animal: PropTypes.string,
  breed: PropTypes.string,
  media: PropTypes.object,
  location: PropTypes.string,
  id: PropTypes.string
}

export default Pet
