import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {H1, H3, ListItem, Label, Input, Button, Icon, Item, Radio} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";

export default class Students extends Component {
    render() {
        return (
            <AppTemplate navigation={this.props.navigation}>
                <View style={styles.Box0}>
                    <Item style={{height: 70}}>
                        <Icon type="Foundation" name="results" />
                        <Label style={styles.font}>Course Name </Label>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Input
                                    placeholder="Phyics..."
                                    placeholderTextColor="#ccc5c5"
                                    style={{width: 100}}
                            />
                        </View>
                    </Item>

                    <Item style={{height: 70}}>
                        <Icon type="Entypo" name="wallet" />
                        <Label style={styles.font}>Payment </Label>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.font}> 1 Milestone </Text>
                                <Radio style={{paddingRight: 20, paddingLeft: 8}}/>

                                <Text style={styles.font}> 2 Milestone </Text>
                                <Radio style={{paddingLeft: 8}}/>  
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.font}> 3 Milestone </Text>
                                <Radio style={{paddingRight: 20, paddingLeft: 8}}/>

                                <Text style={styles.font}> 4 Milestone </Text>
                                <Radio style={{paddingLeft: 8}}/>  
                            </View>
                        </View>
                    </Item>

                    <Item style={{height: 70}}>
                        <Icon type="FontAwesome" name="dollar" />
                        <Label style={styles.font}>Cost </Label>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Label style={styles.font}> Before Discount </Label>
                                <Text style={styles.font}> 200 KWD </Text> 
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Label style={styles.font}> After Discount </Label>
                                <Text style={styles.font}> 150 KWD </Text>
                            </View>
                        </View>
                    </Item>

                    <Button style={styles.button} >
                        <Text style={styles.buttonTxt}>Register</Text>
                    </Button>

                </View>

                <View style={styles.Box}>

                    <View style={styles.firstBox}></View>

                    <View style={styles.secondBox}>
                        <Item style={{height: 45}}>
                            <Icon type="Foundation" name="results" />
                            <Label style={styles.font}>Course Name </Label>
                            <Text style={{ marginLeft: 100}}>Chemistry</Text>
                        </Item>

                        <Item style={{height: 45}}>
                            <Icon type="Entypo" name="wallet" />
                            <Label style={styles.font}>Payment </Label>
                            <Text style={{ marginLeft: 120}}> 1 Milestone </Text>
                        </Item>

                        <Item style={{height: 45}}>
                            <Icon type="FontAwesome" name="dollar" />
                            <Label style={styles.font}>Cost </Label>
                            <Text style={{ marginLeft: 170}}> 200 KWD </Text>
                        </Item>
                    </View>

                </View>

            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    Box0: {
        flex:1,  
        backgroundColor: '#fff',
        marginBottom: 30,
        padding: 10,
        paddingTop: 0
    },
    Box: {
        flex:1,  
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 30
    },
    firstBox:{
        width: 30, 
        height: 150, 
        backgroundColor: Color.firstColor, 
        borderTopLeftRadius:5, 
        borderBottomLeftRadius:5
    },
    secondBox:{
        paddingTop: 0,
        padding: 15
    },
    button:{
        backgroundColor: '#fef5e5',
        paddingTop: 10,
        paddingBottom: 10,
        padding: 35,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonTxt:{
        color: '#000',
        fontSize: 20,
    },
    price:{
        marginLeft: 115
    },
    price2:{
        marginLeft: 140
    },
    right:{
        position: 'absolute',
        left: 200,
        fontFamily: "Roboto",
    },
    priceText:{
        backgroundColor:'#fff',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 0.5,
        borderColor: '#000',
    },
    priceIcon:{
        backgroundColor:'#eeb829',
        color: '#fff',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    font:{
        fontFamily: "Roboto",
    },
    image:{
        width:20, 
        height: 20,
        marginRight: 5         
    },
    imageRight:{
        width: 35, 
        height: 35,
        position: 'absolute',
        left: 200,
    },
    rightCash:{
        position: 'absolute',
        left: 240,
        fontFamily: "Roboto",
    }

});