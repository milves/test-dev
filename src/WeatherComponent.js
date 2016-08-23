import React from 'react';
import $ from 'jQuery';
import CityDropDown from './Dropdown.js';
import { Table } from 'react-bootstrap';


var WeatherComponent = React.createClass({
	
	getInitialState: function(){
		if (confirm("Allow to use your location?")){
			var posData = this.getPosWeather();
			return{
				cityName: posData.name,
				cityImg: posData.weather[0].icon,
				cityTemp: posData.main.temp,
				cityWindspeed: posData.wind.speed,
				cityWinddir: posData.wind.deg,
				cityAirpressure: posData.main.pressure,
				cityHumidity: posData.main.humidity,
				cityDescription: posData.weather[0].description,
				cityClouds: posData.clouds.all,
				cityWeather: posData.weather[0].main,
				posData: posData
			}
		} else{
			return{
				data: ''
			}
		}
	},
	//get location by ip
	getLocation: function() {
		var data;
		$.ajax({
			url: 'http://ip-api.com/json',
			async: false,
			dataType: 'json',
			success: function (result){
				data = result.city;
			}
		})
		return data;
		
	},
	
	//get weather information at your position
	getPosWeather: function() {
		var data;
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather?q=" + this.getLocation() + "&units=metric&appid=de19cab250158c43a5e6524f9a07cb4f",
			async: false,
			dataType: 'json',
			success: function (result){
				data = result;
			}
		})
		return data;
	},
	
	// get particular info for selected city
	getCityInfo(objects, selected) {
		if(selected == "My location"){
			this.setState({
				cityName: objects.list[5].name,
				cityImg: objects.list[5].weather[0].icon,
				cityTemp: objects.list[5].main.temp,
				cityWindspeed: objects.list[5].wind.speed,
				cityWinddir: objects.list[5].wind.deg,
				cityAirpressure: objects.list[5].main.pressure,
				cityHumidity: objects.list[5].main.humidity,
				cityDescription: objects.list[5].weather[0].description,
				cityClouds: objects.list[5].clouds.all,
				cityWeather: objects.list[5].weather[0].main
			})
		} else {
			for (var i = 0; i < objects.cnt; i++){
				if (objects.list[i].name == selected) {
					this.setState({
						cityName: objects.list[i].name,
						cityImg: objects.list[i].weather[0].icon,
						cityTemp: objects.list[i].main.temp,
						cityWindspeed: objects.list[i].wind.speed,
						cityWinddir: objects.list[i].wind.deg,
						cityAirpressure: objects.list[i].main.pressure,
						cityHumidity: objects.list[i].main.humidity,
						cityDescription: objects.list[i].weather[0].description,
						cityClouds: objects.list[i].clouds.all,
						cityWeather: objects.list[i].weather[0].main
					})
				}
			}
		}
	},
	// when selection is changed
	onChildChanged: function(selected){
		this.setState({ selected: selected.value});
		this.getCityInfo(this.state.data, selected.value);
	},
	
	componentDidMount: function() {
		this.serverRequest = $.getJSON("http://api.openweathermap.org/data/2.5/group?id=588409,456172,2643743,2950159,524901&units=metric&appid=de19cab250158c43a5e6524f9a07cb4f", function(result){
								var data = result;
								if(this.state.posData != null){
									data.list[5] = this.state.posData;
								}
								this.setState({
									data : data
								});
								if(this.state.posData == null){
									this.setState({
										cityName: data.list[0].name,
										cityImg: data.list[0].weather[0].icon,
										cityTemp: data.list[0].main.temp,
										cityWindspeed: objects.list[0].wind.speed,
										cityWinddir: objects.list[0].wind.deg,
										cityAirpressure: objects.list[0].main.pressure,
										cityHumidity: objects.list[0].main.humidity,
										cityDescription: objects.list[0].weather[0].description,
										cityClouds: objects.list[0].clouds.all,
										cityWeather: objects.list[0].weather[0].main
									});
								}
							}.bind(this));
		
	},
	
	render: function(){
		return(
		<section>
			<div>
				<CityDropDown location={this.state.posData} callbackParent={this.onChildChanged} />
			</div>
			<div >
			<h2>Weather in {this.state.cityName}</h2>
			<h3>{this.state.cityDescription}</h3>
			<img src={"http://openweathermap.org/img/w/" + this.state.cityImg + ".png"}/>
			 <Table striped bordered condensed hover>
			 	<tbody>

				  <tr>
					<td>Temperature</td>
					<td>{this.state.cityTemp} °C</td>
				  </tr>
				  <tr>
					<td>Wind</td>
					<td><span>{this.state.cityWindspeed} m/s  </span><span> {this.state.cityWinddir} °</span></td>
				  </tr>
				  <tr>
					<td>Clouds</td>
					<td>{this.state.cityClouds}%</td>
				  </tr>
				  <tr>
					<td>Air pressure</td>
					<td>{this.state.cityAirpressure} hPa</td>
				  </tr>
				  <tr>
					<td>Humidity</td>
					<td>{this.state.cityHumidity} %</td>
				  </tr>
				</tbody>
			  </Table>
			</div>
		</section>
		)
	}
});


export default WeatherComponent;