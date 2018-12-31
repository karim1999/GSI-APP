import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { Icon, Form, Item, Picker, DatePicker, Button, Label, List, ListItem, Left, Body, 
    Right, Thumbnail, Card, CardItem, Toast, H3} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";
import moment from 'moment'
import _ from 'lodash'

class Lectures extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chosenDate: new Date(),
            lecture: this.props.navigation.state.params ,
            isLoading: false,
            isSetting: false,
            isApplying: false,
            editable: 1

        };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

    onRegisterPressed(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.post(Server.url + 'api/jointLecture/'+this.state.lecture.id+'?token='+userToken)
            .then(response => {
                this.setState({
                    isLoading: false,
                });
                Toast.show({
                    text: "done.",
                    buttonText: "Ok",
                    type: "success"
                })
            }).catch(error => {
                alert(JSON.stringify(error))
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    deleteLecture(){
        Alert.alert(
            "Are you sure?",
            "No one will be able to access this lecture after deleting",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.delete(Server.url+'api/deleteLecture/'+this.state.lecture.id+'?token='+userToken).then(response => {
                                // alert(response.data);
                                this.props.navigation.navigate("Teacher");
                                this.props.setUser(response.data.user);
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "The lecture was deleted successfully",
                                    buttonText: "Ok",
                                    type: "success"
                                })
                            }).catch(error => {
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "Unknown error has occurred",
                                    buttonText: "Ok",
                                    type: "danger"
                                })
                            })
                        });
                    }},
            ],
            { cancelable: false }
        )
    }

    componentDidMount(){
        formated_date = this.state.lecture.start_duration.replace('-','/').replace('-','/')
        date = new Date(formated_date);
       if( Math.abs(moment().diff(moment( date.getTime()), 'hours', true)) <= 5){
           this.setState({editable:0});
       }
    }

    applyLecture(id){
        Alert.alert(
            "Are you sure",
            "You want to apply this lecture?",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                    this.setState({
                        isApplying: true,
                    });
                    AsyncStorage.getItem('token').then(userToken => {
                        return axios.post(Server.url + 'api/jointLecture/' + id + '?token=' + userToken)
                        .then(response => {
                            Toast.show({
                                text: 'Successfully applying',
                                type: "success",
                                buttonText: 'Okay'
                            });
                            this.setState({
                                isApplying: false,
                            })
                        }).catch(error => {
                            this.setState({
                                isApplying: false,
                            });
                            Toast.show({
                                text: "Error reaching the server.",
                                buttonText: "Ok",
                                type: "danger"
                            })
                        })
                    });
                    }},
            ],
            { cancelable: false }
        )

    }
    
    render() {
        var timeStart = new Date("01/01/2007 " + this.state.lecture.start_duration).getHours()
        return (
            <AppTemplate title = {this.state.lecture.title} back navigation={this.props.navigation}>

                {
                    (this.props.user.type == 1) ? (
                        _.find(this.props.user.joint_lectures, lecture => lecture.id == this.state.lecture.id) ? (
                            <Text></Text>
                        ):(
                            <Button
                            onPress={() => this.props.navigation.navigate('WeebView', {...this.state.lecture})}
                            style={{width: "100%", alignItems: "center", backgroundColor: '#d3d3ea'}}>
    
                            <Text style={{flex: 1, paddingLeft: 10}}> Apply </Text>
                            {this.state.isApplying && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
    
                            <Icon name="ios-checkmark" style={{color: Color.mainColor, fontSize: 30}}/>
    
                            </Button>

                        )

                    ):(
                            <View>
                            <Button onPress={() => this.setState({isSetting: !this.state.isSetting})} style={{width: "100%", alignItems: "center", backgroundColor: '#d3d3ea'}}>
                            <Text style={{flex: 1, color: '#000'}}> Settings </Text>
                            <Icon name={this.state.isSetting? "ios-arrow-dropup-circle": "ios-arrow-dropdown-circle"} style={{color: Color.mainColor, fontSize: 25}}/>
                            </Button>
                            { 
                                (this.state.isSetting) && (
                                    <List style={{backgroundColor: "#d3d3ea", right: 0}}>
                                        {
                                            (this.state.editable == 1) ? (
                                                <ListItem
                                                    onPress={() => this.props.navigation.navigate("EditLecture", {...this.state.lecture})}
                                                >
                                                    <Text style={{flex: 1, color: '#000'}}>Edit Lecture</Text>
                                                </ListItem>

                                            ):null
                                            
                                        }
                                        
                                        <ListItem
                                            onPress={() => this.deleteLecture()}
                                        >
                                            <Text style={{flex: 1, color: '#000'}}>Delete Lecture</Text>
                                        </ListItem>
                                    </List>
                                )
                            }
                            </View>   
                    )
                }
                <View style={styles.content}>
                    <View style={styles.Box}>

                        <Item style={styles.item}>
                            <Image source={require('../../../images/idea.png')} style={styles.image}/>
                            <View style={styles.text}>
                            {/* <Button onPress={()=> this.onRegisterPressed()}>
                                <Text>register</Text>
                            </Button> */}
                                <Text style={styles.txt}>{this.state.lecture.user.name}</Text>
                                <Text style={styles.txt}>{this.state.lecture.title}</Text>
                            </View>
                            <View style={styles.allStars}>
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                            </View>
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="dollar" />
                            <H3 style={styles.lectureTxt}>Cost</H3>
                            <Button transparent style={styles.price2}>
                                <Text style={styles.priceText}>{this.state.lecture.price}</Text>
                                <Text style={styles.priceIcon}>$</Text>
                            </Button>
                            
                        </Item>
                        <Item style={styles.item2}>
                            <Icon type="Entypo" name="wallet" />
                            <H3 style={styles.lectureTxt}>Payment</H3>
                            <Text style={{position: 'absolute',left: 200,fontFamily: "Roboto",}}>
                            {
                                (this.state.lecture.payment == 1) ? (
                                    <Text style={{position: 'absolute',left: 100,fontFamily: "Roboto",}}>
                                        Before Attend
                                    </Text>

                                ):(
                                    <Text style={{position: 'absolute',left: 100,fontFamily: "Roboto",}}>
                                        After Attend
                                    </Text>
                                )
                            }
                            </Text>
                            
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="Foundation" name="results" />
                            <H3 style={styles.lectureTxt}>Course Type</H3>
                            <View style={{justifyContent: 'space-between',  alignItems: 'flex-end'}}>
                            {
                                (this.state.lecture.type_course == 1) ? (
                                    <Text style={{position: 'absolute',left: 100,fontFamily: "Roboto",}}>
                                        College
                                    </Text>

                                ):(
                                    <Text style={{position: 'absolute',left: 100,fontFamily: "Roboto",}}>
                                        Genral
                                    </Text>
                                )
                            }
                            </View>
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="transgender" />
                            <H3 style={styles.lectureTxt}>Gender</H3>
                            {
                                (this.state.lecture.gender == 1) ? (
                                    <Text style={{position: 'absolute',left: 230,fontFamily: "Roboto",}}>
                                        Male
                                    </Text>

                                ):(this.state.lecture.gender == 2)?(
                                    <Text style={{position: 'absolute',left: 230,fontFamily: "Roboto",}}>
                                        Female
                                    </Text>
                                ):(
                                    <Text style={{position: 'absolute',left: 230,fontFamily: "Roboto",}}>
                                        Both
                                    </Text>
                                )
                            }
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="Entypo" name="back-in-time" />
                            <H3 style={styles.lectureTxt}>Duration</H3>
                            <Text style={{position: 'absolute',left: 200,fontFamily: "Roboto",}}>
                            {this.state.lecture.start_duration} To {this.state.lecture.end_duration}
                            </Text>                            
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="users" />
                            <H3 style={styles.lectureTxt}>Attendance</H3>
                            <Text style={{position: 'absolute',left: 200,fontFamily: "Roboto",}}>
                            {this.state.lecture.length}
                            </Text>
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="check-square-o" />
                            <H3 style={styles.lectureTxt}>Allowed</H3>
                            <Text style={{position: 'absolute',left: 250,fontFamily: "Roboto",}}>
                            {this.state.lecture.allowed}
                            </Text>
                        </Item>

                    </View>

                <Text style={styles.commentTxt}>Comments</Text>

                <View style={styles.BoxComment}>  
                    <Card style={{borderWidth: 0}} transparent={true}>
                        <CardItem style={{}}>
                            <Left>
                            <Thumbnail source={require('../../../images/Background.png')} />
                            <Text style={{paddingLeft: 10, fontSize: 19, fontFamily: "Roboto",}}>John Hendrseon</Text>
                            </Left>
                            <Right style={styles.allStarsComment}>
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                            </Right> 
                        </CardItem>
                        <CardItem style={{}}>
                            <Body>
                            <Text style={{fontFamily: "Roboto",}}>asdsadsaddsddddsadasdsad</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
                
            </View>

            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    content:{
        backgroundColor: Color.background,
        padding:7,
        paddingTop: 0
    },
    Box: {
        flex:1,  
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 30,
        paddingTop: 0,
    },
    BoxComment: {
        flex:1,  
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5, 
    },
    item:{
        height: 120,
    },
    item2:{
        height: 70, 
        flex: 1
    },
    image:{
        width:80, 
        height: 80, 
        borderRadius: 10        
    },
    text:{
        paddingLeft: 60,
        paddingBottom: 25
    },
    txt:{
        fontFamily: "Roboto",
        fontSize: 18
    },
    star:{
        color: '#eeb829',
        fontSize: 22,
    },
    allStars:{
        position: 'absolute',
        bottom: 6,
        right: 18,
        flexDirection: 'row'
    },
    allStarsComment:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    lectureTxt:{
        fontSize: 18,
        paddingLeft: 10,
        fontFamily: "Roboto",
    },
    price2:{
        position: 'absolute',
        left: 200,
        top: 15
    },
    priceText:{
        backgroundColor:'#fff',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 0.5,
        borderColor: '#000',
    },
    priceIcon:{
        backgroundColor:'#eeb829',
        color: '#fff',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        paddingLeft: 20,
        paddingRight: 20,
        padding: 0.5
    },
    commentTxt:{
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 15
    }

});

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lectures);
