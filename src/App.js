import React, { Component } from 'react'
import Results from './Results'
import { Router, Link } from '@reach/router'
import pf from 'petfinder-client'
import { Provider } from './SearchContext'
import Details from './Details'
import SearchParams from './SearchParams'

const petfinder = pf({
  key: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'Seatle, WA',
      animal: '',
      breed: '',
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    }
  }
  handleLocationChange = e => {
    this.setState({ location: e.target.value })
  }

  handleAnimalChange = e => {
    this.setState({ animal: e.target.value, breed: '' }, this.getBreeds)
  }

  handleBreedChange = e => {
    this.setState({ breed: e.target.value })
  }
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          })
        } else {
          this.setState({ breeds: [] })
        }
      })
    } else {
      this.setState({ breeds: [] })
    }
  }
  render() {
    return (
      <div>
        <header id="app-title">
          <Link to="/">
            Adopt Me
            <span aria-label="logo-emojies" role="img">
              🐶🐱🐴🐷🐔
            </span>
          </Link>
          <Link to="/search-params">
            <span aria-label="search" role="img">
              🔍
            </span>
          </Link>
        </header>

        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
