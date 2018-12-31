import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SignIn from '../screens/auth/SignIn';
import ForgetPassword from '../screens/auth/SignIn/ForgetPassword';
import GettingIn from '../screens/auth/GettingIn';
import SignUp from '../screens/auth/SignUp';
import SignUp2 from '../screens/auth/SignUp2';
import Home from '../screens/app/Home';

const AuthStack = createStackNavigator(
    {
        SignIn: SignIn,
        GettingIn: GettingIn,
        SignUp: SignUp,
        SignUp2: SignUp2,
        ForgetPassword: ForgetPassword,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignIn',
    }
);
export default AuthStack;