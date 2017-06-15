import React, { Component } from 'react';
import * as firebase from 'firebase';
import SearchInput, {createFilter} from 'react-search-input';

import '../../styles/containers/FriendList.css';
import Search from '../components/Search/Search';
import Friend from '../components/Friend/Friend';

const KEYS_TO_FILTERS = ['firstName', 'lastName', 'email'];

export default class FriendList extends Component {
    constructor() {
        super()
        this.getUsers();

        this.state = {
            usersList: [],
            searchTerm: ''
        }
    }

    handleChange(e) {
        this.setState({
            searchTerm: e.target.value
        })
    }

    getUsers() {
        let self = this;
        firebase.database().ref('/users').once('value').then(function(snapshot) {
            self.setState({
                usersList: snapshot.val()
            })
        });
    }

    render() {
        const searchResult = Object.keys(this.state.usersList).filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        return (
            <div className="container Friend-List">
                <Search handleChange={this.handleChange.bind(this)}/>
                <ul>                
                {searchResult.map((value,i) => {
                    return (
                    <li key={i}>
                        <Friend email={this.state.usersList[value].email}/>
                    </li>
                    )
                })}
                </ul>
            </div>
        )
    }
}