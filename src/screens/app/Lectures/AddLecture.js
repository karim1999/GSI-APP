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

export default class AddLecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title: "",
            price: 0,
            payment: 2,
            type_course: 1,
            gender: 3,
            allowed: 30,
            img: "",
            description: "",
            start_date: moment(new Date).format('YYYY-MM-DD'),
            end_date: moment(new Date).format('YYYY-MM-DD'),
            start_time: " Start Time",
            end_time: " End Time",
            selectedHours: 0,
            selectedMinutes: 0,
            searchedAdresses: [],
            searchedUsers: [],
            tableData:[], 
            a:[],
            isStartDateVisible: false,
            isEndDateVisible: false,
            isStartTimeVisible: false,
            isEndTimeVisible: false,
            namePhone:[],
            datas: []
        };
        
        // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}); //autoComplete
    }

    // Start timePicker
    _showStartDatePicker = () => this.setState({ isStartDateVisible: true });
    _showEndDatePicker = () => this.setState({ isEndDateVisible: true });
    _showStartTimePicker = () => this.setState({ isStartTimeVisible: true });
    _showEndTimePicker = () => this.setState({ isEndTimeVisible: true });

    _hideStartDatePicker = () => this.setState({ isStartDateVisible: false });
    _hideEndDatePicker = () => this.setState({ isEndDateVisible: false });
    _hideStartTimePicker = () => this.setState({ isStartTimeVisible: false });
    _hideEndTimePicker = () => this.setState({ isEndTimeVisible: false });

    _handleStartDatePicked = (date) => {
        this.setState({
            isStartDateVisible: false,
            start_date: moment(date).format('YYYY-MM-DD'),
            // start_duration: moment(date).format('YYYY-MM-DD h:mm a')
        })
    };

    _handleEndDatePicked = (date) => {
        this.setState({
            isEndDateVisible: false,
            end_date: moment(date).format('YYYY-MM-DD')
        })
    };
    
    _handleStartTimePicked = (date) => {
        this.setState({
            isStartTimeVisible: false,
            start_time: moment(date).format('h:mm a'),
            end_time: moment(date).add(2, 'hours').format('h:mm a')
            // start_duration: moment(date).format('YYYY-MM-DD h:mm a')
        })
        var now  = this.state.start_date+" "+this.state.start_time;
        var then = this.state.end_date+" "+this.state.end_time;
        
       diffrance = Math.abs( moment(now,"YYYY-MM-DD HH:mm A").diff(moment(then,"YYYY-MM-DD HH:mm A"),'hours',true))
       price = Math.round(diffrance * 10);
       this.setState({price})
    };

    _handleEndTimePicked = (date) => {
        this.setState({
            isEndTimeVisible: false,
            end_time: moment(date).format('h:mm a')
        })
        var now  = this.state.start_date+" "+this.state.start_time;
        var then = this.state.end_date+" "+this.state.end_time;
        
       diffrance = Math.abs( moment(now,"YYYY-MM-DD HH:mm A").diff(moment(then,"YYYY-MM-DD HH:mm A"),'hours',true))
       price = Math.round(diffrance * 10);
       this.setState({price})
    };
    //End timePicker

    //start autoComplete
    componentDidMount(){
        return axios.get(Server.url + 'api/addlectureusers')
        .then(response=>{
            this.setState({
                searchedUsers: response.data,
                showData: this.state.searchedUsers
            })
            let showData = []
            showData = _.map(response.data, user => {
                return {...user, name: user.name + " - " + user.phone.toString().slice(0, 4)+"xxxx"}
            } )
            this.setState({
                datas: showData
            })
        }).catch(error => {
           
        })
    }

    // searchedAdresses = (searchedText) => {
    //     var adresses =  this.state.searchedUsers
        
    //     var searchedAdresses = adresses.filter(function(adress) {
    //         return adress.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    //     });
    //     this.setState({searchedAdresses: searchedAdresses});
    //     };

        onSelectedItemsChange = tableData => {
            this.setState({ tableData });
        };

        // add_student = (id,name,mobile)=>{
        //     tableData = {
        //         id,
        //       }
        //     oldTableData= this.state.tableData;
        //     oldTableData.push(tableData);
        //     this.setState({tableData:oldTableData})
        //     // alert(JSON.stringify(this.state.tableData))

        //     // this.setState({tableData:[{
        //     //     'name': 'asdasd',
        //     //     'mobile': 'asdasd',
        //     //   },{
        //     //     'name': 'asdasd',
        //     //     'mobile': 'asdasd',
        //     //   },
        //     //   {
        //     //     'name': 'abcsdsdsdd',
        //     //     'mobile': '8858855',
        //     //   }
            
        //     // ]})
        // renderAdress = (adress) => {
        //     return (
        //         <TouchableOpacity onPress={()=>this.add_student(adress.id,adress.name,adress.phone)}>
        //             <Text  >{adress.name}, {adress.phone}</Text>
        //         </TouchableOpacity>
        //     );
        //     };
            
        // }

    //end autoComplete

    selectImage(){
        let options = {
            title: "Lecture Image",
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

    addLecture(){
        this.setState({
            isLoading: true
        });
            if(this.state.title == "" || this.state.type_course == "" || 
            this.state.gender == "" || this.state.allowed == ""  || this.state.start_date == "" || 
            this.state.end_date == "" || this.state.start_time == "" || this.state.end_time == ""){
                Toast.show({
                    text: 'please fill out fields.',
                    type: "danger",
                    buttonText: 'Okay'
                });
                this.setState({
                    isLoading: false
                });
            }else{
            // var timeStart = new Date("01/01/2007 " + this.state.start_duration).getHours() + (new Date("01/01/2007 " + this.state.start_duration).getMinutes()/60);
            // var timeEnd = new Date("01/01/2007 " + this.state.end_duration).getHours()+ (new Date("01/01/2007 " + this.state.end_duration).getMinutes()/60);
                return AsyncStorage.getItem('token').then(userToken => {
                    let data = new FormData();
                    start_duration = this.state.start_date+" "+this.state.start_time;
                    end_duration = this.state.end_date+" "+this.state.end_time;
                    // duration_date = start_duration.split(" ")[0];
                    data.append('title', this.state.title);
                    data.append('payment', this.state.payment);
                    data.append('type_course', this.state.type_course);
                    data.append('gender', this.state.gender);
                    data.append('price', this.state.price);
                    data.append('allowed', this.state.allowed);
                    data.append('description', this.state.description);
                    data.append('start_duration', start_duration);
                    data.append('end_duration', end_duration);
                    data.append('start_date', this.state.start_date);
                    data.append('end_date', this.state.end_date);
                    data.append('start_time', this.state.start_time);
                    data.append('end_time', this.state.end_time);
                    // if(timeStart>timeEnd){
                    //     if (this.state.price) {
                    //         data.append('price', this.state.price * (timeStart - timeEnd ));
                    //     }else{
                    //         data.append('price', (timeStart - timeEnd ) * 10);
                    //     }                        
                    // }else{
                    //     if (this.state.price) {
                    //         data.append('price', this.state.price * (timeEnd - timeStart ));
                    //     }else{
                    //         data.append('price', (timeEnd - timeStart ) * 10);
                    //     }
                    // }

                    if (this.state.img) {
                        data.append('img', {
                            name: "img",
                            uri: this.state.img,
                            type: 'image/png'
                        });
                    }

                    if(this.state.tableData == []){
                        return axios.post(Server.url + 'api/addLecture?token='+userToken, data).then(response => {
                            this.setState({
                                isLoading: false,
                            });
                            Toast.show({
                                text: "A Lecture was added successfully",
                                buttonText: "Ok",
                                type: "success"
                            });
                            this.props.navigation.navigate("Teacher");
                            this.props.setUser(response.data);
                        }).catch(error => {
                            Toast.show({
                                text: "Check your connection",
                                buttonText: "Ok",
                                type: "danger"
                            });
                            this.setState({
                                isLoading: false,
                            });
                        })
                        
                    }else{
                        return axios.post(Server.url + 'api/addLecture?token='+userToken, data).then(response => {
                            this.setState({
                                isLoading: false,
                            });
                            Toast.show({
                                text: "A Lecture was added successfully",
                                buttonText: "Ok",
                                type: "success"
                            });
                            this.props.navigation.navigate("Teacher", {isLoading: true});
                            for(var i=0; i<this.state.tableData.length; i++ ){
                                axios.post(Server.url + 'api/jointlectureusers/'+response.data.id+'/'+ this.state.tableData[i])
                                .then(response => {
                                }).catch(error => {
                                    alert(JSON.stringify(error))
                                })
                            }
                        }).catch(error => {
                            alert(JSON.stringify(data));
                            this.setState({
                                isLoading: false,
                            });
                        })
                    }

                }).then(() => {
                    this.setState({
                        isLoading: false
                    });
                }).catch(error=>{
                    this.setState({
                        isLoading: false,
                    });
                })
            }
    }
    
    render() {
        const data = this.state;
        
        return (
            <AppTemplate title="Add lecture" back navigation={this.props.navigation}>
                <View style={styles.content}>
                    <Form style={styles.container}>

                        <Item style={{height: 70}}>
                            <Icon type="SimpleLineIcons" name='tag' style={{fontSize:17}} />
                            <Text style={styles.font}>Name </Text>
                            <Input onChangeText={(title) => this.setState({title})}
                                   placeholder="ex: Quantum mechanics..."
                                   placeholderTextColor="#ccc5c5"
                                   style={{color: '#9e9797', paddingLeft: 45}}
                            />
                        </Item>
                        
                        <Item style={{height: 90}}>
                            <Icon style={{paddingBottom: 20, paddingTop: 10}} type="Entypo" name='calendar' />
                            <Text style={{paddingBottom: 20, paddingTop: 10}}>From </Text>
                            <View style={{paddingBottom: 20, paddingTop: 10}}>
                                <TouchableOpacity onPress={this._showStartDatePicker}>
                                    <Text style={{color: '#9e9797', paddingLeft: 45}}>{this.state.start_date}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isStartDateVisible}
                                    onConfirm={this._handleStartDatePicked}
                                    onCancel={this._hideStartDatePicker}
                                    is24Hour={false}
                                />
                          </View>
                            <Text style={{ position:'absolute', left: 30, paddingTop:45}}>To</Text>
                            <View style={{position:'absolute', left: 75, paddingTop:45}}>
                                <TouchableOpacity onPress={this._showEndDatePicker}>
                                    <Text style={{color: '#9e9797', paddingLeft: 45}}>{this.state.end_date}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isEndDateVisible}
                                    onConfirm={this._handleEndDatePicked}
                                    onCancel={this._hideEndDatePicker}
                                    is24Hour={false}
                                />
                          </View>
                        </Item>

                        <Item style={{height: 90}}>
                            <Icon style={{paddingBottom: 20, paddingTop: 10}} name='md-time' />
                            <Text style={{paddingBottom: 20, paddingTop: 10}}>From </Text>
                            <View style={{paddingBottom: 20, paddingTop: 10}}>
                                <TouchableOpacity onPress={this._showStartTimePicker}>
                                    <Text style={{color: '#9e9797', paddingLeft: 45}}>{this.state.start_time}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isStartTimeVisible}
                                    onConfirm={this._handleStartTimePicked}
                                    onCancel={this._hideStartTimePicker}
                                    mode={'time'}
                                    is24Hour={false}
                                />
                          </View>
                            <Text style={{ position:'absolute', left: 30, paddingTop:45}}>To</Text>
                            <View style={{position:'absolute', left: 68, paddingTop:45}}>
                                <TouchableOpacity onPress={this._showEndTimePicker}>
                                    <Text style={{color: '#9e9797', paddingLeft: 45}}>{this.state.end_time}</Text>
                                </TouchableOpacity>
                                <DateTimePicker
                                    isVisible={this.state.isEndTimeVisible}
                                    onConfirm={this._handleEndTimePicked}
                                    onCancel={this._hideEndTimePicker}
                                    mode={'time'}
                                    is24Hour={false}
                                />
                          </View>
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='money' />
                            <Label style={styles.font}>Price </Label>
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
                            <Label style={styles.font}>Image </Label>
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
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}> Before Attend</Text>
                                <Radio style={{paddingRight: 4, paddingLeft: 4}} selected={this.state.payment === 1}
                                    onPress={(payment) => {this.setState({payment: 1})}}/>

                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>After Attend</Text>
                                <Radio style={{paddingLeft: 4}} selected={this.state.payment === 2}
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

                            <View style={{flexDirection: 'row',  paddingLeft: 4}}>
                                <Icon type="FontAwesome" name='male' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Male</Text>
                                <Radio style={{paddingRight: 3, paddingLeft: 4}} selected={this.state.gender === 1}
                                    onPress={(gender) => {this.setState({gender: 1})}}/>

                                <Icon type="FontAwesome" name='female' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Female</Text>
                                <Radio style={{paddingLeft: 4, paddingRight:3}} selected={this.state.gender === 2}
                                    onPress={(gender) => {this.setState({gender: 2})}}/>
                                
                                <Icon type="FontAwesome" name='transgender-alt' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Both</Text>
                                <Radio style={{paddingLeft: 4}} selected={this.state.gender === 3}
                                    onPress={(gender) => {this.setState({gender: 3})}}/>
                            </View>

                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='users' />
                            <Text style={styles.font}>Students </Text>
                            <Input onChangeText={(allowed) => this.setState({allowed})}
                                    keyboardType='numeric'
                                    value= {`${this.state.allowed}`}
                                    placeholder="ex:150 student..."
                                    placeholderTextColor="#ccc5c5"
                            />
                        </Item>

                        <MultiSelect
                            hideTags
                            items={this.state.datas}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.tableData}
                            selectText="Add students"
                            searchInputPlaceholderText="Search students..."
                            onChangeInput={ (text)=> console.log(text)}
                            altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            styles={{backgroundColor: 'red'}}
                        />
                               
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
                            />
                        </Item>
                        <Button
                            onPress={() => this.addLecture()}
                            style={{flexDirection: "row", backgroundColor: '#d3d3ea'}}
                            block
                        >
                            <Text style={{fontFamily: "Roboto", color: '#000'}}>Add</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                            <Icon type="Ionicons" name="md-add-circle" style={{color: Color.mainColor, fontSize: 18}}/>
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
