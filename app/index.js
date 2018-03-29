import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { StackNavigator, SwitchNavigator, TabNavigator } from 'react-navigation';

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Splash from "./screens/Splash";

const AppStack = TabNavigator({ Home: Home, Profile: Profile });
const AuthStack = StackNavigator({ SignIn: SignIn, SignUp: SignUp });

export default SwitchNavigator(
  {
    AuthLoading: Splash,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
); 