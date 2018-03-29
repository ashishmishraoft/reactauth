import React,{Component} from "react";
import { View, AsyncStorage, Alert } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../config";
import axios from 'axios';

export default class Profile extends Component {
  constructor(props){
    super(props)
    SampleText : "",
    this.state={profiles: []};
  }

  componentDidMount () { 
    this._updateList(); 
  } 

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  async _updateList () { 
    const authkeys = await AsyncStorage.getItem('userToken');
    if (!authkeys) 
    {
      this.props.navigation.navigate('Auth');
    }
    axios.get(SERVER_URL+'users/me',{ headers: { 'x-auth': authkeys } }).then((response) => 
    { 
      if (response) 
      {
        this.setState({profiles: response.data});
        var String_1 = this.state.profiles.firstName ;
        var String_2 = this.state.profiles.lastName ;
        var String_3 = String_1.concat(" " , String_2);
        this.setState({SampleText : String_3});
      }
      else
      {
        Alert.alert('Something went wrong');
      } 
    })
    .catch((error) => 
    { 
      Alert.alert('Something went wrong');
    }); 
  }

  render() {

    const {navigate} = this.props.navigation;
    return (
    <View style={{ paddingVertical: 20 }}> 
      <Card title={this.state.SampleText}>
        <View
          style={{
            backgroundColor: "#bcbec1",
            alignItems: "center",
            justifyContent: "center",
            /*width: 80,
            height: 80,
            borderRadius: 40,*/
            padding: 10,
            alignSelf: "center",
            marginBottom: 20
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>{this.state.profiles.email}</Text>
        </View>
        <Button
        backgroundColor="#03A9F4"
          title="SIGN OUT"
          onPress={this._signOutAsync}
        />
      </Card>
    </View>
    );
  };
}
