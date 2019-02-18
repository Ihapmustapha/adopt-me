import React, { Component } from 'react'

class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  }

  static getDerivedStateFromProps({ media }) {
    let photos = []
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo['@size'] === 'pn')
    }
    return { photos }
  }

  handleIndexClick = e => {
    this.setState({ active: +e.target.dataset.index })
  }

  render() {
    const { photos, active } = this.state
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo.value}
              src={photo.value}
              data-index={index}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel
