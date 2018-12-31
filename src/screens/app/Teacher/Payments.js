import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, AsyncStorage } from 'react-native';
import {H1, H3, Item, Label, Button, Icon} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";

export default class Payments extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLectAndUser: [],
            isLoading: false,
            random:['#d93232', '#636c8f', '#6c856c', '#fbaf5d'],
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/getusers?token='+userToken)
            .then(response => {
                this.setState({
                    isLoading: false,
                    showLectAndUser: response.data
                })
            }).catch(error => {
                Toast.show({
                    text: 'Error reachig server',
                    buttonText: "Ok",
                    type: "danger"
                })
            })
        })
    }

    render() {
        return (
            <AppTemplate title="Payment" navigation={this.props.navigation}>
                <View style={styles.content}>
                {
                    (this.state.isLoading)? (
                        <View>
                            <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                        </View>
                    ): (
                        <FlatList
                            ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Your profile is empty start adding lectures</Text>
                            }
                            data={this.state.showLectAndUser}
                            renderItem={({item}) => (

                            <View style={styles.Box}>

                                <View style={{ width: 30, height: 220, backgroundColor: this.state.random[item.id % 4] }}></View>

                                <View style={styles.secondBox}>
                                    <Text style={styles.font}>{item.title}</Text>

                                    <Item style={styles.item}>
                                        <View style={styles.viewImage}>
                                            <Image source={require('../../../images/idea.png')} style={styles.image}/>
                                        </View>
                                        <View>
                                        <Item style={{ backgroundColor: '#fff', borderColor: 'transparent', paddingBottom: 10 }}>
                                            <Text style={styles.font}>Students </Text>
                                            <Text style={{marginLeft: 60}}>{item.joint_users.length}</Text>
                                        </Item>
                                        
                                        <Item style={{ backgroundColor: '#fff', borderColor: 'transparent', paddingBottom: 10 }}>
                                            <Icon type="FontAwesome" name="hourglass-start" />
                                            <Text> {item.start_duration}</Text>
                                        </Item>

                                        <Item style={{ backgroundColor: '#fff', borderColor: 'transparent' }}>
                                            <Icon type="FontAwesome" name="hourglass-end" />
                                            <Text> {item.end_duration}</Text>
                                        </Item>

                                        <Button style={styles.button} onPress={()=> this.props.navigation.navigate('LecturePayment', {...item})}>
                                            <Text style={styles.buttonTxt}>View Student's Track</Text>
                                        </Button>
                                        
                                        {/* <FlatList
                                        data={item.joint_users}
                                        renderItem={(student) => (

                                                <Button style={styles.button} onPress={()=> this.props.navigation.navigate('LecturePayment', 
                                                {...student.item, user_name: student.item.name, user_amount: student.item.pivot.amount, lecture_price: item.price})}>
                                                    <Text style={styles.buttonTxt}>View Student's Track</Text>
                                                </Button>

                                            
                                        )}
                                        keyExtractor = { (item, index) => index.toString() }
                                        /> */}

                                        </View>
                                    </Item>
                                </View>

                            </View>
                        )}
                        keyExtractor = { (item, index) => index.toString() }
                        />
                    )
                }
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
        height: 220, 
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 30
    },
    firstBox:{
        width: 30, 
        height: 220, 
        backgroundColor: Color.firstColor, 
    },
    secondBox:{
        padding: 20
    },
    item:{
        backgroundColor: '#fff',
        borderColor: 'transparent'
    },
    font:{
        fontFamily: "Open Sans",
        fontSize: 21,
        color:'#000'
    },
    viewImage:{
        paddingRight: 25
    },
    image:{
        width: 100, 
        height: 100,    
    },
    button:{
        backgroundColor: '#fef5e5',
        padding: 10,
        marginTop: 13,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonTxt:{
        color: '#000',
        fontSize: 16,
    },

});