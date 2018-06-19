import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {Grid,Row,Col} from 'react-bootstrap';
import './App.css';
import Header from './header/Header.js';
import Home from './home/Home.js';
import Teams from './teams/Teams.js'
import Team  from './team/Team.js'
import Standings from './standings/Standings.js'
import TopScorers from './topscorers/Topscorers.js'

class App extends Component {
  render() {
    return (
       <Router>
        <Grid fluid>
          <Row>
            <div className="App">
              <Header/>
               <Grid fluid>
                  <Row>        
                      <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/teams' component={Teams} />
                        <Route exact path='/standings' component={Standings} />
                        <Route exact path='/topscorers' component={TopScorers} />
                        <Route exact path='/team' component={Team} />
                        <Route exact path='**' component={Home} />
                     </Switch>         
                  </Row>
              </Grid>                       
            </div>
          </Row>
        </Grid>
        </Router>
    );
  }
}

export default App;
