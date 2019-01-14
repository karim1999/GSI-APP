import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { Form, ListItem, Item, Button, Input, Picker, Icon, Left, Right, Radio, Toast} from 'native-base';
import Server from "../../../constants/config"
import axios from "axios";


export default class SignUp2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSignUp: false,
            register: this.props.navigation.state.params,
            civilIDNumber: '',
            gender: ''
        }
    }

    onRegisterPressed(){
        // if(/^[0-9a-zA-Z]+$/.test(this.state.register.name) && /^[0-9a-zA-Z]+$/.test(this.state.register.middleName) &&
        // /^[0-9a-zA-Z]+$/.test(this.state.register.lastName)){
        //     let text= 'Name must be in arabic and no numbers';
        //     Toast.show({
        //         text,
        //         type: 'danger',
        //         buttonText: 'Okay'
        //     });
        // }
        if(this.state.civilIDNumber.length != 12){
            let text= 'civil id number should be 12 numbers';
            Toast.show({
                text,
                type: 'danger',
                buttonText: 'Okay'
            });
        }
        else{
            this.setState({
                isSignUp: true
            });
        return axios.post(Server.url + 'api/auth/register',{
            name: this.state.register.name,
            middleName: this.state.register.middleName,
            lastName: this.state.register.lastName,
            email: this.state.register.email,
            password: this.state.register.password,
            type: this.state.register.type,
            phone: this.state.register.phone,
            civilIDNumber: this.state.civilIDNumber,
            gender: this.state.gender,
        }).then(response => {
            Toast.show({
                text: 'Register successfully',
                type: 'success',
                buttonText: 'Okay'
            });
            this.setState({
                isSignUp: false
            });
            this.props.navigation.navigate("SignIn");
        }).catch(error => {
            // alert(JSON.stringify(error))
            if(error.response.data.msg.email){
                let text= error.response.data.msg.email;
                Toast.show({
                    text,
                    type: 'danger',
                    buttonText: 'Okay'
                });
            }else if(error.response.data.msg.phone){
                let text= error.response.data.msg.phone;
                Toast.show({
                    text,
                    type: 'danger',
                    buttonText: 'Okay'
                });
            }else if(error.response.data.msg.password){
                let text= error.response.data.msg.password;
                Toast.show({
                    text,
                    type: 'danger',
                    buttonText: 'Okay'
                });
            }
            else{
                alert(error.json());
                let text= "Internet connection";
                Toast.show({
                    text,
                    type: 'danger',
                    buttonText: 'Okay'
                });
            }
            this.setState({
                isSignUp: false
            });
        })
        }
    }

    render() {
        return (
            <ImageBackground style={{width: '100%', height: '100%'}} source={require('../../../images/bg.jpg')}>
                  <Image style={styles.logo} source={require('../../../images/LightenedLogo.png')} />
                <View style={styles.list}>
                    <Form>
                        <Item>
                            <Input placeholder="Civil ID Number" keyboardType='numeric' 
                                placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({civilIDNumber: val})}/>
                        </Item>

                        <Item style={{height: 70}}>
                            <Text style={styles.title}>Sex: </Text>

                            <View style={{flexDirection: 'row'}}>
                                <Icon type="FontAwesome" name='male' />
                                <Text style={styles.font}>Male</Text>
                                <Radio style={{paddingRight: 20, paddingLeft: 8}}
                                    selected={this.state.gender === 1}
                                    onPress={(gender) => {this.setState({gender: 1})}}/>

                                <Icon type="FontAwesome" name='female' />
                                <Text style={styles.font}>Female</Text>
                                <Radio style={{paddingLeft: 8}}
                                    selected={this.state.gender === 2}
                                    onPress={(gender) => {this.setState({gender: 2})}}
                                    />  
                            </View>

                        </Item>

                        <Button style={styles.button} onPress={ () => this.onRegisterPressed()}>
                            <Text style={styles.buttonTxt}>Register</Text>
                            {this.state.isSignUp && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>
                    </Form>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
  logo:{
    width: '70%', 
    height: '70%', 
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  list:{
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingBottom: 100
  },
  input:{
    color: '#d9cdb7',
    textAlign: 'center',
    fontFamily: "Roboto",
  },
  button:{
    backgroundColor: '#364675',
    padding: 70,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonTxt:{
    color: '#fff',
    fontSize: 20,
  },
  signinButton:{
      color: '#d9cdb7'
  },
  title:{
      fontSize: 20,
      marginRight: 50,
      color: '#d9cdb7',
      fontFamily: "Roboto",
  },
  font:{
    fontFamily: "Roboto",
    color: '#d9cdb7'
},
});
