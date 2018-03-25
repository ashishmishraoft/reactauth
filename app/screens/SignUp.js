import React,{Component} from "react";
import { View, Keyboard, AsyncStorage } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props){
    super(props)
    this.state={
      email: '', 
      password:'', 
      firstname:'', 
      lastname:''
    };

    // need to bind `this` to access props in handler
    /*this.onButtonPress = this.onButtonPress.bind(this);*/
  }

  onButtonPress() {
    const {email, password, firstname, lastname} = this.state;
    var headers = {
      'Content-Type': 'application/json',
    };

    var postData = {
      email: email,
      password: password,
      firstName: firstname,
      lastName: lastname
    };
    axios.post('http://192.168.42.127:3000/signup',postData,headers)
    .then((response) => 
    {
      /*console.log(response);
      console.log(response.headers['x-auth']); */
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
    .catch((error) => 
    {
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
      </View>
    );
  }
}


