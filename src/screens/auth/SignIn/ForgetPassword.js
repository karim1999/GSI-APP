import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground, ActivityIndicator } from 'react-native';
import { Content, Form, Item, Input, Button, Toast} from 'native-base';
import Colors from "../../../constants/colors";
import Server from "../../../constants/config"
import axios from "axios";
export default class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
           isResetPassword: false,
           email: "",
        }
    }
    onResetPasswordPressed(){
        if(this.state.email == ""){
            
            Toast.show({
                text: 'email cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            });
        
        }else{
             this.setState({
                isResetPassword:true
            });

        return axios.post(Server.url+'api/password/reset',{

            email: this.state.email
            
        }).then(response => {
            Toast.show({
                text: 'A reset email has been sent! Please check your email.',
                type: 'success',
                buttonText: 'Okay'
            });
            this.setState({
                isResetPassword: false
            });
        }).catch(error => {
                if(error.response.data.error.email){
                    Toast.show({
                        text: error.response.data.error.email,
                        type: 'danger',
                        buttonText: 'Okay'
                    });
                    this.setState({
                        isResetPassword: false
                    });
                }
        });
        }
    }

    render() {
        return (
                <ImageBackground style={{width: '100%', height: '100%'}} source={require('../../../images/bg.jpg')}>
                    <Image 
                    source={require('../../../images/LightenedLogo.png')}
                     style={styles.logo}
                    />
                    <Content>
                    <View style={styles.list}>
                    <Form>
                        <Item>
                            <Input placeholder="Email" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({email: val})}/>
                        </Item>

                        <Button style={styles.button} onPress={ () => this.onResetPasswordPressed()} >
                            <Text style={styles.buttonTxt}> Reset Password </Text>
                            {this.state.isResetPassword && (
                            <ActivityIndicator style={{}} size="small" color="#000000" />
                            )}
                        </Button>
                    </Form>
                    <TouchableOpacity style={{alignItems: 'center',}} onPress={()=> this.props.navigation.navigate('SignIn')}>
                        <Text style={styles.loginButton}>Back to login?</Text>
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
        color: '#d9cdb7',
        fontFamily: "Roboto",
        textAlign: 'center'
      },
     loginButton:{
      color: '#d9cdb7',
      fontSize: 16,
      marginTop: 10,
      fontFamily: "Roboto",
      justifyContent: 'center', 
      alignSelf: 'center'
      
  },
});
