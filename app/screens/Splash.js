import React from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from "react-native";
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import TimerMixin from 'react-timer-mixin';

export default class Splash extends React.Component {
	constructor() {
    	super();
    	this._bootstrapAsync();
  	}

	render(){
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.container}>
				<View style={styles.logo}>
					<Image style={{width: 125, height: 125}} source={require('.././images/gaaon.png')} />
				</View>
			</View>
		)
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
	    const userToken = await AsyncStorage.getItem('userToken');

	    TimerMixin.setTimeout(
	      () => { 
	      	// This will switch to the App screen or Auth screen and this loading
	    	// screen will be unmounted and thrown away.
	    	this.props.navigation.navigate(userToken ? 'App' : 'Auth');
	      },
	      5000
	    );
	 };
}


const styles ={
	container:{
		flex: 1,
		backgroundColor: '#ffffff'
	},
	logo:{
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	}
}; 