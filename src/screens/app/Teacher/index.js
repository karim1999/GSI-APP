import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
import { Icon, Item, H3, Toast } from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";
import axios from "axios";
import Server from "../../../constants/config";
import moment from 'moment'

class Teacher extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLectures: [],
            isLoading: false
        }
    }

    render() {
        return (
            <AppTemplate fab navigation={this.props.navigation} title="Home">
            
                <Item style={styles.itemRobot}>
                    <View style={styles.viewImageRobot}>
                        <Image source={require('../../../images/cute-smiling-robot.png')} style={styles.imageRobot}/>
                    </View>
                    <View>
                        <H3 style={styles.txtTitle}>Hello, {this.props.user.name}</H3>
                        <H3 style={styles.txtTitle}>Welcome back!</H3>
                    </View>
                </Item>
            {
                (this.state.isLoading)? (
                    <View>
                        <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                    </View>
                ): (
                    <View style={styles.Box}>
                    <H3 style={styles.title}>Previous Lectures :</H3>
                    <FlatList
                        ListEmptyComponent={
                            <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Your profile is empty start adding lectures</Text>
                        }
                        data={this.props.user.lecture}
                        renderItem={({item}) => (
                        
                            <Item style={styles.item} onPress={()=>this.props.navigation.navigate('Lectures', {...item})}>
                                <View style={styles.viewImage}>
                                    <Image source={{uri: item.img}} style={styles.image}/>
                                </View>
                                <View>
                                    <Text style={styles.txt}>Title: {item.title}</Text>
                                    <Text style={styles.txt}>Date: {item.start_date}</Text>
                                    <Text style={styles.txt}>Time: {item.start_time}</Text>
                                </View>
                            </Item>
                    )}
                    keyExtractor = { (item, index) => index.toString() }
                    />
                    </View>                    
                )
            }

            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    Box: {
        flex:1,  
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 30,
        paddingTop: 0,
    },
    BoxComment: {
        flex:1,  
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10, 
        paddingTop: 20,
    },
    itemRobot:{
        padding: 10,
        backgroundColor: '#fff', 
        borderColor: 'transparent' 
    },
    item:{
        paddingHorizontal: 5,
        paddingVertical: 15
    },
    title:{
        fontFamily: "Open Sans",
        paddingVertical:10
    },
    viewImageRobot:{
        paddingRight: 15
    },
    viewImage:{
        paddingRight: 50
    },
    imageRobot:{
        width:140, 
        height: 140,         
    },
    image:{
        width:80, 
        height: 80, 
        borderRadius: 10        
    },
    txt:{
        fontFamily: "Open Sans",
    },
    txtTitle:{
        fontFamily: "Open Sans",
        padding: 10
    }

});

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teacher);