import React, { Component } from 'react';
import {Col, Row, Grid, Table} from 'react-bootstrap';



class TopScorers extends Component {
    

    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      scorers: [],
    };
  }

   me = this;


   componentDidMount() {
     fetch("https://api.fifa.com/api/v1/topseasonplayerstatistics/season/254645/topscorers")
      .then(res => res.json())
      .then((result) => {
       
        var _scorers = [];
        
        for(var i = 0 ; i < result.PlayerStatsList.length; i++){

        		var _result = result.PlayerStatsList[i];
            console.log(_result);
          	if(undefined != _result && undefined != _result.PlayerInfo){
          		var  name = _result.PlayerInfo.PlayerName[0].Description;
          		var  teamName  = _result.PlayerInfo.TeamName[0].Description;
          	
          		var scorer = {
          			name  : name,
          			teamName : teamName,
                assits: _result.Assists,
          			matchesPlayed: _result.MatchesPlayed,
          			totalAttemps   : _result.TotalAttempts,
          			attemptsOnTarget  : _result.AttemptsOnTarget,
          			goalsScored : _result.GoalsScored,         			
          		};

              _scorers.push(scorer);
          	}

        }
        console.log(_scorers);

       
       
        this.setState({
            isLoaded: true, 
            scorers: _scorers       
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


   render() {

    const { error, isLoaded,scorers } = this.state;
    	if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
        <Grid fluid>
          <Row>
          <Col md={12} xs={12}>  
           <h1> Top Scorers </h1>
          </Col> 
          </Row>
          	 
	          <Row>	              	
	          		<Table responsive condensed>
							  <thead>
							    <tr>
							      <th>Name</th>
                    <th>Team Name</th>
                     <th>Goals Scored</th>
							      <th>Matches Played</th>
                    <th>Assists</th>
							      <th>Total Attempts</th>
							      <th>Attempts On Target</th>
							     
							    </tr>
							  </thead>
							  <tbody>
							  {scorers.map((scorer,indexx) =>							     
							    <tr key={indexx} id={indexx}>
							    	<td>{scorer.name}</td>
                    <td>{scorer.teamName}</td>
                     <td>{scorer.goalsScored}</td>  
                    <td>{scorer.matchesPlayed}</td>    
                    <td>{scorer.assits}</td>               
							      <td>{scorer.totalAttemps}</td>
							      <td>{scorer.attemptsOnTarget}</td>
							     					      
							    </tr>
							    )}
							  </tbody>
							</Table>							
	          </Row>        
         </Grid> 
         ); 
   }
 }

}
export default TopScorers;