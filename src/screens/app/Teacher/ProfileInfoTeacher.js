import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Container, Text, Button, Icon, Toast, Thumbnail, ListItem, Left, Body,Item, H3} from 'native-base';
import AppTemplate from "../appTemplate";
import Server from "../../../constants/config";
import {connect} from "react-redux";
import {setUser} from "../../../reducers";
import axios from "axios";
import Color from "../../../constants/colors";
import _ from "lodash";
import firebase from 'react-native-firebase';
import ImagePicker from "react-native-image-picker";

class ProfileInfoTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isLoading: true,
            // profile:this.props.navigation.state.params,
            // profileData: [],
            img: this.props.user.img
        };
    }

    changeImg(){
        let options = {
            title: "Avatar",
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    img: response.uri
                });
                firebase.storage()
                .ref('/UserImage/'+'_' + Math.random().toString(36).substr(2, 9))
                .putFile(this.state.img)
                .then(snapshot => {
                    firebase.storage().ref('/UserImage').getDownloadURL().then(url => {
                        AsyncStorage.getItem('token').then(userToken => {
                            axios.post(Server.url+'api/user/img?token='+userToken, 
                            { img: url }
                            ).then((response) => {
                                Toast.show({
                                    text: "successfully upload",
                                    buttonText: "OK",
                                    type: "success"
                                })
                                this.props.setUser(response.data);
                            }).catch((err) => {
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "Unknown error has occurred",
                                    buttonText: "OK",
                                    type: "danger"
                                })
                            })
                        });
                    })
                }).catch(error => {
                    Toast.show({
                        text: "Unknown error has occurred",
                        buttonText: "OK",
                        type: "danger"
                    })
                })
            }
        });
    }

    // componentDidMount(){
    //     AsyncStorage.getItem('token').then(userToken => {
    //         return axios.get(Server.url+'api/auth/profile/'+this.state.profile.user_id+'?token='+userToken).then(response => {
    //             this.setState({
    //                 profileData: response.data,
    //             });
    //         }).catch(error => {
    //             Toast.show({
    //                 text: 'Error reaching the server.',
    //                 type: "danger",
    //                 buttonText: 'Okay'
    //             });
    //         })
    //     }).then(() => {
    //         this.setState({
    //             isLoading: false
    //         });
    //     });
    // }

    createRating(rate){
        let i;
        let stars= [];
        for(i =0; i< rate; i++ ){
            stars.push(<Icon key={i} active style={styles.star} type="MaterialCommunityIcons" name="star" />);
        }
        for(i; i<5; i++){
            stars.push(<Icon key={i} active style={styles.star2} type="MaterialCommunityIcons" name="star" />);
        }
        return stars;
    }

    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title="Profile info">
                        <View style={{ backgroundColor: "#f5f5f5", padding: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 120}}>
                                <Image source={require('../../../images/bg.jpg')} style={styles.image}/>

                            <View style={{flex: 1, backgroundColor: "white", paddingTop: 120}}>
                                <View style={styles.trainer}>
                                    <Text style={styles.trainerH3}>{this.props.user.name} {this.props.user.middleName} {this.props.user.lastName}</Text>

                                    <Text note style={styles.trainerH4}>Teacher</Text>

                                </View>

                                <Item style={styles.item2}>
                                    <Icon type="FontAwesome" name="transgender" />
                                    <Text style={styles.lectureTxt}>Gender</Text>
                                    <View style={{ position: 'absolute',left: 260,fontFamily: "Roboto",}}>
                                        {
                                            (this.props.user.gender == 1) ? (
                                                <Text style={{color: '#b7b3b3', }}>
                                                    Male
                                                </Text>
                                            ):(
                                                <Text style={{color: '#b7b3b3', }}>
                                                    Female
                                                </Text>
                                            )
                                        }
                                    </View>
                                </Item>

                                
                                <Item style={styles.item2}>
                                    <Icon type="FontAwesome" name="navicon" />
                                    <Text style={styles.lectureTxt}>Lectures</Text>
                                    <View style={{ position: 'absolute',left: 275,fontFamily: "Roboto",}}>
                                        <Text style={{color: '#b7b3b3', }}> {this.props.user.lecture.length} </Text>
                                    </View>
                                </Item>

                            </View>
                        </View>

            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    item2:{
        height: 70, 
        padding: 10
    },
    trainer:{
        alignSelf: 'center'
    },
    trainerH3:{
        alignSelf: 'center',
        fontSize: 20
    },
    trainerH4:{
        alignSelf: 'center',
        fontSize: 17
    },
    image:{
        height: 200,
        width: 200,
        borderRadius: 100,
        position: 'absolute',
        top: 20,
        zIndex: 1,
        alignSelf: 'center'
    },
    content:{
        paddingTop: 10
    },

    contentUniversty:{
        flexDirection: 'row',
        padding: 10
    },
    title:{
        color: '#fff',
        backgroundColor: '#9da1a4',
        padding: 10,
        borderRadius: 6
    },
    titleName:{
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#272727',
        padding: 12,
        borderRadius: 6,
        fontSize: 16,
        color: '#272727'
    },
    titleNameMajor:{
        color: '#fff',
        backgroundColor: '#6483f7',
        padding: 10,
        marginLeft: 10,
        borderRadius: 6,
        fontSize: 16,
        color: '#272727'
    },
    titleCertify:{
        color: '#fff',
        backgroundColor: '#9da1a4',
        borderRadius: 6,
        padding: 10,
        marginLeft: 15
    },
    imageCertify:{
        height: 40,
        width: 40,
        marginLeft: 10,
    },
    contentReview:{
        padding: 10
    },
    reviewComment:{
        flexDirection: 'row',
        paddingTop: 10,
    },
    imageComment:{
        width: 30,
        height: 30,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#e5e5e5',
    },
    viewContentStarComment:{
        flexDirection: 'row',
        position: 'absolute',
        right: 25,
        bottom: 5
    },
    viewContentStar:{
        flexDirection: 'row',
    },
    star:{
        color: '#b8d533',
        fontSize: 17
    },
    star2:{
        color: '#d7d7d7',
        fontSize: 17
    },
    commentName:{
        paddingLeft: 10,
        paddingTop: 5
    },
    commentText:{
        paddingTop: 5
    },

});

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileInfoTeacher);