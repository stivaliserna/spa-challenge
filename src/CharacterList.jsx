import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './CharacterList.css'

const { REACT_APP_API_URL, REACT_APP_PUBLIC_KEY} = process.env

const CharacterItem = ({character}) => {
  // Each Activity
  return (
    <div className="character">
      <Card className="card">
        <div className="details"></div>
        <CardContent className="content">
          <Typography variant="headline">{character.name}</Typography>
        </CardContent>
        <CardMedia
          className="cover"
          image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          title="Marvel character"
        />
      </Card>
    </div>
  );
};

class CharacterList extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      characters: [],
    };
    this.apiUrl = `${REACT_APP_API_URL}/characters`;
  }

  // Lifecycle method
  componentDidMount() {
    this.fetchResults()
  }

  fetchResults () {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl, {
      params: {
        apikey: REACT_APP_PUBLIC_KEY,
      }
    }).then(res => {
      // Set state with result
      this.setState(() => ({ characters: res.data.data.results }));
    });
  }

  render() {
    const { characters } = this.state
    return (
      <div className="character-list">
        {(characters).map(character => {
          return (
            <Link to={`/characters/${character.id}`} key={character.id}>
              <CharacterItem character={character} />
            </Link>
          )
        })}
      </div>
    );
  }
}

export default CharacterList;
