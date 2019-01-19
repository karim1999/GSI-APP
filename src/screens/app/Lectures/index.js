import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, AsyncStorage, Alert, ActivityIndicator, Slider, Linking, TouchableHighlight, Modal } from 'react-native';
import { Icon, Form, Item, Picker, DatePicker, Button, Label, List, ListItem, Left, Body, 
    Right, Thumbnail, Card, CardItem, Toast, Textarea, H3, Input} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";
import moment from 'moment'
import _ from 'lodash'

class Lectures extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            chosenDate: new Date(),
            lecture: this.props.navigation.state.params ,
            commentShows: '',
            isLoading: false,
            isSetting: false,
            isApplying: false,
            editable: 1,
            isCommented: false,
            rate: 1,
            showComment: [],
            url: Server.url+'/privacy',
            modalVisible: false,
            id: '',
            comments: '',
            isEditComment: false,
            comment: ''

        };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }

    onRegisterPressed(){
        Alert.alert(
            "Are you sure?",
            "You want to pay now or later",
            [
                { text: "Now", onPress: () =>  this.props.navigation.navigate('WeebView', {...this.state.lecture}) },
                {text: "Later", onPress: () => {
                    
                    this.setState({
                        isLoading: true
                    });
                    return AsyncStorage.getItem('token').then(userToken => {
                        return axios.post(Server.url + 'api/jointLecture/'+this.state.lecture.id+'?token='+userToken)
                        .then(response => {
                            this.setState({
                                isLoading: false,
                            });
                            Toast.show({
                                text: "You joined lecture successfully.",
                                buttonText: "Ok",
                                type: "success"
                            })
                            this.props.setUser(response.data);
                        }).catch(error => {
                            Toast.show({
                                text: "Check your Internet connection.",
                                buttonText: "Ok",
                                type: "danger"
                            });                            
                        })
                    }).then(() => {
                        this.setState({
                            isLoading: false
                        });
                    });

                }}
                
            ]
        )
    }

    unJoin(){
        Alert.alert(
            "Are you sure?",
            "you want to un join lecture",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.post(Server.url + 'api/unjoint/'+this.state.lecture.id+'?token='+userToken)
                            .then(response => {
                                // alert(response.data);
                                this.props.setUser(response.data);
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "Un join lecture successfully",
                                    buttonText: "Ok",
                                    type: "success"
                                })
                            }).catch(error => {
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "Check your Internet connection.",
                                    buttonText: "Ok",
                                    type: "danger"
                                })
                            })
                        });
                    }},
            ],
            { cancelable: false }
        )
    }

    deleteLecture(){
        Alert.alert(
            "Are you sure?",
            "No one will be able to access this lecture after deleting",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                        this.setState({
                            isDeleting: true,
                        });
                        AsyncStorage.getItem('token').then(userToken => {
                            return axios.delete(Server.url+'api/deleteLecture/'+this.state.lecture.id+'?token='+userToken).then(response => {
                                // alert(response.data);
                                this.props.setUser(response.data);
                                this.props.navigation.navigate("Teacher");
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "The lecture was deleted successfully",
                                    buttonText: "Ok",
                                    type: "success"
                                })
                            }).catch(error => {
                                this.setState({
                                    isLoading: false,
                                });
                                Toast.show({
                                    text: "Unknown error has occurred",
                                    buttonText: "Ok",
                                    type: "danger"
                                })
                            })
                        });
                    }},
            ],
            { cancelable: false }
        )
    }

    componentDidMount(){
        formated_date = this.state.lecture.start_duration.replace('-','/').replace('-','/')
        date = new Date(formated_date);
       if( Math.abs(moment().diff(moment( date.getTime()), 'hours', true)) <= 5){
           this.setState({editable:0});
       }
    }

    applyLecture(id){
        Alert.alert(
            "Are you sure",
            "You want to apply this lecture?",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                {text: "Ok", onPress: () => {
                    this.setState({
                        isApplying: true,
                    });
                    AsyncStorage.getItem('token').then(userToken => {
                        return axios.post(Server.url + 'api/jointLecture/' + id + '?token=' + userToken)
                        .then(response => {
                            Toast.show({
                                text: 'Successfully applying',
                                type: "success",
                                buttonText: 'Okay'
                            });
                            this.setState({
                                isApplying: false,
                            })
                        }).catch(error => {
                            this.setState({
                                isApplying: false,
                            });
                            Toast.show({
                                text: "Error reaching the server.",
                                buttonText: "Ok",
                                type: "danger"
                            })
                        })
                    });
                    }},
            ],
            { cancelable: false }
        )

    }

    editComment(){

    }

    onPayPressed()
    {
        Alert.alert(
            "Are you sure",
            "You have to pay before attend and by paying you accept our privacy&policy?",
            [
                {text: "Cancel", onPress: () => console.log('Cancel Pressed')},
                { text: "pay", onPress: () =>  this.props.navigation.navigate('WeebView', {...this.state.lecture}) },
                {text: "privacy", onPress: () => Linking.openURL(this.state.url)},
            ],
            { cancelable: false }
        )

        
    }

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

    addComment(){
        if(this.state.comment == ""){

            Toast.show({
                text: 'comment cannot be empty.',
                type: "danger",
                buttonText: 'Okay'
            });

        }else{
            this.setState({
                isCommented:true
            });
            AsyncStorage.getItem('token').then(userToken => {
                return axios.post(Server.url+'api/comments/'+ this.state.lecture.id + '?token='+ userToken,
                {
                    rate: this.state.rate,
                    comment: this.state.comment
                }
                ).then(response => {
                    Toast.show({
                        text: 'Successfully commented.',
                        type: 'success',
                        buttonText: 'Okay'
                    });
                    this.componentDidMount();
                    this.setState({
                        isCommented: false,
                    });
                });

            })
        }
    }

    componentDidMount()
    {
        AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url+'api/showcomments/'+ this.state.lecture.id + '?token='+ userToken)
            .then(response => {
                this.setState({
                    showComment: response.data
                });
            });

        })        
    }

    setModalVisible(visible, id, comment) {
        this.setState({
            modalVisible: visible,
            comments: comment

        });
        // return axios.get(Server.url+'api/terms')
        // .then(response => {
        //     this.setState({
        //         isTerms: false,
        //         termsAndCond: response.data
        //     });
        // }).catch(error => {
        //     this.setState({
        //         isTerms: false,
        //     });
        //     Toast.show({
        //         text: "Error reaching the server.",
        //         buttonText: "Ok",
        //         type: "danger"
        //     })
        // })
      }
    
    render() {
        var timeStart = new Date("01/01/2007 " + this.state.lecture.start_duration).getHours()
        return (
            <AppTemplate title = {this.state.lecture.title} back navigation={this.props.navigation}>

                {
                    (this.props.user.type == 1) ? (
                        _.find(this.props.user.joint_lectures, lecture => lecture.id == this.state.lecture.id && 
                            lecture.pivot.amount == 0 && lecture.pivot.type == 1) ? (
                                    <View>
                                    <Button onPress={() => this.setState({isSetting: !this.state.isSetting})} style={{width: "100%", alignItems: "center", backgroundColor: '#d3d3ea'}}>
                                    <Text style={{flex: 1, color: '#000'}}> Settings </Text>
                                    <Icon type="FontAwesome" name={this.state.isSetting? "arrow-circle-o-up": "arrow-circle-o-down"} style={{color: Color.mainColor, fontSize: 25}}/>
                                    </Button>
                                    { 
                                        (this.state.isSetting) && (
                                            <List style={{backgroundColor: "#d3d3ea", right: 0}}>
                                                {
                                                    (this.state.editable == 1) ? (
                                                        <ListItem
                                                            onPress={() => this.unJoin()}
                                                        >
                                                            <Text style={{flex: 1, color: '#000'}}>Un join</Text>
                                                        </ListItem>
        
                                                    ):null
                                                    
                                                }
                                                
                                                <ListItem
                                                    onPress={() => this.props.navigation.navigate('WeebView', {...this.state.lecture})}
                                                >
                                                    <Text style={{flex: 1, color: '#000'}}>Pay</Text>
                                                </ListItem>
                                            </List>
                                        )
                                    }
                                    </View>  
                        ):(
                            (this.state.lecture.payment == 1)?(
                                
                                <Button
                                onPress={() => this.onPayPressed()}
                                style={{width: "100%", alignItems: "center", backgroundColor: '#d3d3ea'}}>
        
                                <Text style={{flex: 1, paddingLeft: 10}}> Join </Text>
                                {this.state.isApplying && (
                                    <ActivityIndicator size="small" color="#000000" />
                                )}
        
                                <Icon type="Entypo" name="circle-with-plus" style={{color: Color.mainColor, fontSize: 25}}/>
        
                                </Button>

                            ):(
                                <Button
                                onPress={()=> this.onRegisterPressed()}
                                style={{width: "100%", alignItems: "center", backgroundColor: '#d3d3ea'}}>
        
                                <Text style={{flex: 1, paddingLeft: 10}}> Join </Text>
                                {this.state.isApplying && (
                                    <ActivityIndicator size="small" color="#000000" />
                                )}
        
                                <Icon type="Entypo" name="circle-with-plus" style={{color: Color.mainColor, fontSize: 25}}/>
        
                                </Button>

                            )

                        )

                    ):(
                            <View>
                            <Button onPress={() => this.setState({isSetting: !this.state.isSetting})} style={{width: "100%", alignItems: "center", backgroundColor: '#d3d3ea'}}>
                            <Text style={{flex: 1, color: '#000'}}> Settings </Text>
                            <Icon type="FontAwesome" name={this.state.isSetting? "arrow-circle-o-up": "arrow-circle-o-down"} style={{color: Color.mainColor, fontSize: 25}}/>
                            </Button>
                            { 
                                (this.state.isSetting) && (
                                    <List style={{backgroundColor: "#d3d3ea", right: 0}}>
                                        {
                                            (this.state.editable == 1) ? (
                                                <ListItem
                                                    onPress={() => this.props.navigation.navigate("EditLecture", {...this.state.lecture})}
                                                >
                                                    <Text style={{flex: 1, color: '#000'}}>Edit Lecture</Text>
                                                </ListItem>

                                            ):null
                                            
                                        }
                                        
                                        <ListItem
                                            onPress={() => this.deleteLecture()}
                                        >
                                            <Text style={{flex: 1, color: '#000'}}>Delete Lecture</Text>
                                        </ListItem>
                                    </List>
                                )
                            }
                            </View>   
                    )
                }
                <View style={styles.content}>
                    <View style={styles.Box}>

                        <Item style={styles.item}>
                            <Image source={{uri: this.state.lecture.img}} style={styles.image}/>
                            <View style={styles.text}>
                            {/* <Button onPress={()=> this.onRegisterPressed()}>
                                <Text>register</Text>
                            </Button> */}
                                <Text style={styles.txt}>{this.state.lecture.user.name}</Text>
                                <Text style={styles.txt}>{this.state.lecture.title}</Text>
                            </View>
                            <View style={styles.allStars}>
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                                <Icon style={styles.star} type="MaterialCommunityIcons" name="star" />
                            </View>
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="money" />
                            <H3 style={styles.lectureTxt}>Cost</H3>
                            <Button transparent style={styles.price2}>
                                <Text style={styles.priceText}>{this.state.lecture.price}</Text>
                                <Text style={styles.priceIcon}>KWD</Text>
                            </Button>
                            
                        </Item>
                        <Item style={styles.item2}>
                            <Icon type="Entypo" name="wallet" />
                            <H3 style={styles.lectureTxt}>Payment</H3>
                            <View style={{position: 'absolute',left: 200,fontFamily: "Roboto",}}>
                            {
                                (this.state.lecture.payment == 1) ? (
                                    <Text>
                                        Before Attend
                                    </Text>

                                ):(
                                    <Text>
                                        After Attend
                                    </Text>
                                )
                            }
                            </View>
                            
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="Foundation" name="results" />
                            <H3 style={styles.lectureTxt}>Course Type</H3>
                            <View style={{position: 'absolute',left: 230,fontFamily: "Roboto",}}>
                            {
                                (this.state.lecture.type_course == 1) ? (
                                    <Text>
                                        College
                                    </Text>

                                ):(
                                    <Text>
                                        Genral
                                    </Text>
                                )
                            }
                            </View>
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="transgender" />
                            <H3 style={styles.lectureTxt}>Gender</H3>
                            {
                                (this.state.lecture.gender == 1) ? (
                                    <Text style={{position: 'absolute',left: 240,fontFamily: "Roboto",}}>
                                        Male
                                    </Text>

                                ):(this.state.lecture.gender == 2)?(
                                    <Text style={{position: 'absolute',left: 240,fontFamily: "Roboto",}}>
                                        Female
                                    </Text>
                                ):(
                                    <Text style={{position: 'absolute',left: 240,fontFamily: "Roboto",}}>
                                        Both
                                    </Text>
                                )
                            }
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="Entypo" name="calendar" />
                            <H3 style={styles.lectureTxt}>Date</H3>
                            <Text style={{position: 'absolute',left: 140,fontFamily: "Roboto",}}>
                            {this.state.lecture.start_date} To { this.state.lecture.end_date}
                            </Text>                            
                        </Item>

                        <Item style={styles.item2}>
                            <Icon type="Entypo" name="back-in-time" />
                            <H3 style={styles.lectureTxt}>Duration</H3>
                            <Text style={{position: 'absolute',left: 160,fontFamily: "Roboto",}}>
                            {this.state.lecture.start_time} To {this.state.lecture.end_time}
                            </Text>                            
                        </Item>

                        {/* <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="users" />
                            <H3 style={styles.lectureTxt}>Attendance</H3>
                            <Text style={{position: 'absolute',left: 200,fontFamily: "Roboto",}}>
                            {this.state.lecture.length}
                            </Text>
                        </Item> */}

                        <Item style={styles.item2}>
                            <Icon type="FontAwesome" name="check-square-o" />
                            <H3 style={styles.lectureTxt}>Allowed</H3>
                            <Text style={{position: 'absolute',left: 250,fontFamily: "Roboto",}}>
                            {this.state.lecture.allowed}
                            </Text>
                        </Item>

                    </View>

                <Text style={styles.commentTxt}>Comments</Text>

                <View style={styles.BoxComment}>  
                    <Card style={{borderWidth: 0}} transparent={true}>

                <FlatList
                ListEmptyComponent={
                            <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No comments for this lecture</Text>
                        }
                    data={_.reverse(this.state.showComment)}
                    renderItem={({item}) => (
                        <View>
                        <CardItem style={{}}>
                            <Left>
                            <Thumbnail source={{uri: item.user.img}} />
                            <Text style={{paddingLeft: 10, fontSize: 19, fontFamily: "Roboto",}}>{item.user.name}</Text>
                            </Left>
                            <Right style={styles.allStarsComment}>
                                {
                                    this.createRating(item.rate)
                                }
                                {
                                    // (this.props.user.id == item.user_id)?(
                                    //     <View>
                                    //     <TouchableHighlight onPress={() => { this.setModalVisible(true,item.id, item.comment); }}>
                                    //         <Icon type="FontAwesome" name ="edit" style={{color: '#000', paddingLeft:5}} />
                                    //     </TouchableHighlight>
                                    //     <Modal
                                    //     animationType="slide"
                                    //     transparent={false}
                                    //     visible={this.state.modalVisible}
                                    //     onRequestClose={() => {
                                    //         alert('Modal has been closed.');
                                    //     }}>
                                    //     <View style={{marginTop: 22,padding:10}}>
                                    //         <View>
                                    //         <TouchableHighlight
                                    //             onPress={() => {
                                    //             this.setModalVisible(!this.state.modalVisible);
                                    //             }}>
                                    //             <Icon style={{alignSelf:'flex-end',marginBottom:8,marginRight:15}} type="Ionicons" name='md-close' />
                                    //         </TouchableHighlight>
                                    //         <View>
                                    //         <Input
                                    //             onChangeText={(comments) => this.setState({comments})}
                                    //             placeholder="Write your comment"
                                    //             placeholderTextColor="#ccc5c5"
                                    //             style={{borderColor: '#000', borderWidth: 1, color: '#000', flex:1, height:50}}
                                    //         />
                                    //         <Text>{this.state.comments}</Text>
                                    //         <Button
                                    //             onPress={() => this.editComment()}
                                    //             style={{flexDirection: "row", backgroundColor: '#d3d3ea'}}
                                    //             block light
                                    //         >
                                    //             <Text>Edit comment</Text>
                                    //             {this.state.isEditComment && (
                                    //                 <ActivityIndicator size="small" color="#000" />
                                    //             )}
                                    //             <Icon type="FontAwesome" name="comment" style={{color: Color.mainColor, fontSize: 20}}/>
                                    //         </Button>
                                    //         </View>
                                            
                                    //         </View>
                                    //     </View>
                                    //     </Modal>
                                    //     </View>
                
                                    // ):null
                                }
                            </Right> 
                        </CardItem>
                        <CardItem style={{}}>
                            <Body>
                            <Text style={{fontFamily: "Roboto",}}>{item.comment}</Text>
                            </Body>
                        </CardItem>
                        </View>
                        )}
                        keyExtractor = { (item, index) => index.toString() }
                        />
                        {
                            (this.props.user.type == 1)? (
                                (_.find(this.props.user.joint_lectures, lecture => lecture.id == this.state.lecture.id))&&(
                                <View>
                                <CardItem>
                                    <Icon type="MaterialIcons" name='rate-review' />
                                    <Label>Rate</Label>
                                    <Slider
                                        value={Number(this.state.rate)}
                                        onValueChange={(rate) => this.setState({rate})}
                                        style={{flex: 1}} step={1} maximumValue={5} minimumValue={1}/>
                                        <Text>
                                        {Number(this.state.rate)}
                                        </Text>
                                </CardItem>
                                <CardItem style={{marginBottom: 10}}>
                                <Input
                                    onChangeText={(comment) => this.setState({comment})}
                                    placeholder="Write your comment"
                                    placeholderTextColor="#ccc5c5"
                                    value={this.state.description}
                                />
                            </CardItem>
                                <Button
                                    onPress={() => this.addComment()}
                                    style={{flexDirection: "row", backgroundColor: '#d3d3ea'}}
                                    block light
                                >
                                    <Text>Add comment</Text>
                                    {this.state.isCommented && (
                                        <ActivityIndicator size="small" color="#000" />
                                    )}
                                    <Icon type="FontAwesome" name="comment" style={{color: Color.mainColor, fontSize: 20}}/>
                                </Button>
                            </View>
                                )

                            ):null
                        }
                    </Card>
                </View>
                
            </View>

            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    content:{
        backgroundColor: Color.background,
        padding:7,
        paddingTop: 0
    },
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
        padding: 5, 
    },
    item:{
        height: 120,
    },
    item2:{
        height: 70, 
    },
    image:{
        width:80, 
        height: 80, 
        borderRadius: 10        
    },
    text:{
        paddingLeft: 60,
        paddingBottom: 25
    },
    txt:{
        fontFamily: "Roboto",
        fontSize: 18
    },
    star:{
        color: '#eeb829',
        fontSize: 22,
    },
    star2:{
        color: '#d7d7d7',
        fontSize: 22
    },
    allStars:{
        position: 'absolute',
        bottom: 6,
        right: 18,
        flexDirection: 'row'
    },
    allStarsComment:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    lectureTxt:{
        fontSize: 18,
        paddingLeft: 10,
        fontFamily: "Roboto",
    },
    price2:{
        position: 'absolute',
        left: 180,
        top: 15
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
        padding: 0.5
    },
    commentTxt:{
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingBottom: 15
    }

});

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lectures);
