import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import Header from './header/Header'
import Footer from './footer/Footer'
import CharacterList from './CharacterList'
import ViewCharacter from './ViewCharacter'

import './App.css'

class MarvelApp extends Component {
  render () {
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={() => <Redirect to='/characters' />}
            />

            <Route exact path='/characters' component={CharacterList} />

            <Route path='/characters/:id' component={ViewCharacter} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </React.Fragment>
    )
  }
}

export default MarvelApp
