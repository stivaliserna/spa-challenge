import React, { Component } from 'react'
import axios from 'axios'

import CharacterList from './CharacterList'

const { REACT_APP_API_URL } = process.env

class SearchBar extends Component {
  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.props.onChange}
        />
      </form>
    )
  }
}

export default SearchBar
