import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Icon, H3, Form, Item, Button, Label, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Input} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import _ from 'lodash'

export default class LecturePayment extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: this.props.navigation.state.params.title,
            lecture: this.props.navigation.state.params.joint_users,
            searchLectures: this.props.navigation.state.params.joint_users,
            price: this.props.navigation.state.params.price,
            student: "",
            random:['#d93232', '#636c8f', '#6c856c', '#fbaf5d'],            
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         isLoading: true
    //     })
    //     return AsyncStorage.getItem('token').then(userToken => {
    //         return axios.get(Server.url + 'api/getusers?token='+userToken)
    //         .then(response => {
    //             this.setState({
    //                 isLoading: false,
    //                 showLectAndUser: response.data
    //             })
    //         }).catch(error => {
    //             Toast.show({
    //                 text: 'Error reachig server',
    //                 buttonText: "Ok",
    //                 type: "danger"
    //             })
    //         })
    //     })
    // alert(JSON.stringify(this.state.lecture))
    
    // }

    async Data(){
        let data = [];
        data = this.state.lecture;

        if(this.state.student !== ""){
            data = await _.filter(data, lecture => lecture.name.toLowerCase().indexOf(this.state.student.toLowerCase()) > -1);
        }
      
      this.setState({
          searchLectures: data
      })
      
    }
    
    render() {
        return (
            <AppTemplate back navigation={this.props.navigation} title = {this.state.title}>  
                <View style={styles.content}>

                <View style={styles.Box}>
                    <Item style={{height: 70, padding: 15, paddingBottom:0, backgroundColor: '#fff', borderColor: 'transparent' }}>
                        <Icon type="FontAwesome" name='user' />
                        <Label style={styles.font}>Student Name </Label>
                        <Input
                                onChangeText={(student) => this.setState({student})}
                                placeholder="Name..."
                                placeholderTextColor="#ccc5c5"
                        />
                    </Item>

                    <Button style={styles.button} onPress={ () => this.Data() }>
                        <Text style={styles.buttonTxt}>Search</Text>
                    </Button>

                </View>

                <FlatList
                    data={this.state.searchLectures}
                    renderItem={({item}) => (

                    <View style={styles.Box1}>  
                        <Card style={{borderWidth: 0}} transparent={true}>
                        
                            <CardItem style={{}}>
                                <Left>
                                <Thumbnail source={require('../../../images/Background.png')} />
                                <Text style={{paddingLeft: 10, fontSize: 19, fontFamily: "Roboto",}}>{item.name}</Text>
                                </Left>
                                <Right style={styles.allStarsComment}>
                                    <View style={{ width: 10, height: 80, backgroundColor: this.state.random[item.id % 4], 
                                    borderRadius: 5}}></View>
                                </Right> 
                            </CardItem>
                            <ListItem style={styles.list}>
                                <Body>
                                <H3 style={styles.font}>Paid</H3>
                                </Body>
                                <Right>
                                    <Label style={styles.font}>{item.pivot.amount} KWD</Label>
                                </Right>
                            </ListItem>
                            <ListItem style={styles.list}>
                                <Body>
                                <H3 style={styles.font}>Need to be paid</H3>
                                </Body>
                                 <Right>
                                    {
                                        ((this.state.price - item.pivot.amount) == 0 ) ? 
                                        (
                                            <Label style={styles.font}>None</Label>
                                        ):
                                        (
                                            <Label style={styles.font}>{this.state.price - item.pivot.amount} KWD</Label>
                                        )
                                    }
                                </Right>
                            </ListItem>
                        </Card>
                    </View>
                )}
                keyExtractor = { (item, index) => index.toString() }
                />
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
        height: 150, 
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 30
    },
    Box1: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5, 
        paddingTop: 0,
        marginBottom: 30
    },
    firstBox:{
        width: 10, 
        height: 80, 
        backgroundColor: Color.fourthColor, 
        borderRadius: 5
    },
    button:{
        backgroundColor: '#fef5e5',
        paddingTop: 0,
        paddingBottom: 0,
        padding: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonTxt:{
        color: '#000',
        fontSize: 20,
    },
    font:{
        fontFamily: "Roboto"
    },
    list:{
        paddingRight: 60,  
        backgroundColor: '#fff',
        borderColor: 'transparent'
    }
   

});