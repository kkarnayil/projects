import React, { Component } from 'react';
import {Col, Row, Grid, Table} from 'react-bootstrap';



class Standings extends Component {
    

    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      groups: {},
    };
  }

   me = this;


   componentDidMount() {
     fetch("https://api.fifa.com/api/v1/calendar/17/254645/275073/Standing")
      .then(res => res.json())
      .then((result) => {
       
        var groups = {};
        
        for(var i = 0 ; i < result.Results.length; i++){

        		var _result = result.Results[i];
          	if(undefined != _result && undefined != _result.Group && undefined != _result.Team.Name){
          		var  groupName = _result.Group[0].Description;
          		var  teamName  = _result.Team.Name[0].Description;
          	
          		var team = {
          			name  : teamName,
          			group : groupName,
          			played: _result.Played,
          			won   : _result.Won,
          			lost  : _result.Lost,
          			drawn : _result.Drawn,
          			position : _result.Position,
          			points: _result.Points

          		};

          		var _group = groups[groupName];
          		if(undefined == _group){
          			_group = [];
          			_group.push(team);
          			groups[groupName] = _group;
          		}else{          			
          	   		_group.push(team);
          		}   
          	}

        }

        const orderedGroups = {};
		  Object.keys(groups).sort().forEach(function(key) {
			  orderedGroups[key] = groups[key];
			});
       
        this.setState({
            isLoaded: true, 
            groups: orderedGroups       
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

    const { error, isLoaded,groups } = this.state;
    	var _groups = Object.keys(groups);
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
      return (
        <Grid fluid>
          <Row>
          <Col md={12} xs={6}>  
           <h1> Standings </h1>
          </Col> 
          </Row>
          {_groups.map((group, index) => 
          	 <div key={index} id={index}>
          	 <Row>
          	   <Col md={12}>
          		<h3>{group}</h3> 
          		</Col>   	
          	 </Row>
	          <Row>	              	
	          		<Table responsive condensed>
							  <thead>
							    <tr>
							      <th>Team</th>
							      <th>Played</th>
							      <th>Won</th>
							      <th>Lost</th>
							      <th>Drawn</th>
							      <th>Points</th>
							    </tr>
							  </thead>
							  <tbody>
							  {groups[group].map((team,indexx) =>							     
							    <tr key={indexx} id={indexx}>
							    	<td>{team.name}</td>
							      <td>{team.played}</td>
							      <td>{team.won}</td>
							      <td>{team.lost}</td>
							      <td>{team.drawn}</td>
							      <td>{team.points}</td>
							    </tr>
							    )}
							  </tbody>
							</Table>							
	          </Row>
	          </div>
          )}
         </Grid>
      );
    }
   }

}
export default Standings;