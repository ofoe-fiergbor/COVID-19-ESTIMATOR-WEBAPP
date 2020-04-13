import React, { Component } from 'react'
import Navbar from './Navbar';
import Home from './Home';
import Form from './Form';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path = '/' component = {Home} exact />
          <Route path ='/form' component ={Form} exact />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App


