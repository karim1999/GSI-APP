import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Icon, Form, Item, Input , Button, H3 } from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import _ from 'lodash'
class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isStartTimeVisible: false,
            isEndTimeVisible: false,
            start_duration: " Start Time",
            end_duration: " End Time",
            title: "",
            searchLectures: this.props.user.joint_lectures
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

      async Data(){
          let data = [];
          data = this.props.user.joint_lectures;
          
          if(this.state.title != ""){
              data = await _.filter(data, lecture => lecture.title.toLowerCase().indexOf(this.state.title.toLowerCase()) > -1);
          }

        //   if(this.state.subject != ""){
        //       data = await _.filter(data, lecture => lecture.subject.toLowerCase().indexOf(this.state.subject.toLowerCase()) > -1);
        //   }

        this.setState({
            searchLectures: data
        })
           
      }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Reports">
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

                    <Button style={styles.button} onPress={ () => this.Data()}>
                        <Text style={styles.buttonTxt}>Search</Text>
                    </Button>

                </View>

                <H3 style={styles.title}>Latest Lectures :</H3>

                <FlatList
                        ListEmptyComponent={
                            <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Your profile is empty start joining lectures</Text>
                        }
                        data={this.state.searchLectures}
                        renderItem={({item}) => (

                        <View style={styles.Box1}>

                            <Item style={styles.item}>
                                <View style={styles.viewImage}>
                                    <Image source={{uri: item.img}} style={styles.image}/>
                                </View>
                                <View>
                                    <View style={{flexDirection: 'row', paddingBottom: 7}}>
                                        <Icon type="FontAwesome" name="user" />
                                        <Text>{item.user.name}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row', paddingBottom: 7}}>
                                        <Icon type="MaterialIcons" name="subject" />
                                        <Text>{item.title}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row', paddingBottom: 7}}>
                                        <Icon type="Entypo" name="calendar" />
                                        <Text style={styles.txt}>{item.start_date}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                        <Icon type="Entypo" name="back-in-time" />
                                        <Text style={styles.txt}>{item.start_time}</Text>
                                    </View>
                                </View>
                            </Item>
                        </View>
                )}
                keyExtractor = { (item, index) => index.toString() }
                />
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
    },
    Box1: { 
        backgroundColor: '#fff',
        padding: 30,
        paddingTop: 10,
        paddingBottom: 10
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
        width:100, 
        height: 100, 
        borderRadius: 10        
    },
    txt:{
        fontFamily: "Roboto",
    },
    title:{
        padding: 20,
        fontFamily: "Roboto",
    }

});

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reports);