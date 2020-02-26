import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';
import { setSearchField } from '../actions.js';

const mapStateToProps = state => {
	return {
		searchField: state.searchField
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value))
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			kitties: []
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {this.setState({ kitties: users})});
	}

	render () {
		const { kitties } = this.state;
		const { searchField, onSearchChange } = this.props;
		// destructuring this.state to kitties and searchfield
		const filteredKitties = kitties.filter(kitty => {
			return kitty.username.toLowerCase().includes(searchField.toLowerCase());
		}) 
		// Can change the var 'kitty' to whatever describes the the 'user'
		return !kitties.length ?
			// using return instead of 'if...else'
			// !kitties.length is the same as kitties.length===0
		<h1 className='f1'>Loading Page</h1> : 
		(
			<div className='tc'>
				<h1 className='f1'>My Little Kitties</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList kitties={filteredKitties} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);