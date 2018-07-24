import React, { Component } from 'react'
import axios from 'axios'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import red from '@material-ui/core/colors/red';

import './ViewCharacter.css'

const { REACT_APP_API_URL, REACT_APP_PUBLIC_KEY } = process.env

class ViewCharacter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      character: {
        name: '',
        description: '',
        stories: {},
        thumbnail: {},
        id: ''
      },
      comics: [],
      loading: true
    }
    this.apiUrl = `${REACT_APP_API_URL}/characters/${
      this.props.match.params.id
    }`
  }

  // Lifecycle method
  componentDidMount () {
    this.fetchCharacterResults()
    this.fetchComicsResults()
  }

  fetchCharacterResults () {
    // Make HTTP reques with Axios
    axios
      .get(this.apiUrl, {
        params: {
          apikey: REACT_APP_PUBLIC_KEY
        }
      })
      .then(res => {
        // Set state with result
        this.setState(() => ({
          character: res.data.data.results[0],
          loading: false
        }))
      })
  }

  fetchComicsResults () {
    // Make HTTP reques with Axios
    axios
    .get(`${this.apiUrl}/comics`, {
      params: {
        apikey: REACT_APP_PUBLIC_KEY
      }
    })
    .then(res => {
      // Set state with result
      this.setState(() => ({
        comics: res.data.data.results,
        loading: false
      }))
    })
  }

  render () {
    const { name, thumbnail, description } = this.state.character
    const { comics } = this.state
    return (
      <div className='character-info'>
        {comics.length ? (
          <Card className='card-info'>
            <div className='details-info'>
              <CardMedia
                className='cover-info'
                image={`${thumbnail.path}.${thumbnail.extension}`}
                title='Marvel character'
              />
                <CardContent>
                  <Typography gutterBottom variant='display1'>{name}</Typography>
                  <Typography component='p'>{description}</Typography>
              </CardContent>
            </div>
            <Divider />
            <Grid container>
              {comics.map((el, index) => {
                return (
                  <Grid item xs key={index}>
                    <img
                      className="comic-img"
                      src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Card>
        ) : (
          <CircularProgress size={70} style={{ color: red[600] }} />
        )}
      </div>
    )
  }
}

export default ViewCharacter
