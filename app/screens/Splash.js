import React,{Component} from 'react';
import { StyleSheet, View, Text, Image } from "react-native";
import { onSignIn } from "../auth";

export default class Splash extends Component {
	componentDidMount () {
     	//SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
        SplashScreen.close({
            animationType: SplashScreen.animationType.scale,
            duration: 850,
            delay: 500,
        })
    }

	render(){
		const {navigate} = this.props.navigation;
		return(
			<View style={styles.container}>
				<View style={styles.logo}>
					<Image style={{width: 200, height: 200}} source={require('.././images/icon.png')} />
				</View>
			</View>
		)
	}
}


const styles ={
	container:{
		flex: 1,
		backgroundColor: '#4f6d7a'
	},
	logo:{
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	}
}; 