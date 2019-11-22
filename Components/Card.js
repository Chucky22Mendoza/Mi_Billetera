// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import TopTemplate from './TopTemplate';
import TotalBalanceScreen from './TotalBalance';
import EarningBalanceScreen from './EarningBalance';
import * as Font from 'expo-font';

/**
 *
 *
 * @export
 * @class CardScreen
 * @extends {React.Component}
 *
 * Vista que intercala entre las vistas de balance
 */
export default class CardScreen extends React.Component {
    constructor(props) {
        super(props);
        //Variables globales utilizadas en la vista
        this.state = {
            total: true,  //variable que maneja el click del botón del total del balance (Es el botón clickeado al entrar a la vista)
            earnings: false,  //variable que maneja el click del botón de ganancias del balance
            backgroundColorTotal: '#ec6a2c',   //Color del fondo del botón total
            backgroundColorEarning: '#DDDDDD',  //Color del fondo del botón ganancias
            id_chofer: this.props.navigation.state.params.id_chofer,  //Obtener el id_chofer enviado por la vista anterior
            cardTotalPrincipal: this.props.navigation.state.params.tarjeta_gan, //Obtener tarjeta_gan enviado por la vista anterior
            fontLoaded: false,  //Variable para comprobar las fuentes cargadas
        };
    }

    /**
     *
     *
     * @memberof CardScreen
     *
     * Método para comprobar el funcionamiento de botones/iconos
     *
     */
    test = () => {
        alert("This is a test", "Hola");
    };

    /**
     *
     *
     * @static
     * @memberof CardScreen
     *
     * Contenedor de librería: react-navigation-stack, nombre de la vista y sus funcionamiento dentro del proyecto
     *
     */
    static navigationOptions = {
        title: 'Tarjeta'
    };

    /**
     *
     *
     * @memberof CardScreen
     *
     * Método que se ejecuta después de renderizar la vista; el cual carga las fuentes requeridas
     *
     */
    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof CardScreen
     *
     * Método que controla el cambio de valores como de colores de total de ganancias (click en botón)
     *
     */
    changeToTotal = () => {
        this.setState({ 'total': true});
        this.setState({ 'earnings': false});
        this.setState({ backgroundColorTotal: '#ec6a2c' });
        this.setState({ backgroundColorEarning: '#DDDDDD' });
    };

    /**
     *
     *
     * @memberof CardScreen
     *
     * Método que controla el cambio de valores como de colores de ganancias (click en botón)
     *
     */
    changeToEarnings = () => {
        this.setState({ 'total': false});
        this.setState({ 'earnings': true});
        this.setState({ backgroundColorEarning: '#ec6a2c'});
        this.setState({ backgroundColorTotal: '#DDDDDD' });
    };

    /**
     *
     *
     * @returns
     * @memberof CardScreen
     *
     * Método que controla el renderizado de las vistas, dependiendo que botón ha sido clickeado
     *
     */
    fnTotalOrEarnings () {
        if( this.state.total ){  //Según el valor boolean global de total se hace el renderizado
            return(
                <TotalBalanceScreen id_chofer = { this.state.id_chofer }/>  //Renderizado de total enviando el id_chofer al componente
            );
        }else{
            return(
                <EarningBalanceScreen id_chofer = { this.state.id_chofer }/>  //Renderizado de ganancias enviando el id_chofer al componente
            );
        }
    }

    /**
     *
     *
     * @returns
     * @memberof CardScreen
     *
     * Componentes principales
     *
     */
    render() {
        return (
            <ScrollView>
                <View>
                    {
                        //Componente que contiene la parte superior de la vista
                    }
                    <TopTemplate></TopTemplate>
                    <View style={{
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        padding: 5
                    }}>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {
                                //Forma de cargar las fuentes
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 20 }}>${this.state.cardTotalPrincipal} MXN</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Puedes retirar ${this.state.cardTotalPrincipal} MXN</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>este próximo lunes</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: 50
                    }}>
                        {
                            //botón que hace la petición del componente TotalBalance
                        }
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: this.state.backgroundColorTotal}]}
                            onPress={this.changeToTotal}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt'}}>Comisiones</Text>
                                    ) : null
                                }
                        </TouchableOpacity>

                        {
                            //botón que hace la petición del componente EarningBalance
                        }
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: this.state.backgroundColorEarning}]}
                            onPress={this.changeToEarnings}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt' }}>Ganancias</Text>
                                    ) : null
                                }
                        </TouchableOpacity>
                    </View>

                    {
                        //Lugar en la vista que renderiza los componentes requeridos
                        this.fnTotalOrEarnings()
                    }
                </View>
            </ScrollView>
        );
    }
}

//Estilos de diseño defenidos
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        padding: 12,
        borderWidth: 1
    }
});