import React, { Component } from 'react';
import {StyleSheet, View, AsyncStorage, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { Button, Item, Text, Input, Form, Icon, Toast, Radio,} from 'native-base';
import AppTemplate from "../appTemplate";
import Color from '../../../constants/colors';
import axios from "axios/index";
import Server from "../../../constants/config";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";
import ImagePicker from "react-native-image-picker";
import firebase from 'react-native-firebase';

class SettingsStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            middleName: this.props.user.middleName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            phone: this.props.user.phone,
            civilIDNumber: this.props.user.civilIDNumber,
            gender: this.props.user.gender,
            oldPassword: "",
            newpassword: "",
            isLoading: false,
            isLoadingPassword: false,
            img: this.props.user.img            
        };
    }    

    Editprofile(){
        this.setState({
            isLoading: true
        });
        return AsyncStorage.getItem('token').then(userToken => {
            let data = new FormData();
            data.append('name', this.state.name);
            data.append('middleName', this.state.middleName);
            data.append('lastName', this.state.lastName);
            data.append('email', this.state.email);
            data.append('phone', this.state.phone);
            data.append('civilIDNumber', this.state.civilIDNumber);
            data.append('gender', this.state.gender);
            return axios.post(Server.url + 'api/auth/updateprofile?token='+userToken, data).then(response => {
                this.setState({
                    isLoading: false,
                });
                Toast.show({
                    text: "Your profile was edited successfully",
                    buttonText: "Ok",
                    type: "success"
                });
                this.props.setUser(response.data);
            }).catch(error => {
                let text= 'email already taken';
                Toast.show({
                    text,
                    type: 'danger',
                    buttonText: 'Okay'
                });
            })
        }).then(() => {
            this.setState({
                isLoading: false
            });
        });
    }

    changePassword(){
        this.setState({
            isLoadingPassword: true,
        });
            if(this.state.oldPassword == '' || this.state.newpassword == ''){
                Toast.show({
                    text: "Please fill out fields.",
                    buttonText: "Ok",
                    type: "danger"
                })
                this.setState({
                    isLoadingPassword: false,
                });
            }else{
                return AsyncStorage.getItem('token').then(userToken => {
                    return axios.post(Server.url+'api/auth/updatepassword?token='+userToken,{
                        oldPassword: this.state.oldPassword,
                        newpassword: this.state.newpassword
                    }).then(response => {
                        this.setState({
                            isLoadingPassword: false,
                        });
                        Toast.show({
                            text: 'Successfully add new password',
                            type: "success",
                            buttonText: 'Okay'
                        });
                    }).catch(error => {
                        this.setState({
                            isLoadingPassword: false,
                        });
                        alert(JSON.stringify(error));
                        Toast.show({
                            text: "Password does not match.",
                            buttonText: "Ok",
                            type: "danger"
                        })
                    })
                })

            }
      }

      changeImg(){
        let options = {
            title: "Avatar",
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
                this.setState({
                    isLoading: true,
                    img: response.uri
                });
                var c = '/userImage/'+'_' + Math.random().toString(36).substr(2, 9);
                firebase.storage()
                .ref(c)
                .putFile(this.state.img)
                .then(snapshot => {
                    firebase.storage().ref(c).getDownloadURL().then(url => {
                        AsyncStorage.getItem('token').then(userToken => {
                            let data = new FormData();
                            data.append('img', url);
                            return axios.post(Server.url+'api/user/img?token='+userToken, data).then((response) => {
                                this.setState({
                                    isLoading: false,
                                });
                                this.props.setUser(response.data);
                            }).catch((error) => {
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "Unknown error has occurred",
                                    buttonText: "OK",
                                    type: "danger"
                                })
                            })
                        })                            
                    }) 
                });
            }
        });
    }

    render() {
        return (
            <AppTemplate title = "Settings" navigation={this.props.navigation}>
                <View style={styles.content}>
                    <Form style={styles.container}>
                        <TouchableOpacity
                            onPress={() => this.changeImg()}
                        >
                            <Image source={{uri: this.state.img}} style={styles.image}/>
                        </TouchableOpacity>

                        <Item style={{height: 70}}>
                            <Icon type="SimpleLineIcons" name='tag' style={{fontSize:17}} />
                            <Text style={styles.font}>Name </Text>
                            <Input onChangeText={(name) => this.setState({name})}
                                   value={this.state.name}
                                   style={{color: '#9e9797', paddingLeft: 80}}
                            />
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="SimpleLineIcons" name='tag' style={{fontSize:17}} />
                            <Text style={styles.font}>Middle name </Text>
                            <Input onChangeText={(middleName) => this.setState({middleName})}
                                   value={this.state.middleName}
                                   style={{color: '#9e9797', paddingLeft: 30}}
                            />
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="SimpleLineIcons" name='tag' style={{fontSize:17}}/>
                            <Text style={styles.font}>Last name </Text>
                            <Input onChangeText={(lastName) => this.setState({lastName})}
                                    value={this.state.lastName}
                                    style={{color: '#9e9797', paddingLeft: 50}}
                            />
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="Entypo" name='mail' />
                            <Text style={styles.font}>Email </Text>
                            <Input onChangeText={(email) => this.setState({email})}
                                    value={this.state.email}
                                    style={{color: '#9e9797', paddingLeft: 55}}
                            />
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='mobile-phone' />
                            <Text style={styles.font}>Phone </Text>
                            <Input onChangeText={(phone) => this.setState({phone})}
                                    value={this.state.phone}
                                    style={{color: '#9e9797', paddingLeft: 70}}
                            />
                        </Item>

                        <Item style={{height: 70}}>
                            <Icon type="AntDesign" name='idcard' />
                            <Text style={styles.font}>Civil id number </Text>
                            <Input onChangeText={(civilIDNumber) => this.setState({civilIDNumber})}
                                    value={this.state.civilIDNumber}
                                    style={{color: '#9e9797', paddingLeft: 15}}
                            />
                        </Item>


                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name="transgender" />
                            <Text style={styles.font}>Sex:</Text>

                            <View style={{flexDirection: 'row',  paddingLeft: 10}}>
                                <Icon type="FontAwesome" name='male' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Male</Text>
                                <Radio style={{paddingRight: 7, paddingLeft: 7}} selected={this.state.gender === 1}
                                    onPress={(gender) => {this.setState({gender: 1})}}/>

                                <Icon type="FontAwesome" name='female' />
                                <Text style={{fontFamily: "Roboto", color: '#9e9797'}}>Female</Text>
                                <Radio style={{paddingLeft: 7}} selected={this.state.gender === 2}
                                    onPress={(gender) => {this.setState({gender: 2})}}/>
                            
                            </View>
                        </Item>
                               
                        <Button
                            onPress={() => this.Editprofile()}
                            style={{flexDirection: "row", backgroundColor: '#d3d3ea'}}
                            block
                        >
                            <Text style={{fontFamily: "Roboto", color: '#000'}}>Save</Text>
                            {this.state.isLoading && (
                                <ActivityIndicator size="small" color="#000000" />
                            )}
                            <Icon type="Entypo" name="edit" style={{color: Color.mainColor, fontSize: 18}}/>
                        </Button>
                    </Form>
                </View>

                <View style={styles.content}>
                    <Form style={styles.container}>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='lock' style={{fontSize:17}} />
                            <Text style={styles.font}>Old password </Text>
                            <Input onChangeText={(oldPassword) => this.setState({oldPassword})}
                                secureTextEntry={true}
                                placeholder="Enter previous pass..."
                                placeholderTextColor="#ccc5c5"
                                style={{color: '#9e9797', paddingLeft: 45}}
                            />
                        </Item>
                        <Item style={{height: 70}}>
                            <Icon type="FontAwesome" name='lock' style={{fontSize:17}} />
                            <Text style={styles.font}>New password </Text>
                            <Input onChangeText={(newpassword) => this.setState({newpassword})}
                                placeholder="Enter new pass..."
                                placeholderTextColor="#ccc5c5"
                                secureTextEntry={true}
                                style={{color: '#9e9797', paddingLeft: 35}}
                            />
                        </Item>

                        <Button
                            onPress={() => this.changePassword()}
                            style={{flexDirection: "row", backgroundColor: '#d3d3ea'}}
                            block
                        >
                            <Text style={{fontFamily: "Roboto", color: '#000'}}>Save</Text>
                            {this.state.isLoadingPassword && (
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
    image:{
        alignItems:'center',
        alignSelf: 'center',
        paddingTop: 10,
        width: 100, 
        height: 100, 
        borderRadius: 50        
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

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsStudent);
