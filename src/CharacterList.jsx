import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SearchBar from './SearchBar'
import debounce from './utils/debounce'

import './CharacterList.css'

const { REACT_APP_API_URL, REACT_APP_PUBLIC_KEY } = process.env

const CharacterItem = ({ character }) => {
  // Each Activity
  return (
    <div className='character'>
      <Card className='card'>
        <div className='details' />
        <CardContent className='content'>
          <Typography variant='headline'>{character.name}</Typography>
        </CardContent>
        <CardMedia
          className='cover'
          image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          title='Marvel character'
        />
      </Card>
    </div>
  )
}
class CharacterList extends Component {
  constructor (props) {
    // Pass props to parent class
    super(props)
    // Set initial state
    this.state = {
      characters: [],
      filterCriteria: '',
      order: ''
    }
    this.apiUrl = `${REACT_APP_API_URL}/characters`

    this.handleFilter = this.handleFilter.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.fetchResults = this.fetchResults.bind(this)
    this.deboundedFetch = debounce(500, this.fetchResults.bind(this))
  }

  // Lifecycle method
  componentDidMount () {
    this.fetchResults()
  }

  fetchResults () {
    // Make HTTP reques with Axios
    axios
      .get(this.apiUrl, {
        params: {
          apikey: REACT_APP_PUBLIC_KEY,
          nameStartsWith: this.state.filterCriteria || null,
          orderBy: this.state.order || 'name'
        }
      })
      .then(res => {
        // Set state with result
        this.setState(() => ({ characters: res.data.data.results }))
      })
  }

  handleFilter (event) {
    this.setState(
      {
        filterCriteria: event.target.value
      },
      () => this.deboundedFetch()
    )
  }

  handleSort (event) {
    this.setState(
      {
        order: event.target.value
      },
      () => this.fetchResults()
    )
  }

  render () {
    const { characters, order } = this.state
    return (
      <div className="list-box">
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <SearchBar onChange={this.handleFilter} />
          </Grid>
          <Grid item xs={6}>
            <form className="sort-form">
              <FormControl className="form-control">
                <InputLabel>Order by</InputLabel>
                <Select
                  value={order}
                  onChange={this.handleSort}
                >
                  <MenuItem value="name">Name ascending</MenuItem>
                  <MenuItem value="-name">Name descending</MenuItem>
                  <MenuItem value="modified">First modified</MenuItem>
                  <MenuItem value="-modified">Last modified</MenuItem>
                </Select>
              </FormControl>
            </form>
          </Grid>
        </Grid>

        <Grid className="character-list" container spacing={24}>
          {characters.map(character => {
            return (
              <Grid item xs={12} sm={6} lg={4} xl={3} key={character.id}>
                <Link to={`/characters/${character.id}`}>
                  <CharacterItem character={character} />
                </Link>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}

export default CharacterList
