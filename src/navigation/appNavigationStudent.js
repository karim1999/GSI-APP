import React from 'react';
import { SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import {Icon, Text} from "native-base";
import Notifications from "../screens/app/Notifications";
import ResultSearch from "../screens/app/Search/ResultSearch";
import CalendarSearch from "../screens/app/Search/CalendarSearch";
import Students from "../screens/app/Students";
import Reports from "../screens/app/Students/Reports";
import LectureStudent from "../screens/app/Lectures";
import WeebView from "../screens/app/Lectures/WebView";
import Color from "../constants/colors";
import Search from "../screens/app/Search";
import { createMaterialTopTabNavigator, createStackNavigator, DrawerNavigator } from 'react-navigation'

const StudentStack = createStackNavigator({
    CalendarSearch,
    ResultSearch,
    LectureStudent,
    WeebView
},{
    headerMode: 'none',
});

const NotificationsStack = createStackNavigator({
    Notifications,
    Search

},{
    headerMode: 'none',
});

const ReportsStack = createStackNavigator({
    Reports,
    Search
},{
    headerMode: 'none',
});

// const SearchStack = createStackNavigator({
//     Search,
// },{
//     headerMode: 'none',
// });

const AppStackStudent = createMaterialTopTabNavigator (
    {
        StudentStack,
        NotificationsStack,
        ReportsStack,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'StudentStack') {
                    return <Icon name='home' style={{color: tintColor, fontSize: 30}} type="FontAwesome" />
                } else if (routeName === 'NotificationsStack') {
                    return <Icon name='notifications-none' style={{color: tintColor, fontSize: 30}} type="MaterialIcons" />
                }
                else if (routeName === 'ReportsStack') {
                    return <Icon name='news' style={{color: tintColor, fontSize: 30}} type="Entypo" />
                }
                // else if (routeName === 'SearchStack') {
                //     return <Icon name='settings' style={{color: tintColor, fontSize: 25}} type="Feather" />
                // }
            },
            tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                  case 'StudentStack':
                    return <Text style={{color: tintColor, fontSize: 12}}>Home</Text>;
                    break;
                  case 'NotificationsStack':
                    return <Text style={{color: tintColor, fontSize: 12}}>Notifications</Text>;
                    break;
                  case 'ReportsStack':
                      return <Text style={{color: tintColor, fontSize: 12}}>Reports</Text>;
                      break;
                //   case 'SearchStack':
                //     return <Text style={{color: tintColor, fontSize: 12}}>Settings</Text>;
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

        initialRouteName: 'StudentStack',
    }
);

export default AppStackStudent;