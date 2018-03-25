import React,{Component} from "react";
import { View, AsyncStorage } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";
import axios from 'axios';

export default class Profile extends Component {
  constructor(props){
    super(props)
    SampleText : "",
    this.state={albums: []};
  }

  componentDidMount () { 
    this._updateList(); 
  } 

  async _updateList () { 
    const authkeys = await AsyncStorage.getItem('authkey');
    axios.get('http://192.168.42.127:3000/users/me',{ headers: { 'x-auth': authkeys } })
    .then((response) => 
    { 
      if (response) 
      {
        this.setState({albums: response.data});
        var String_1 = this.state.albums.firstName ;
        var String_2 = this.state.albums.lastName ;
        var String_3 = String_1.concat(" " , String_2);
        this.setState({SampleText : String_3});
      }
      else
      {
        alert('Something went wrong');
      } 
    })
    .catch((error) => 
    { alert('Something went wrong');
        /*this.setState({error:'Authentication Failed.'});*/
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
          <Text style={{ color: "white", fontSize: 18 }}>{this.state.albums.email}</Text>
        </View>
        <Button
          backgroundColor="#03A9F4"
          title="SIGN OUT"
        />
      </Card>
    </View>
    );
  };
}
