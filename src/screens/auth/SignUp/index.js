import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import {Container, Content, Form, Item, Button, Input, Toast} from 'native-base';
import PhoneInput from 'react-native-phone-input'

export default class SignUp extends Component {
    constructor(props){
        super(props);

        this.state = {
            isSignUp: false,
            name: "",
            middleName: "",
            lastName: "",
            email: "",
            password: "",
            phone: "",
            type: this.props.navigation.state.params,
        }
    }

    nextRegisterPressed(){
        if(this.state.name == "" || this.state.middleName == "" || this.state.lastName == "" ||
         this.state.email == "" || this.state.password == "" || this.state.phone == ""){
            Toast.show({
                text: 'Fields cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            });
         }else{
             var new_phone = this.state.phone.replace("+", "");
            this.props.navigation.navigate('SignUp2', {name:this.state.name, middleName: this.state.middleName, 
                lastName: this.state.lastName, email: this.state.email, password: this.state.password,
                phone: new_phone, type: this.state.type.type,})
         }
    }
    

    render() {
        return (
            <ImageBackground style={{width: '100%', height: '100%'}} source={require('../../../images/bg.jpg')}>
                  <Image style={styles.logo} source={require('../../../images/LightenedLogo.png')} />
                  <Content>
                <View style={styles.list}>
                    <Form>
                        <Item style={styles.margin}>
                            <Input placeholder="First Name (In Arabic)" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({name: val})}/>
                        </Item>

                        <Item style={styles.margin}>
                            <Input placeholder="Middle Name (In Arabic)" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({middleName: val})}/>
                        </Item>

                        <Item style={styles.margin}>
                            <Input placeholder="Last Name (In Arabic)" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({lastName: val})}/>
                        </Item>

                        <Item style={styles.margin}>
                            <Input placeholder="E-mail" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({email: val})}/>
                        </Item>

                        <Item style={styles.margin}>
                            <Input secureTextEntry={true} placeholder="Password (min 6 characters)" placeholderTextColor= "#d9cdb7" style={styles.input}
                                onChangeText={(val) => this.setState({password: val})}/>
                        </Item>

                        <View style={styles.margin}>
                            <PhoneInput
                                textStyle={{color: '#fff'}}	
                                ref={(ref) => { this.phone = ref; }}
                                onChangePhoneNumber={(val) => this.setState({phone: val})}
                                initialCountry='kw'
                            />
                        </View>


                        <Button style={styles.button} onPress={() => this.nextRegisterPressed()}>
                            <Text style={styles.buttonTxt}>Next</Text>
                        </Button>
                    </Form>
                </View>
                </Content>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
  logo:{
    width: '20%', 
    height: '20%', 
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  list:{
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingBottom: 90 
  },
  input:{
    color: '#fff',
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
    fontFamily: "Roboto",
  },
  signinButton:{
      color: '#d9cdb7'
  },
  margin:{
      marginBottom: 10
  }
});
