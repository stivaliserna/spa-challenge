import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

import './SearchBar.css'

class SearchBar extends Component {
  render () {
    return (
      <form className='search-bar' noValidate autoComplete='off'>
        <TextField
          label='Search by name'
          onChange={this.props.onChange}
          margin='normal'
        />
      </form>
    )
  }
}

export default SearchBar
