import React, { Component } from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title,Card, Content, Toast, Fab} from 'native-base';
import Color from '../../constants/colors';
import {RefreshControl, StyleSheet, AsyncStorage, TouchableOpacity, ActivityIndicator,Text,Platform, Image} from "react-native";
import {connect} from "react-redux";
import { setUser } from "../../reducers";
import axios from "axios/index";
import Server from "../../constants/config";

class AppTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }
    }

    _onRefresh(){
        this.setState({
            refreshing: true
        });
        if(this.props.refreshing){
            this.props.onLoad().then(() => {
                this.setState({
                    refreshing: false
                });
            })
        }else{
            AsyncStorage.getItem('token').then(userToken => {
                return axios.post(Server.url+'api/auth/me?token='+userToken).then(response => {
                    this.props.setUser(response.data.user);
                }).catch(error => {
                    Toast.show({
                        text: 'Error reaching the server.',
                        type: "danger",
                        buttonText: 'Okay'
                    });
                })
            }).then(() => {
                this.setState({
                    refreshing: false
                });
            });
        }
    }

    render() {
        return (
            <Container>
                <Header hasTabs noShadow
                        style={{ backgroundColor: Color.mainColor }}
                        androidStatusBarColor={Color.mainColor}>
                    <Left>
                        {
                            (this.props.back) ? (
                                <Button transparent onPress={ () =>  this.props.navigation.goBack() } >
                                    <Icon name='arrow-back' />
                                </Button>

                            ):(
                                <Button transparent onPress={ () =>  this.props.navigation.openDrawer() } >
                                    <Icon name='menu' />
                                </Button>
                            )
                        }
                    </Left>

                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body>

                    <Right>

                    <TouchableOpacity>
                        {
                            (this.props.user.type == 1) ?(
                                <Icon style={styles.butt} name='md-search' onPress={ () => this.props.navigation.navigate('Search')}/>                                
                            ):null
                        }
                    </TouchableOpacity>

                    </Right>
                </Header>
                {/* <Content style={styles.content}> */}
                <Content 
                    refreshing={this.state.refreshing}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this._onRefresh()}
                        />
                    }>
                    { this.props.children }
                </Content>
                {
                    this.props.fab && (
                        <Fab
                            active={true}
                            style={{ backgroundColor: Color.mainColor }}
                            position="bottomRight"
                            onPress={() => this.props.navigation.navigate('AddLecture')}>
    
                            <Icon size={25} type="FontAwesome" name="edit" style={{color:'#FFFFFF'}}  />
                        </Fab>
                    )
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    butt:{
        padding: 7,
        color: '#fff',
        fontSize: 23
    },
    content:{
        backgroundColor: Color.background,
        padding:7,
    }

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
)(AppTemplate);
