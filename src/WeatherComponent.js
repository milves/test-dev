import React from 'react';
import $ from 'jQuery';
import CityDropDown from './Dropdown.js';

var WeatherComponent = React.createClass({
	getInitialState: function(){
		return{
			data: ''
		}
	},
	
	onChildChanged: function(selected){
		this.setState({ selected: selected.value});
	},
	
	componentDidMount: function() {
		this.serverRequest = $.getJSON("http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=de19cab250158c43a5e6524f9a07cb4f", function(result){
								var data = result;
								this.setState({
									data : data.list[0]
									
								});
							}.bind(this));
	},
	
	render: function(){
		return(
		<section>
			<div>
				<CityDropDown callbackParent={this.onChildChanged} />
			</div>
			<div>
				{this.state.selected}
			</div>
		</section>
		)
	}
});


export default WeatherComponent;