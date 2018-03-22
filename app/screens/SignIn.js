import React,{Component} from "react";
import { View, Keyboard } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
import axios from 'axios';

export default class SignedIn extends Component {
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
    console.log(postData);
    axios.post('http://192.168.42.89:3000/users',postData,headers)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
        this.setState({error:'Authentication Failed.'});
    });
    Keyboard.dismiss();

    this.props.navigation.navigate("SignedIn");
  } 

  render() {
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
        </Card>
      </View>
    );
  }
}


