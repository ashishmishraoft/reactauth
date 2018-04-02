import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Keyboard,
  Alert,
  Text,
  KeyboardAvoidingView
} from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import axios from 'axios';
import { SERVER_URL } from "../config";
export default class SignIn extends React.Component {

  static navigationOptions = {
    title: 'Sign In',
  };

  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      error:''
    };
  }

  onButtonPress() {
    const {email, password} = this.state;

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(email==""){
      //alert("Please enter Email address");
      this.setState({error:'Please enter email address'})
      
    }
    else if(reg.test(email) === false)
    {
      this.setState({error:'Email is not correct'})
      return false;
    }
    else if(password=="")
    {
    this.setState({error:'Please enter password'})
    }
    else
    {
      var headers = {
        'Content-Type': 'application/json',
      };

      var postData = {
        email: email,
        password: password
      };
      axios.post(SERVER_URL+'login',postData,headers).then((response) => {
        if (response.headers['x-auth']) 
        { 
          AsyncStorage.setItem('userToken', response.headers['x-auth']);
          this.props.navigation.navigate("App");
        }
        else
        {
          Alert.alert('Something went wrong');
        } 
      })
      .catch((error) => {
          this.setState({error:'Authentication Failed.'});
      });
      Keyboard.dismiss();
    }

  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput 
            placeholder="Email address..." 
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <FormLabel>Password</FormLabel> 
          <FormInput 
            secureTextEntry 
            placeholder="Password..." 
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
          <Text style={{margin:10,color:'red'}}>{this.state.error}</Text>
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN IN"
            onPress={this.onButtonPress.bind(this)}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign Up"
            onPress={() => navigate("SignUp")}
          />
        </Card>
      </KeyboardAvoidingView>
    );
  }
}


