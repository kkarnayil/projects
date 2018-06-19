import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Image, Button, Panel, PanelGroup, Well, Col, Row, Carousel, Grid} from 'react-bootstrap'
import './Home.css'
import Util from '../utils/Utils.js';



class Home extends Component{

constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  getFormattedPicture(image){
  	image = image.replace("{format}","fwc2018");
    image = image.replace("{size}","5");
    return image;
  }

  componentDidMount() {
    fetch("https://api.fifa.com/api/v1/calendar/matches?idseason=254645&idcompetition=17&language=en-GB&count=100")
      .then(res => res.json())
      .then(
        (result) => {
          var matches = [];
          var groups = {};
          var todays = [];
          for(var i = 0 ; i < result.Results.length; i++){
          	try{
          	var match = result.Results[i];
          	if(match && match.Home && match.Away && match.GroupName){
          		var  groupName = match.GroupName[0].Description;
          		var _matches = groups[groupName];
          		var homePictureImag = Util.getFormattedPicture(match.Home.PictureUrl);
          		var awayPictureImag = Util.getFormattedPicture(match.Away.PictureUrl);

          		var score = "vs";
          		if(undefined != match.HomeTeamScore && undefined != match.AwayTeamScore){
          			score = match.HomeTeamScore +" - "+ match.AwayTeamScore;
          		}
          		var stadium = match.Stadium.CityName[0].Description;
          		var date = new Date(match.Date);
          		var time = date.getHours() +" : "+date.getMinutes();
          		var day  = date.getDate() +" / " + date.getMonth(); 
          		var today = new Date();
          		var todaysDay = today.getDate() +" / " + today.getMonth(); 


          		match = {
          			'home': match.Home.TeamName[0].Description,          			
          			'away': match.Away.TeamName[0].Description,
          			'homeImg': homePictureImag,
          			'awayImg': awayPictureImag,
          			'score': score,
          			'stadium': stadium,
          			'time':time,
          			'day':day

          			}

          		if(todaysDay == day){
          			todays.push(match);
          		}
          		if(undefined == _matches){
          			_matches = [];
          			_matches.push(match);
          			groups[groupName] = _matches;
          		}else{          			
          	   		_matches.push(match);
          		}          		
          	}
          }catch(e){
          	console.log(result.Results[i]);
          }
          	
          }

          console.log(todays);
          
          this.setState({
            isLoaded: true,
            items: groups,
            todays:todays

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

renderScoreRow(match){

		if(match.score != 'vs'){
	      return (
	      		<h2>					 
					  <Col md={12} xs={12} className="GapCarousel">({match.score})</Col>				 
				</h2>

	      	)
	    } else {
	      return (
	      		<h4>
	      			<Row className="center">
							at {match.stadium} stadium
					</Row>
					<Row className="center">
							{match.time}
					</Row>
	      		</h4>
	      )
		}
}

renderCarousel(todays){

	return(

			<Carousel className="Carousel">
					  {todays.map((today,indexx) =>
					  <Carousel.Item className="CarouselItem">
					    <img alt="900x500" src="caro.jpg" />
					    <Carousel.Caption>
					    <Row className="center">
					      <h3>
					      <Col  md={4} xs={12}>
					      {today.home} 
					      </Col>
					      <Col md={4} xs={12}> 
					      vs
					      </Col>
					       <Col md={4} xs={12}> 
					        {today.away}
					       
					        </Col>
					      </h3>
					      </Row>
					        {this.renderScoreRow(today)}
					        
					    </Carousel.Caption>
					  </Carousel.Item>
					  )}
			</Carousel>


	)

}

render() {
	    const { error, isLoaded, items, todays } = this.state;

	    if (error) {
	      return <div>Error: {error.message}</div>;
	    } else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {
			var groups = Object.keys(items);

	      return (
	      	 <Grid fluid>
            	<Row>
	      			{this.renderCarousel(todays)}

					<h3 className="center"> Groups </h3>
		      		  {groups.map((group, index) => 

			      		   <Panel key={"group-"+index} id={"group-"+index}>
				    				<div className="panel-heading">
				    					{group}
				    				</div>
				    				<div className="panel-body">
					            	{items[group].map((match,indexx) =>
							            <Well key={"match-"+index+"-"+indexx} id={"match-"+index+"-"+indexx}>
							            	<Row className="show-grid center">
							            	
							            	
							            	<Col md={4} xs={4} className="mobileMarginLeft">
								            	<Col  md={8} xs={12}>
								            	<h4>{match.home}</h4>
								            	</Col>

								            	<Col  md={4} xs={12}>
								            	<img src={match.homeImg} className="Flag-Image"/>
								            	</Col>
							            	</Col>
							            	<Col md={4} xs={3}>
							            	  <h4 className="fontFam">{match.score}</h4>
							            	 </Col>
							            	 
							            	 <Col md={4} xs={4}> 
							            	 	<Col  md={4} xs={12} className="margin-mobile">
							            		<img src={match.awayImg} className="Flag-Image"/>
							            		</Col>
								            	<Col  md={8} xs={12}>
								            	 <h4>{match.away}</h4>

								            	 </Col>
							            	</Col>
							            	</Row>
							            	<Row className="center">
							            		{match.stadium}
							            	</Row>
							            	<Row className="center">
							            		{match.day} - {match.time}
							            	</Row>
							            </Well>
							        )}
							        </div>
						   </Panel> 		       
		 			  )}
	 		 	    
	      	</Row>
	      	</Grid>
		  )   
	    }  
	}
}
export default Home;