import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon } from 'native-base'
import { white } from 'ansi-colors';
import {setUser} from "../../src/reducers";
import {connect} from "react-redux"

class drawerContentComponentsTeacher extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })
    
    logout(){
        return AsyncStorage.removeItem('token').then(()=>{
            this.props.navigation.navigate('Auth');
        });
    }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{flex: 1, width: 280, justifyContent: 'center', backgroundColor: '#c0bfb4'}} >
                    <Image source={require('../images/background.jpg')} 
                        style={{width: 45, height: 45, borderRadius: 30, position: 'absolute', right: 20 }} />
                    <Text style={styles.headerText}>{this.props.user.name}</Text>
                    <Text style={styles.headerText}>Teacher</Text>
                </View>
            </View>
            <View style={styles.screenContainer}>
                <TouchableOpacity style={styles.screenStyle} onPress={this.navigateToScreen('Teacher')}>
                    <Image source={require('../images/home.png')} style={{width: 25, height: 25, marginRight: 20}} />
                    <Text>Home</Text>
                    <Icon name = 'chevron-right' type = 'Feather' style={{position: 'absolute', right: 0}} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.screenStyle} onPress={this.navigateToScreen('Wallet')}>
                    <Image source={require('../images/wallet.png')} style={{width: 25, height: 25, marginRight: 20}} />
                    <Text>Wallet</Text>
                    <Icon name = 'chevron-right' type = 'Feather' style={{position: 'absolute', right: 0}} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.screenStyle} onPress={this.navigateToScreen('Payments')}>
                    <Image source={require('../images/payment.png')} style={{width: 25, height: 25, marginRight: 20}} />
                    <Text>Payments</Text>
                    <Icon name = 'chevron-right' type = 'Feather' style={{position: 'absolute', right: 0}} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.screenStyle} onPress={() => this.logout()}>
                    <Image source={require('../images/logout.png')} style={{width: 25, height: 25, marginRight: 20}} />
                    <Text>Logout</Text>
                    <Icon name = 'chevron-right' type = 'Feather' style={{position: 'absolute', right: 0}} />
                </TouchableOpacity>
                
            </View>
        </View>
    
    )
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        height: '100%',
        backgroundColor: '#f3f3f3',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#38363e',
        textAlign: 'center'
    },
    screenContainer: {
        padding: 20,
    },
    screenStyle: {
        height: 70,
        width: 230,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },

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
)(drawerContentComponentsTeacher);