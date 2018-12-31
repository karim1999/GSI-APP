import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Item, Right, Left, Icon} from 'native-base';
import Color from '../constants/colors';

export default class SameItems extends Component {
    render() {
        return (
            <View style={styles.content}>
                <View style={styles.Box}>

                    <Item style={styles.item}>
                        <View style={styles.viewImage}>
                            <Image source={require('../images/idea.png')} style={styles.image}/>
                        </View>
                        <View>
                            <Text style={styles.txt}>prof. Tim</Text>
                            <Text style={styles.txt}>programming</Text>
                            <Text style={styles.txt}>Date: 20/11/2018</Text>
                            <Text style={styles.txt}>Due date: 20/11/2018</Text>
                            <Text style={styles.txt}>Time: 11:00 To 13:00</Text>
                        </View>
                    </Item>

                    <Item style={styles.item}>
                        <View style={styles.viewImage}>
                            <Image source={require('../images/idea.png')} style={styles.image}/>
                        </View>
                        <View>
                            <Text style={styles.txt}>prof. Tim</Text>
                            <Text style={styles.txt}>programming</Text>
                            <Text style={styles.txt}>Date: 20/11/2018</Text>
                            <Text style={styles.txt}>Due date: 20/11/2018</Text>
                            <Text style={styles.txt}>Time: 11:00 To 13:00</Text>
                        </View>
                    </Item>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content:{
        backgroundColor: Color.background,
        padding:7,
    },
    Box: {
        flex:1,  
        backgroundColor: '#fff',
        padding: 30,
        paddingTop: 5,
        paddingBottom: 5
    },
    item:{
        padding: 10,
    },
    viewImage:{
        paddingRight: 50
    },
    image:{
        width:80, 
        height: 80, 
        borderRadius: 10        
    },
    txt:{
        fontFamily: "Roboto",
    }

});