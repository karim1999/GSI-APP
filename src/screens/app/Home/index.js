import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import {H1, H3, Icon,Toast} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import Server from "../../../constants/config";
import axios from "axios";

export default class MyHomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            showLectures: [],
        };
      }

    componentDidMount(){
            return axios.get(Server.url + 'api/lectures')
            .then(response => {
                this.setState({
                    showLectures: response.data,
                });
            }).catch(error => {
                Toast.show({
                    text: 'Error reaching the server.',
                    type: "danger",
                    buttonText: 'Okay'
                });
            })
    }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation}>
            <FlatList
                data={this.state.showLectures}
                renderItem={({item}) => (
                <TouchableOpacity style={styles.Box} onPress={()=>this.props.navigation.navigate('Lectures', {...item})}>

                    <View style={styles.firstBox}></View>

                    <View style={styles.secondBox}>
                        <H1 style={styles.font}>{item.title}</H1>
                        <H1 style={styles.date}>08</H1>                        
                    </View>

                    <View style={styles.thirdBox}>
                        <H3 style={{paddingBottom: 10, fontFamily: "Roboto",}}>Math Lecture</H3>
                        <H3 style={styles.font}>Phyiscs Lecture</H3>
                    </View>

                </TouchableOpacity>
                    )}
                    keyExtractor = { (item, index) => index.toString() }
                />

                <View style={styles.Box}>
                
                    <View style={styles.firstBox}></View>

                    <View style={styles.secondBox}>
                        <H1 style={styles.font}>SAT</H1>
                        <H1 style={styles.date}>08</H1>                        
                    </View>

                    <View style={styles.thirdBox}>
                        <H3 style={{paddingBottom: 10, fontFamily: "Roboto",}}>Math Lecture</H3>
                        <H3 style={styles.font}>Phyiscs Lecture</H3>
                    </View>

                </View>

            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    Box: {
        flex:1, 
        height: 170, 
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom: 30
    },
    firstBox:{
        width: 30, 
        height: 170, 
        backgroundColor: Color.firstColor, 
        borderTopLeftRadius:5, 
        borderBottomLeftRadius:5
    },
    secondBox:{
        width: 100, 
        height: 170, 
        backgroundColor: Color.background,
        padding: 25,
        justifyContent: 'center'
    },
    thirdBox:{
        padding: 20
    },
    date:{
        marginLeft: 7,
        fontFamily: "Roboto",
    },
    font:{
        fontFamily: "Roboto",
    }

});