import React, { Component } from 'react';
import {StyleSheet, View, AsyncStorage, ActivityIndicator, ListView, TextInput, TouchableOpacity} from 'react-native';
import {
    Button,
    Item,
    Text,
    Input,
    Form,
    Icon,
    Label,
    Textarea,
    Picker,
    Toast,
    ListItem,
    Right, Radio, Left,DatePicker,
} from 'native-base';
import AppTemplate from "../appTemplate";
import ImagePicker from "react-native-image-picker";
import TimePicker from 'react-native-simple-time-picker';
import axios from "axios/index";
import Server from "../../../constants/config";
import Table from 'react-native-simple-table'
import _ from 'lodash'
import MultiSelect from 'react-native-multiple-select';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
import Color from '../../../constants/colors';

export default class EditLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id,
            title: this.props.navigation.state.params.title,
            subject: this.props.navigation.state.params.subject,
            price: this.props.navigation.state.params.price,
            start_duration: this.props.navigation.state.params.start_duration,
            end_duration: this.props.navigation.state.params.end_duration,
            payment: this.props.navigation.state.params.payment,
            type_course: this.props.navigation.state.params.type_course,
            gender: this.props.navigation.state.params.gender,
            allowed: this.props.navigation.state.params.allowed,
            description: this.props.navigation.state.params.description,
            isStartTimeVisible: false,
            isEndTimeVisible: false,
            isLoading: false
        };
    }

    // Start timePicker
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
    //End timePicker
   

    selectImage(){
        let options = {
            title: "Course Image",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                console.log(response.data);
                this.setState({
                    img: response.uri
                });
            }
        });

    }

    EditLecture(id){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            let data = new FormData();
            data.append('title', this.state.title);
            data.append('subject', this.state.subject);
            data.append('price', this.state.price);
            data.append('end_date', this.state.end_date);
            data.append('start_duration', this.state.start_duration);
            data.append('end_duration', this.state.end_duration);
            data.append('payment', this.state.payment);
            data.append('type_course', this.state.type_course);
            data.append('gender', this.state.gender);
            data.append('allowed', this.state.allowed);
            data.append('description', this.state.description);
            if (this.state.img) {
                data.append('img', {
                    name: "img",
                    uri: this.state.img,
                    type: 'image/png'
                });
            }
            return axios.post(Server.url + 'api/editLecture/'+id+'?token='+userToken, data).then(response => {
                this.setState({
                    isLoading: false,
                });
                Toast.show({
                    text: "A lecture was edited successfully",
                    buttonText: "Ok",
                    type: "success"
                });
                this.props.navigation.navigate("CourseView");
                this.props.setUser(response.data);
            }).catch(error => {
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount(){
        // var timeStart = new Date("01/01/2007 " + this.state.start_duration).getHours() + (new Date("01/01/2007 " + this.state.start_duration).getMinutes()/60);
        // var timeEnd = new Date("01/01/2007 " + this.state.end_duration).getHours()+ (new Date("01/01/2007 " + this.state.end_duration).getMinutes()/60);
        // if(timeStart>timeEnd){
        //    var hourDiff = timeStart - timeEnd;
        //    alert(hourDiff.toFixed(1) * 10);
        // }else{
        //    var hourDiff = timeEnd - timeStart;
        //    alert(hourDiff.toFixed(1) * 10); 
        // }
        
        // var timeStart = new Date("01/01/2007 " + this.state.start_duration).getHours()

        // var date = new Date().getHours();
        
        // formated_date = this.state.start_duration.replace('-','/').replace('-','/')
        // alert(formated_date)
        // date = new Date(formated_date);
        
        // var x = Math.abs(moment().diff(moment( date.getTime()), 'hours', true))
        // alert(date);
        
        
        // if((timeStart-5) < 0){
        //     var x = (timeStart -5) +12;
        //     // var d = moment('2017-06-10T16:08:00').format('YYYY-MM-DD')
        //     // d.setDate(d.getDate()-1);
        //     var d = new Date(this.state.start_date)
        //     alert(d)
        // }else{
        //     var x = timeStart -5;
        //     alert(x)
        // }
        // var d = new Date(Date.now())
        // d.setDate(d.getDate()-5);
        // alert(d);
    }
    
    render() {
        const data = this.state;
        return (
            <AppTemplate title = {"Edit " + this.state.title} back navigation={this.props.navigation}>
                <View style={styles.content}>
                    <Form style={styles.container}>

                        <Item style={{height: 70}}>
                            <Icon type="SimpleLineIcons" name='tag' style={{fontSize:17}} />
                            <Text style={styles.font}>Name </Text>
                            <Input onChangeText={(title) => this.setState({title})}
                                   placeholder="ex: Quantum mechanics..."
                                   placeholderTextColor="#ccc5c5"
                                   value={this.state.title}
                                   style={{color: '#9e9797', paddingLeft: 45}}
                            />
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="MaterialIcons" name='subject' style={{fontSize:22}} />
                            <Text style={styles.font}>Subject </Text>
                            <Input onChangeText={(subject) => this.setState({subject})}
                                   placeholder="ex: Physics..."
                                   placeholderTextColor="#ccc5c5"
                                   value={this.state.subject}
                                   style={{color: '#9e9797', paddingLeft: 25}}
                            />
                        </Item>

                        <Item style={{height: 90}}>
                            <Icon style={{paddingBottom: 20, paddingTop: 10}} name='md-time' />
                            <Text style={{paddingBottom: 20, paddingTop: 10}}>From </Text>
                            <View style={{paddingBottom: 20, paddingTop: 10}}>
                                <TouchableOpacity onPress={this._showStartTimePicker}>
                                    <Text style={{color: '#9e9797', paddingLeft: 45}}>{this.state.start_duration}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isStartTimeVisible}
                                    onConfirm={this._handleStartTimePicked}
                                    onCancel={this._hideStartTimePicker}
                                    mode={'datetime'}
                                    is24Hour={false}
                                />
                          </View>
                            <Text style={{ position:'absolute', left: 30, paddingTop:45}}>To</Text>
                            <View style={{position:'absolute', left: 70, paddingTop:45}}>
                                <TouchableOpacity onPress={this._showEndTimePicker}>
                                    <Text style={{color: '#9e9797', paddingLeft: 45}}>{this.state.end_duration}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isEndTimeVisible}
                                    onConfirm={this._handleEndTimePicked}
                                    onCancel={this._hideEndTimePicker}
                                    mode={'datetime'}
                                    is24Hour={false}
                                />
                          </View>
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='dollar' />
                            <Text style={styles.font}>Price </Text>
                            <Input onChangeText={(price) => this.setState({price})}
                                    keyboardType='numeric'
                                    placeholder="ex:20 $..."
                                    placeholderTextColor="#ccc5c5"
                                    value={`${this.state.price}`}
                                    style={{color: '#9e9797', paddingLeft: 55}}
                            />
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon name='md-images' />
                            <Text style={styles.font}>Image </Text>
                            <Button
                                style={{alignSelf: "center"}}
                                onPress={() => this.selectImage()} light>
                                <Text style={styles.font}>
                                    {
                                        (this.state.img) && (
                                            <Icon name="md-checkmark-circle" style={{color: "green", fontSize: 17, marginRight: 10}} />
                                        )
                                    }
                                     Select</Text>
                            </Button>
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="Foundation" name='book' />
                            <Text style={styles.font}>Payment </Text>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}> Before Attend </Text>
                                <Radio style={{paddingRight: 10, paddingLeft: 8}} selected={this.state.payment === 1}
                                    onPress={(payment) => {this.setState({payment: 1})}}/>

                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>After Attend </Text>
                                <Radio style={{paddingLeft: 8}} selected={this.state.payment === 2}
                                    onPress={(payment) => {this.setState({payment: 2})}}/>  
                            </View>

                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="Foundation" name='book' />
                            <Text style={styles.font}>Course Type </Text>

                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}> College </Text>
                                <Radio style={{paddingRight: 20, paddingLeft: 8}} selected={this.state.type_course === 1}
                                    onPress={(type_course) => {this.setState({type_course: 1})}}/>

                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Genral</Text>
                                <Radio style={{paddingLeft: 8}} selected={this.state.type_course === 2}
                                    onPress={(type_course) => {this.setState({type_course: 2})}}/>  
                            </View>

                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name="transgender" />
                            <Text style={styles.font}>Sex:</Text>

                            <View style={{flexDirection: 'row',  paddingLeft: 10}}>
                                <Icon type="FontAwesome" name='male' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Male</Text>
                                <Radio style={{paddingRight: 5, paddingLeft: 8}} selected={this.state.gender === 1}
                                    onPress={(gender) => {this.setState({gender: 1})}}/>

                                <Icon type="FontAwesome" name='female' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Female</Text>
                                <Radio style={{paddingLeft: 8}} selected={this.state.gender === 2}
                                    onPress={(gender) => {this.setState({gender: 2})}}/>
                                
                                <Icon type="FontAwesome" name='transgender-alt' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Both</Text>
                                <Radio style={{paddingLeft: 8}} selected={this.state.gender === 3}
                                    onPress={(gender) => {this.setState({gender: 3})}}/>
                            </View>

                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='users' />
                            <Text style={styles.font}>Students </Text>
                            <Input onChangeText={(allowed) => this.setState({allowed})}
                                    keyboardType='numeric'
                                    placeholder="ex:150 student..."
                                    placeholderTextColor="#ccc5c5"
                                    value={`${this.state.allowed}`}
                                    style={{color: '#9e9797'}}
                            />
                        </Item>

                               
                        <Item style={{height: 70, borderColor: "transparent", paddingBottom: 0, marginBottom: 0}} underline={false}>
                            <Icon type="MaterialIcons" name='description' />
                            <Text style={styles.font}>Description</Text>
                        </Item>
                        <Item style={{marginBottom: 20}}>
                            <Textarea
                                style={{height: 200, paddingTop: 0, marginTop: 0, flex: 1}}
                                rowSpan={5}
                                bordered
                                onChangeText={(description) => this.setState({description})}
                                placeholder="Write more about the lecture"
                                placeholderTextColor="#ccc5c5"
                                value={this.state.description}
                            />
                        </Item>
                        <Button
                            onPress={() => this.EditLecture(this.state.id)}
                            style={{flexDirection: "row", backgroundColor: '#d3d3ea'}}
                            block
                        >
                            <Text style={{fontFamily: "Roboto", color: '#000'}}>Edit</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                            <Icon type="Entypo" name="edit" style={{color: Color.mainColor, fontSize: 18}}/>
                        </Button>
                    </Form>
                </View>
            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        flex: 1,
        padding: 10
    },
    content:{
        backgroundColor: Color.background,
        padding:7,
    },
    contentDescription:{
    },
    input:{
        width: 200,
        padding: 10,
        height:30,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
    },
    inputDescription:{
        width: 300,
        padding: 10,
        height:120,
        borderRadius: 5,
        marginTop: 7
    },
    inputText:{
        color: '#918f8f',
        fontSize: 14,
    },
    date:{
        position: 'absolute',
        right: 15,
    },
    button:{
        backgroundColor: '#6483f7',
        position: 'absolute',
        right: 20,
        bottom: 10
    },
    font:{
        fontFamily: "Roboto",
    },
});
