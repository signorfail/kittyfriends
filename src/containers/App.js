import React, { Component } from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary.js';

class App extends Component {
	constructor() {
		super()
		this.state = {
			kitties: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {this.setState({ kitties: users})});
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	render () {
		const { kitties, searchfield } = this.state;
		// destructuring this.state to kitties and searchfield
		const filteredKitties = kitties.filter(kitty => {
			return kitty.username.toLowerCase().includes(searchfield.toLowerCase());
		}) 
		// Can change the var 'kitty' to whatever describes the the 'user'
		return !kitties.length ?
			// using return instead of 'if...else'
			// !kitties.length is the same as kitties.length===0
		<h1 className='f1'>Loading Page</h1> : 
		(
			<div className='tc'>
				<h1 className='f1'>My Little Kitties</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList kitties={filteredKitties} />
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default App