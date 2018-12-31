import React from 'react';
import { SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import {Icon, Text} from "native-base";
import Lectures from "../screens/app/Lectures";
import AddLecture from "../screens/app/Lectures/AddLecture";
import EditLecture from "../screens/app/Lectures/EditLecture";
import LecturePayment from "../screens/app/Teacher/LecturePayment";
import Teacher from "../screens/app/Teacher";
import Payments from "../screens/app/Teacher/Payments";
import Wallet from "../screens/app/Teacher/Wallet";
import Color from "../constants/colors";
import { createMaterialTopTabNavigator, createStackNavigator, DrawerNavigator } from 'react-navigation'

const TeacherStack = createStackNavigator({
    Teacher,
    AddLecture,
    EditLecture,
    Lectures,
},{
    headerMode: 'none',
});

const WalletStack = createStackNavigator({
    Wallet,
},{
    headerMode: 'none',
    
});

const PaymentsStack = createStackNavigator({
    Payments,
    LecturePayment,
},{
    headerMode: 'none',
});

// const SettingsStack = createStackNavigator({
//     Search,
// },{
//     headerMode: 'none',
// });

const AppStackTeacher = createMaterialTopTabNavigator (
    {
        TeacherStack,
        WalletStack,
        PaymentsStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'TeacherStack') {
                    return <Icon name='home' style={{color: tintColor, fontSize: 26}} type="FontAwesome" />
                } else if (routeName === 'WalletStack') {
                    return <Icon name='wallet' style={{color: tintColor, fontSize: 26}} type="Entypo" />
                }
                else if (routeName === 'PaymentsStack') {
                    return <Icon name='cash-multiple' style={{color: tintColor, fontSize: 26}} type="MaterialCommunityIcons" />
                }
                // else if (routeName === 'SettingsStack') {
                //     return <Icon name='settings' style={{color: tintColor, fontSize: 26}} type="MaterialIcons" />
                // }
            },
            tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                  case 'TeacherStack':
                    return <Text style={{color: tintColor, fontSize: 14}}>Home</Text>;
                    break;
                  case 'WalletStack':
                    return <Text style={{color: tintColor, fontSize: 14}}>Wallet</Text>;
                    break;
                  case 'PaymentsStack':
                      return <Text style={{color: tintColor, fontSize: 14}}>Payment</Text>;
                      break;
                //   case 'SettingsStack':
                //     return <Text style={{color: tintColor, fontSize: 14}}>Settings</Text>;
                //     break;
        
        
                }
            } 

        }),
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,

        tabBarOptions: {
            showLabel: true,
            showIcon: true,
            activeTintColor: '#000',
            inactiveTintColor: '#fff',
            tabStyle: {
                flex:1,
                width: '100%',
            },
            style: {
                backgroundColor: Color.mainColor,
            },
            indicatorStyle: {
                backgroundColor: Color.mainColor,
                height: 3
            }
        },

        initialRouteName: 'TeacherStack',
    }
);

export default AppStackTeacher;