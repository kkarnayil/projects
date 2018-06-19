import React, { Component } from 'react';
import logo from '../logo.svg';
import './Header.css';
import {Navbar,Nav,NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Header extends Component {
  render() {
    return (

        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/fifa/#">FIFA WORLDCUP 18</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
               <NavItem eventKey={1} href="/fifa/#">
                HOME
              </NavItem>    

              <NavItem eventKey={1} href="/fifa/#/teams">
                TEAMS
              </NavItem>    

              <NavItem eventKey={1} href="/fifa/#/standings">
                STANDINGS
              </NavItem> 

               <NavItem eventKey={1} href="/fifa/#/topscorers">
                TOP SCORERS
              </NavItem>   

            
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default Header;
