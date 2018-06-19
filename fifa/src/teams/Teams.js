import React, { Component } from 'react';
import {Image, Col, Row, Carousel, Grid, Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Util from '../utils/Utils.js';
import './Teams.css'


class Teams extends Component {

    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      teams:[]
    };
  }

  componentDidMount() {
       fetch("https://api.fifa.com/api/v1/competitions/teams/17/254645")
        .then(res => res.json())
        .then((result) => {
          var teamsObj = result.Results;
          var teams = [];
          for(let i = 0; i <teamsObj.length; i++){
            var obj = teamsObj[i];
            var flagImg = Util.getFormattedPicture(obj.PictureUrl);
            var team = {
              'id': obj.IdTeam ,
              'name': obj.Name[0].Description ,
              'flagImg': flagImg,
              'teamPage':'/team?teamId='+obj.IdTeam
            }
            teams.push(team);
          }

          teams.sort(function(a, b){
              if(a.name < b.name) return -1;
              if(a.name > b.name) return 1;
              return 0;
          });

          this.setState({
              isLoaded: true,
              teams:teams
          });
        },
       (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    

   render() {
     const { error, isLoaded, items, teams } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
        <Grid fluid>
          <Row>
          <Col md={12} xs={6}>  
           <h1> Teams </h1>
          </Col> 
          </Row>
          <Row>    
         {teams.map((team,indexx) =>
			     
           <Col md={3} xs={6} key={"team-"+team.id}>
           <Link to={team.teamPage}>
           <Well className="center" >
              <div>
               <Image className="teamImage" src={team.flagImg}/>
               </div>
               <div className="gap">
                  {team.name}
               </div>
           </Well>
           </Link>
           </Col>
                             
        )}
        </Row>
		</Grid>
      );
    }
   }
}
export default Teams;