import React, { Component } from 'react';
import SameItem from '../../../components/SameItems'
import AppTemplate from '../appTemplate'

export default class Notifications extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Notifications">
                <SameItem />
            </AppTemplate>
        );
    }
}

