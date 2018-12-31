import React, { Component } from 'react';
import {StyleSheet, View, Image, FlatList, TouchableOpacity, AsyncStorage, ActivityIndicator,WebView, Platform } from 'react-native';
import {Button, Container, Content, Header, Left, Body, Icon, Title, Text, Toast} from 'native-base';
import AppTemplate from "../appTemplate";
import Color from "../../../constants/colors";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";
import axios from "axios/index";
import Server from "../../../constants/config";
import _ from "lodash";


class WeebView extends Component {
    constructor(props){
        super(props);
        this.state={
            visible: true,
            lectureAll: this.props.navigation.state.params,
            url:Server.url+'payment/buy?user_id=',
            user_id: this.props.user.id,
            amount: this.props.navigation.state.params.price,
            lectures_id: this.props.navigation.state.params.id
        }
    }

    showSpinner() {
        this.setState({ visible: true });
      }

    hideSpinner() {
        this.setState({ visible: false });
      }

    // componentDidMount(){
    //     AsyncStorage.getItem('token').then(userToken => {
    //         return axios.get(Server.url + 'payment/buy',{
    //             user_id: this.props.user.id,
    //             amount: this.state.lectureAll.price,
    //             url: Server.url+'payment/buy?user_id='+this.state.user_id+'&&?price='+this.state.price
    //         })
    //         .then(response => {
    //             Toast.show({
    //                 text: 'Successfully applying',
    //                 type: "success",
    //                 buttonText: 'Okay'
    //             });
    //             this.setState({
    //                 isApplying: false,
    //             })
    //         })
    //         this.setState({
    //             Token: userToken,
    //             isLoading: false,
    //         })
    //     })
    // }
    _onNavigationStateChange(data){
        var str = data.url
        if(str.includes("success")){
            Toast.show({
                text: "Successfullly buy.",
                buttonText: "Ok",
                type: "success"
            })
            this.props.navigation.navigate('LectureStudent', this.state.lectureAll);
        }else if(str.includes("error")){
            Toast.show({
                text: "Error buy.",
                buttonText: "Ok",
                type: "danger"
            });
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
                  <Container style={{flex:1}}>
                    <Header hasTabs noShadow
                        style={{ backgroundColor: Color.mainColor }}
                        androidStatusBarColor={Color.mainColor}>
                        <Left>
                            <Button transparent onPress={ () =>  this.props.navigation.goBack() } >
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>Buy</Title>
                        </Body>
                    </Header>

                           {this.state.visible && (
                              <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                              )}
                          <WebView
                             source={{uri: this.state.url + this.state.user_id + '&amount='+this.state.amount+ '&lectures_id'+ this.state.lectures_id}}
                             onLoadStart={() => (this.showSpinner())}
                             onLoad={() => this.hideSpinner()}
                             onNavigationStateChange={data => this._onNavigationStateChange(data)}
                           />
                  </Container>
        );
    }
}
const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeebView);
