import React, { Component } from 'react'
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './ViewCharacter.css'

const { REACT_APP_API_URL, REACT_APP_PUBLIC_KEY } = process.env

class ViewCharacter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      character: {
        name: '',
        comics: {},
        thumbnail: {},
        id: '',
      },
      loading: true
    }
    this.apiUrl = `${REACT_APP_API_URL}/characters/${this.props.match.params.id}`;
  }

  // Lifecycle method
  componentDidMount() {
    this.fetchResults()
  }

  fetchResults () {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl, {
      params: {
        apikey: REACT_APP_PUBLIC_KEY
      }
    }).then(res => {
      // Set state with result
      this.setState(() => ({
        character: res.data.data.results[0],
        loading: false
      }));
    });
  }

  render() {
    const { name, thumbnail, comics } = this.state.character;

    return (
      <div className="character-info">
        <Card className="card-info">
          <div className="details-info">
            <CardMedia
              className="cover-info"
              image={`${thumbnail.path}.${thumbnail.extension}`}
              title="Marvel character"
            />
            {comics && comics.items ? (
              <CardContent>
                <Typography variant="headline">{name}</Typography>
                <Typography variant="body2">Character comics</Typography>
                {comics.items.map((el, index) => {
                  return (
                    <Typography paragraph key={index}>{el.name}</Typography>
                  )
                })}
              </CardContent>
            ) : (
              <span>loading</span>
            )}
          </div>
        </Card>
      </div>
    )
  }
}

export default ViewCharacter;
