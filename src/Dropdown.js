import React, { Component } from 'react';
import Dropdown from 'react-dropdown';

const options = [
	'Tallinn', 'Riga', 'London'
]

class CityDropDown extends Component{
	constructor (props) {
		super(props)
		this.state = {
			selected: options[0]
		}
		this._onSelect = this._onSelect.bind(this);
	}
	
	_onSelect (option) {
		console.log('You selected', option.label);
		this.setState({selected: option});
		this.props.callbackParent(this.state.selected);
	}
	
	render() {
		const defaultOption = this.state.selected;
		
		return(
			<section>
				<Dropdown options = {options} onChange={this._onSelect} value={defaultOption} />
			</section>
		)	
	}
}

export default CityDropDown;