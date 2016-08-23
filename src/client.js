import React from 'react';
import ReactDOM from 'react-dom';
import WeatherComponent from './WeatherComponent.js';

var WeatherApp = React.createClass({
	render: function() {
		return(
			<div>
				<WeatherComponent />
			</div>
		)
	}
});

ReactDOM.render(<WeatherApp/>, document.getElementById('weatherApp')
);