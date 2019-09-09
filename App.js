import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  createAppContainer,
  StackActions,
  NavigationActions,
  SafeAreaView
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import WalletScreen from './Components/My_Wallet';
import BalanceScreen from './Components/Balance'
import EarningScreen from './Components/Earnings';
import TravelScreen from './Components/Travels';
import ReferScreen from './Components/Refer';

const MainStack = createStackNavigator({
  Wallet : { screen: WalletScreen },
  Balance : { screen: BalanceScreen },
  Earning : { screen: EarningScreen },
  Travel : { screen: TravelScreen },
  Refer : { screen: ReferScreen },
},{
  initialRouteName: "Wallet",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  }
});

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



