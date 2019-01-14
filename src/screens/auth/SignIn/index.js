import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ActivityIndicator, AsyncStorage } from 'react-native';
import { Content, Form, Item, Button, Input, Toast} from 'native-base';
import Server from '../../../constants/config';
import axios from "axios";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSigningIn: false,
            email: "",
            password: ""
        }
    }

    onLoginPressed(){
        
        if(this.state.email == '' || this.state.password == ''){
            Toast.show({
                text: 'Email and password cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            })
        }else{
            this.setState({
                isSigningIn: true
            });
            
            return axios.post(Server.url + 'api/auth/login', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.props.setUser(response.data.access_token);
                // let item = this.storeItem('token', response.data.access_token);
                AsyncStorage.setItem('token',''+response.data.access_token)
                Toast.show({
                    text: 'Logged in successfully',
                    type: 'success',
                    buttonText: 'Okay'
                });
                axios.post(Server.url+'api/auth/me?token=' + response.data.access_token).then(response => {
                    if(response.data.type == 1){
                        this.props.navigation.navigate('AppStudent');
                    }else{
                        this.props.navigation.navigate('AppTeacher');
                    }
                    this.props.setUser(response.data);
                });
                this.setState({
                    isSigningIn: false
                })
            }).catch(error => {
                Toast.show({
                    text: 'Wrong email or password.',
                    type: "danger",
                    buttonText: 'Okay'
                });
                this.setState({
                    isSigningIn: false
                });
            })
        }
    }

    // async storeItem(key, item) {
    //     try{
    //         let jsonOfItem = await AsyncStorage.setItem(key, item);
    //         return jsonOfItem;
    //     }catch(error){
    //         console.log(error.message);
    //     }
    // }

    render() {
        return (
            <ImageBackground style={{width: '100%', height: '100%'}} source={require('../../../images/bg.jpg')}>
            <Image style={styles.logo} source={require('../../../images/LightenedLogo.png')} />
                <Content>
                  
                <View style={styles.list}>
                    <Form>
                        <Item>
                            <Input placeholder="Email or Phone" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({email: val})}/>
                        </Item>

                        <Item>
                            <Input secureTextEntry={true} placeholder="Password" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({password: val})}/>
                        </Item>

                        <Button style={styles.button} onPress={ () => this.onLoginPressed()} >
                            <Text style={styles.buttonTxt}>Login</Text>
                            {this.state.isSigningIn && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>
                    </Form>

                    <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('ForgetPassword')}>
                        <Text style={styles.forgetButton}> Forgot Your Password? </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('GettingIn')}>
                        <Text style={styles.registerButton}> Don't have an account yet? </Text>
                    </TouchableOpacity>

                </View>
                </Content>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
  logo:{
    width: '50%', 
    height: '50%', 
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  list:{
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '70%',
    paddingBottom: 200
  },
  input:{
    color: '#fff',
    textAlign: 'center',
    fontFamily: "Roboto",
  },
  button:{
    backgroundColor: '#37446e',
    paddingTop: 10,
    paddingBottom: 10,
    padding: 70,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonTxt:{
    color: '#fff',
    fontSize: 20,
    fontFamily: "Roboto",
  },
  forgetButton:{
      color: '#d9cdb7',
      fontSize: 16,
      marginTop: 10,
      fontFamily: "Roboto",
      justifyContent: 'center', 
      alignSelf: 'center'
      
  },
  registerButton:{
    color: '#d9cdb7',
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Roboto",
    justifyContent: 'center', 
    alignSelf: 'center'
}
});

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
