import React, { Component } from 'react';
import Util from '../utils/Utils.js';
import {Image, Col, Row, Carousel, Grid, Well} from 'react-bootstrap';
import './Team.css'



class Team extends Component {

    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      players: [],
      team: null
    };
  }

   render() {

    const { error, isLoaded, players, team } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
        <Grid fluid>
          <Row>
          <Col md={12} xs={12}>  
           <h1> {team} - PLAYERS </h1>
          </Col> 
          </Row>
          <Row>    
         {players.map((player,indexx) =>
			     
           <Col md={3} xs={6} key={"player-"+player.id}>
           <Well  className="center" >
              <div>
               <Image className="teamImage" src={player.picture}/>
               </div>
               <div className="gap">
                  {player.name}
               </div>
               <div>
                  {player.role}
               </div>
               <div>
                  Age : {player.age}
               </div>

           </Well>
           </Col>
                             
        )}
        </Row>
		</Grid>
      );
    }
   }

   

   componentDidMount() {
   	 
   	 var teamApi = "https://api.fifa.com/api/v1/teams/{teamId}/squad/all";
   	 var teamId = Util.getParameterByName("teamId", window.location.href);
   	 teamApi = teamApi.replace("{teamId}", teamId);



  	 fetch(teamApi)
      .then(res => res.json())
      .then((result) => {
      		var results = result.Results;
  			var team;
      		var players = [];

      		for(let i = 0 ; i < results.length ; i++){
      			if('254645' === results[i].IdSeason){
      			var _team = results[i];
      			team = _team.TeamName[0].Description;
      			for(let j = 0 ; j < _team.Players.length; j++){
      			var _player = _team.Players[j];
      			 var dob = new Date(_player.BirthDate);
      			 var age = new Date().getYear() - dob.getYear();     			
      			
      			var picture = "https://api.fifa.com/api/v1/picture/players/2018fwc/{playerId}_sq-300_jpg?allowDefaultPicture=true";
      			picture = picture.replace("{playerId}",_player.IdPlayer);
      			var role = "";
      			if(undefined != _player.PositionLocalized){
      				role = _player.PositionLocalized[0].Description;
      			}
      			var player = {
      				id : _player.IdPlayer,
      				name: _player.ShortName[0].Description ,
      				picture: picture ,
      				jerseyNo: _player.JerseyNum,
      				age: age,
      				role: role
      			};

      			players.push(player);
      		   }
      		 }
      		}
        
      	this.setState({
            isLoaded: true,
            players:players,
            team: team
        });
      },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}
export default Team;