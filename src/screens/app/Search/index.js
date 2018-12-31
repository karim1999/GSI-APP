import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity,FlatList } from 'react-native';
import { Icon, Form, Item, Button, Input } from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import _ from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showLectures: [],
            isLoading: false,
            title: "",
            subject: "",
            teacher: "",
            isStartTimeVisible: false,
            isEndTimeVisible: false,
            start_duration: " Start Time",
            end_duration: " End Time",
            searchLectures: []
         };
      }

      _showStartTimePicker = () => this.setState({ isStartTimeVisible: true });
      _showEndTimePicker = () => this.setState({ isEndTimeVisible: true });
  
      _hideStartTimePicker = () => this.setState({ isStartTimeVisible: false });
      _hideEndTimePicker = () => this.setState({ isEndTimeVisible: false });
      
      _handleStartTimePicked = (date) => {
          this.setState({
              isStartTimeVisible: false,
              start_duration: moment(date).format('YYYY-MM-DD h:mm a')
          })
      };
  
      _handleEndTimePicked = (date) => {
          this.setState({
              isEndTimeVisible: false,
              end_duration: moment(date).format('YYYY-MM-DD h:mm a')
          })
      };

      componentDidMount(){
        this.setState({
            isLoading: true
        })
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/lectures?token='+userToken)
            .then(response => {
                this.setState({
                    isLoading: false,
                    showLectures: response.data
                })
            }).catch(error => {
                Toast.show({
                    text: 'Error reachig server',
                    buttonText: "Ok",
                    type: "danger"
                })
            })
        })

        alert( moment(this.state.start_duration).format('YYYY-MM-DD h:mm a') )
    }

      async Data(){
          let data = [];
          data = this.state.showLectures;
          
          if(this.state.title != ""){
              data = await _.filter(data, lecture => lecture.title.toLowerCase().indexOf(this.state.title.toLowerCase()) > -1);
          }

          if(this.state.subject != ""){
              data = await _.filter(data, lecture => lecture.subject.toLowerCase().indexOf(this.state.subject.toLowerCase()) > -1);
          }

          if(this.state.teacher !== ""){
            data = await _.filter(data, lecture => lecture.user.name == this.state.teacher);
        }

        // if(this.state.start_duration !== ""){
            
        //     data = await _.filter(data, lecture => moment(moment(lecture.start_duration)
        //     .format('YYYY-MM-DD h:mm a')).isAfter(this.state.start_duration));
        // }
        

        this.setState({
            searchLectures: data
        })
           
        alert(JSON.stringify(this.state.searchLectures))
      }
    
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} back title="Search">
            <View style={styles.content}>
                <View style={styles.Box}>
                    <Item style={styles.lecture}>
                        <Icon type="FontAwesome" name="user" />
                        <Text style={styles.lectureTxt}>Lecture</Text>
                        <Input onChangeText={(title) => this.setState({title})}
                                placeholder="Lecture name"
                                placeholderTextColor="#ccc5c5"
                        />
                    </Item>

                    {/* <Item style={styles.lecture}>
                        <Icon type="FontAwesome" name="calendar" />
                        <Text style={styles.lectureTxt}>From </Text>
                        <View>
                            <TouchableOpacity onPress={this._showStartTimePicker}>
                                <Text>{this.state.start_duration}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isStartTimeVisible}
                                onConfirm={this._handleStartTimePicked}
                                onCancel={this._hideStartTimePicker}
                                mode={'datetime'}
                                is24Hour={false}
                            />
                      </View>
                      <Text style={{paddingLeft:10, paddingRight:10}}>To</Text>
                        <View>
                            <TouchableOpacity onPress={this._showEndTimePicker}>
                                <Text>{this.state.end_duration}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isEndTimeVisible}
                                onConfirm={this._handleEndTimePicked}
                                onCancel={this._hideEndTimePicker}
                                mode={'datetime'}
                                is24Hour={false}
                            />
                      </View>
                    </Item> */}

                    <Item style={styles.lecture}>
                        <Icon type="Foundation" name="results" />
                        <Text style={styles.lectureTxt}>Subject</Text>
                        <Input onChangeText={(subject) => this.setState({subject})}
                                placeholder="Subject name"
                                placeholderTextColor="#ccc5c5"
                        />
                    </Item>

                    <Item style={styles.lecture}>
                        <Icon type="Foundation" name="results" />
                        <Text style={styles.lectureTxt}>Teacher</Text>
                        <Input onChangeText={(teacher) => this.setState({teacher})}
                                placeholder="Teacher name"
                                placeholderTextColor="#ccc5c5"
                        />
                    </Item>

                    <Button style={styles.button} onPress={ ()=> this.Data()}>
                        <Text style={styles.buttonTxt}>Search</Text>
                    </Button>

                </View>

                {
                    (()=> this.Data())?(
                        <FlatList
                        data={this.state.searchLectures}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.Box1}>
                                <Item style={styles.item}>
                                    <View style={styles.viewImage}>
                                        <Image source={require('../../../images/idea.png')} style={styles.image}/>
                                    </View>
                                    <View>
                                        <Text style={styles.txt}>{item.title}</Text>
                                        <Text style={styles.txt}>{item.subject}</Text>
                                        <Text style={styles.txt}>{item.user.name}</Text>
                                        <Text style={styles.txt}>{item.start_duration}</Text>
                                    </View>
                                </Item>
                            </TouchableOpacity>
                        )}
                        keyExtractor = { (item, index) => index.toString() }
                        />
                    ):null
                }

            </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    content:{
        backgroundColor: Color.background,
        padding:7,
    },
    Box: {
        backgroundColor: '#fff',
        padding: 30,
        paddingTop: 0,
        marginBottom: 30
    },
    Box1: {
        backgroundColor: '#fff',
        padding: 15,
    },
    lecture:{
        backgroundColor: 'white', 
        borderColor: 'transparent',
        paddingTop: 30
    },
    lectureTxt:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    form:{
        width: 110,
        marginLeft: 80        
    },
    button:{
        backgroundColor: '#fef5e5',
        paddingTop: 10,
        paddingBottom: 10,
        padding: 35,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonTxt:{
        color: '#000',
        fontSize: 20,
    },
    item:{
        padding: 10,
    },
    viewImage:{
        paddingRight: 50
    },
    image:{
        width:80, 
        height: 80, 
        borderRadius: 10        
    },
    txt:{
        fontFamily: "Roboto",
    }

});