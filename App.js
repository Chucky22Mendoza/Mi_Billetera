import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import WalletScreen from './Components/My_Wallet';  //Vista de mi billetera
import CardScreen from './Components/Card'  //Vista de Tarjeta
import EarningScreen from './Components/Earnings';  //Vista de ganancias
import TravelScreen from './Components/Travels';  //Vista de ver viajes
import ReferScreen from './Components/Refer';  //Vista de referidos

//Conjunto principal que maneja la navegación de las vistas acorde a la librería react-navigation-stack
const MainStack = createStackNavigator({
  Wallet : { screen: WalletScreen },
  Card : { screen: CardScreen },
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

/**
 *
 *
 * @export
 * @class App
 * @extends {React.Component}
 *
 * Clase principal de la aplicación
 */
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}



