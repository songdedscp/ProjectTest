import React from 'react';
import { Root } from 'native-base';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Login from './page/Login';
import Home from './page/Home'
import ListImage from './page/ListImage'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Home: {
      screen: Home,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    ListImage: {
      screen: ListImage,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: 'Login',
  },
);
const App = createAppContainer(AppNavigator);
export default () => {
  return (
    <Root>
      <App />
    </Root>
  );
};
