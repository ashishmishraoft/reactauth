import React,{Component} from "react";
import { View, Keyboard, AsyncStorage } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
import axios from 'axios';

export default class SignIn extends Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:''
    };

    // need to bind `this` to access props in handler
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    const {email, password} = this.state;
    var headers = {
      'Content-Type': 'application/json',
    };

    var postData = {
      email: email,
      password: password
    };
    axios.post('http://192.168.42.127:3000/login',postData,headers)
    .then((response) => {
      if (response.headers['x-auth']) 
      { 
        AsyncStorage.setItem('authkey', response.headers['x-auth']);
        this.props.navigation.navigate("SignedIn");
        onSignIn();
      }
      else
      {
        alert('Something went wrong');
      } 
    })
    .catch((error) => {
        this.setState({error:'Authentication Failed.'});
    });
    Keyboard.dismiss();
  } 

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{ paddingVertical: 20 }}>
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
      </View>
    );
  }
}


