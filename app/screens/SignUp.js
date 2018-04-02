import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Keyboard,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';
import { SERVER_URL } from "../config";
import axios from 'axios';

export default class SignUp extends React.Component {

  static navigationOptions = {
    title: 'Sign Up',
  };
  constructor(props){
    super(props)
    this.state={
      email: '', 
      password:'', 
      firstname:'', 
      lastname:'',
      error:''
    };

    // need to bind `this` to access props in handler
    /*this.onButtonPress = this.onButtonPress.bind(this);*/
  }


  onButtonPress() {
    const {email, password, firstname, lastname} = this.state;

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
    else if(firstname=="")
    {
    this.setState({error:'Please enter firstname'})
    }
    else if(lastname=="")
    {
    this.setState({error:'Please enter lastname'})
    }
    else
    {
      var headers = {
        'Content-Type': 'application/json',
      };

      var postData = {
        email: email,
        password: password,
        firstName: firstname,
        lastName: lastname
      };

      axios.post(SERVER_URL+'signup',postData,headers).then((response) => 
      {
        /*console.log(response);
        console.log(response.headers['x-auth']); */
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
      .catch((error) => 
      {
          this.setState({error:'Authentication Failed.'});
      }); 
      Keyboard.dismiss();
    }
  } 

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView style={{ paddingVertical: 20,flex: 1,
    alignItems: 'center',
    justifyContent: 'center' }}>
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
            placeholder="Password" 
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
          <FormLabel>First Name</FormLabel>
          <FormInput 
            placeholder="First Name" 
            value={this.state.firstname}
            onChangeText={firstname => this.setState({firstname})}
          />
          <FormLabel>Last Name</FormLabel>
          <FormInput 
            placeholder="Last Name" 
            value={this.state.lastname}
            onChangeText={lastname => this.setState({lastname})}
          />
          <Text style={{margin:10,color:'red'}}>{this.state.error}</Text>
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN Up"
            onPress={this.onButtonPress.bind(this)}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Sign In"
            onPress={() => navigate("SignIn")}
          />
        </Card>
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    );
  }
}


