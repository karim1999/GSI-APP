import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { ListItem, Left, Right, Icon,Button} from 'native-base';


export default class GettingIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      type : ''
    }
  }

    render() {
        return (
              <ImageBackground style={{width: '100%', height: '100%'}} source={require('../../../images/background.jpg')}>
                  <Image style={styles.logo} source={require('../../../images/LightenedLogo.png')} />

                <View style={styles.list}>
                    <TouchableOpacity style={styles.student} onPress={()=> this.props.navigation.navigate('SignUp', {type:0} )}>
                        <Image style={styles.imageStyle} source={require('../../../images/student_1144709.png')} />
                        <Text style={styles.studentTxt}>Student</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Teacher} onPress={()=> this.props.navigation.navigate('SignUp', {type:1} )}>
                        <Image style={styles.imageStyle} source={require('../../../images/img_245706.png')} />
                        <Text style={styles.teacherTxt}>Teacher</Text>
                    </TouchableOpacity>

                </View>

              </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
  logo:{
    width: 450, 
    height: 450, 
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  list:{
    flex: 1,
    alignSelf: 'center',
    alignItems:'flex-start',
    flexDirection: 'row',
  },
  student:{
    backgroundColor:'#a9be9a',
    marginRight: 30,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 35
  },
  imageStyle:{
    width: 75,
    height: 90,
  },
  studentTxt:{
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: "Roboto",
  },
  Teacher:{
    backgroundColor:'#293845',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 35
  },
  teacherTxt:{
    color: '#e7bbbb',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: "Roboto",
  },
});
