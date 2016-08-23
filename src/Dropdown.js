import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

const options = [
	{ value: 'Tallinn', id: '588409'},
	{ value: 'Riga', id:'456172'},
	{ value: 'London', id:'2643743'},
	{ value: 'Berlin', id:'2950159'},
	{ value: 'Moscow', id:'524901'},
	{ value: 'My location', id:'0'}
]

class CityDropDown extends Component{
	constructor (props) {
		super(props)
		this.state = {
			selected: options[0]
		}
		this._onSelect = this._onSelect.bind(this);
		if( props.location == null){
			options.pop();
		}
	}
	
	_onSelect (option) {
		this.setState({selected: option});
		this.props.callbackParent(option);
	}
	
	render() {
		const defaultOption = this.state.selected;
		
		return(
			<section>
				<Dropdown options = {options} onChange={this._onSelect} value={defaultOption.name} />
			</section>
		)	
	}
}

export default CityDropDown;