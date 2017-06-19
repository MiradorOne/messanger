import React, { Component } from 'react';
import SearchInput, {createFilter} from 'react-search-input';
import * as firebase from 'firebase';
import NewFriend from '../_common/NewFriend';
import _ from 'lodash';

const popupStyles = {
	border: '1px solid #eee',
	position: 'absolute',
	zIndex: '10',
	width: '100%',
	background: '#fff',
	top: '25px',
	left: '230px',
	padding: '10px 5px',
	borderRadius: '5px'
}

const inputStyles = {
	border: '1px solid #eee',
	padding: '5px 10px',
	width: '100%',
}

const resultStyles = {
	marginTop: '10px'
}

const KEYS_TO_FILTERS = ['firstName', 'lastName', 'email'];

class SearchPopup extends Component {
	constructor() {
		super();

		this.state = {
			searchTerm: '',
			usersList: [],
		}
	}

	componentDidMount() {
		this.searchUsers();
	}

	startConversation(user) {
		const id = Math.random().toString(36).substr(2, 9);
		firebase.database().ref(`/conversations/${id}/`).child('/users').set([
			{
				email: firebase.auth().currentUser.email,
				firstName: 'NO Name',
				lastName: 'No last name',
				id: firebase.auth().currentUser.uid
			},
			{
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				id: user.id
			},
		])

		firebase.database().ref(`users/${firebase.auth().currentUser.uid}/conversations/${id}/`).set(id);
		firebase.database().ref(`users/${user.id}/conversations/${id}/`).set(id);
		firebase.database().ref(`users/${user.id}/friends/${firebase.auth().currentUser.uid}/`).update([
			id
		]);
		firebase.database().ref(`users/${firebase.auth().currentUser.uid}/friends/${user.id}/`).update([
			id
		]);
	}

	searchUsers() {
		let self = this;
		let users = {};

		firebase.database().ref(`users/${firebase.auth().currentUser.uid}/friends`).once('value').then((snapshot) => {
			self.setState({
				friendList: snapshot.val(), 
			})
		}).then(() => {
			firebase.database().ref('/users').on('value', function (snapshot) {
			
			users = _.pickBy(snapshot.val(),(value, key) => {return key !== firebase.auth().currentUser.uid});
			if (self.state.friendList) {
				users = _.pickBy(users,(value, key ) => {return !self.state.friendList[key]});
			}

			self.setState({
				usersList: Object.keys(users).map((key) => {
					return {
						...users[key],
						id: key
					}
				})
			})
			});
		})

    }

	handleChange(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }
	
	render() {
		const searchResult = this.state.usersList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

		return (
			<div className="Search-Popup" style={popupStyles}>
				<input type="text" className="input-default" placeholder="Enter friend name or email" 
				style={inputStyles} 
				onChange={this.handleChange.bind(this)}/>

				<ul className="search-result" style={resultStyles}>
					{ this.state.searchTerm.length === 0 ? '' : searchResult.map((user,i) => {
						return (
							<li key={i}>
								<NewFriend firstName="First Name" id={user.id} lastName="Last Name" 
								startConversation={this.startConversation} email={user.email}/>
							</li>
						)
					})}
				</ul>

			</div>
		);
	}
}

export default SearchPopup;