import React from 'react';
import { Provider } from 'react-redux';
import {Root} from "native-base";
import { createStore } from 'redux';
import { currentUser } from './../reducers';
import { createSwitchNavigator } from 'react-navigation';
import AuthStack from './authNavigation'
import AuthLoadingScreen from './loading'
import AppStackStudent from './appNavigationStudent'
import AppStackTeacher from './appNavigationTeacher'
import TeacherDrawer from './DrawerNavigatorTeacher'
import DrawerNavigator from './DrawerNavigator'

const RootStack= createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        AppStudent: DrawerNavigator,
        AppTeacher: TeacherDrawer,
        Auth: AuthStack,
    },
);

const store = createStore(currentUser);

export default class RootNavigation extends React.Component {
    render() {
        return (
            <Root>
                <Provider store={store}>
                    <RootStack/>
                </Provider>
            </Root>
        );
    }
}
