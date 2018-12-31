import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon, Form, Item, Picker, DatePicker, Button, Toast } from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Server from "../../../constants/config";
import axios from "axios";
import firebase from 'react-native-firebase';
import {  RemoteMessage, Notification } from 'react-native-firebase';



export default class CalendarSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      showLectures: {},
      token: ""
    };
  }
  
      askForNotificationPermission(){
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (!enabled) {
                    firebase.messaging().requestPermission()
                        .then(() => {
                            // this.notificationListener2();
                            Toast.show({
                                text: "تم تفعيل خاصية الاشعارات",
                                buttonText: "موافق",
                                type: "success"
                            })
                        })
                        .catch(error => {
                            Toast.show({
                                text: "تم الغاء خاصية الاشعارات",
                                buttonText: "موافق",
                                type: "danger"
                            })
                        });
                }
                // else{
                //     this.notificationListener2();
                // }
            });
        return true;
    }
  
    componentDidMount(){
       axios.get(Server.url + 'api/lecturesDate')
      .then(response => {
          this.setState({
            showLectures: response.data,
          });
      }).catch(error => {
          Toast.show({
              text: 'Error reaching the server.',
              type: "danger",
              buttonText: 'Okay'
          });
      })
      
      firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          this.state.token = fcmToken;
          AsyncStorage.getItem('token').then(userToken => {
            axios.post(Server.url + 'api/updatetoken?token='+userToken,
                {token: this.state.token}
            )
            .then(response=>{
              
              })
          })
        } else {
          Toast.show({
            text: 'You must accept to send notification to you.',
            type: "danger",
            buttonText: 'Okay'
        });
        } 
      });
     if(this.askForNotificationPermission()){
      this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        // Process your notification as required
    });

     }
      
    }

    componentWillUnmount() {
      this.notificationListener();
  }
    render() {
        return (
          <Agenda
  // the list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key kas to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={this.state.showLectures}
  // callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={(month) => {console.log('trigger items loading')}}
  // callback that fires when the calendar is opened or closed
  onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
  // callback that gets called on day press
  onDayPress={(day)=>{console.log('day pressed')}}
  // callback that gets called when day changes while scrolling agenda list
  onDayChange={(day)=>{console.log('day changed')}}
  // initially selected day
  selected={'2018-11-16'}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={50}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={50}
  // specify how each item should be rendered in agenda
  renderItem={this.renderItem.bind(this)}
  // specify how each date should be rendered. day can be undefined if the item is not first in that day.
  renderDay={(day, item) => {return (<Text style={styles.dateStyle}>{day ?day.day:null}</Text>);}}
  // specify how empty date content with no items should be rendered
  renderEmptyDate={() => {return (<Text>This is empty date!</Text>);}}
  // specify how agenda knob should look like
  renderKnob={() => {return (<Text style={styles.click}></Text>);}}
  // specify what should be rendered instead of ActivityIndicator
  renderEmptyData = {() => {return (<Text style={styles.emptyDate}>This is empty date!</Text>);}}
  // specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
  // Hide knob button. Default = false
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
 
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
  refreshControl={null}
  // agenda theme
  theme={{
    agendaDayTextColor: 'yellow',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'red',
    agendaKnobColor: 'blue'
  }}
  // agenda container style
  style={{}}
/>

        );
    }

    renderItem(item) {
      return (
        <TouchableOpacity style={[styles.item, {height:100}]}  onPress={()=>this.props.navigation.navigate('LectureStudent', {...item})}>
          <Text style={styles.itemTxt}>{item.title}</Text>
          <Text style={styles.itemTxt}>{item.subject}</Text>  
          <Text style={styles.itemTxtDate}>{item.start_duration}</Text>
          <Image source={require('../../../images/idea.png')} style={{position: 'absolute', right: 20, top: 20, borderRadius:50, width: 50, height:50}}/>    
        </TouchableOpacity>
      );
    };

    
}


const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    fontSize: 20,
    flex:1,
    padding: 10,
    fontFamily: "Roboto",
  },
  dateStyle:{
    fontSize: 25,
    padding: 10,
    fontFamily: "Roboto",   
  },
  itemTxt:{
    fontSize: 17,
    fontFamily: "Roboto",
    textAlign: 'left'
  },
  itemTxtDate:{
    fontSize: 17,
    fontFamily: "Roboto",
    textAlign: 'left',
    color: '#9eb1c1'
  },
  click:{
    width: 50, 
    height: 10, 
    backgroundColor: "#f3f3f4", 
    borderRadius:5, 
  } 
});