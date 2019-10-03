// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import TopTemplate from './TopTemplate';
import TotalBalanceScreen from './TotalBalance';
import EarningBalanceScreen from './EarningBalance'

export default class CardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: true,
            earnings: false,
            backgroundColorTotal: 'green',
            backgroundColorEarning: '#DDDDDD',
            cardTotalPrincipal: this.props.navigation.state.params.tarjeta_gan
        };
        console.log(this.props.navigation.state.params.tarjeta_gan);
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Tarjeta'
    };

    changeToTotal = () => {
        this.setState({ 'total': true});
        this.setState({ 'earnings': false});
        this.setState({ backgroundColorTotal: 'green' });
        this.setState({ backgroundColorEarning: '#DDDDDD' });
    };

    changeToEarnings = () => {
        this.setState({ 'total': false});
        this.setState({ 'earnings': true});
        this.setState({ backgroundColorEarning: 'green' });
        this.setState({ backgroundColorTotal: '#DDDDDD' });
    };

    fnTotalOrEarnings () {
        if( this.state.total ){
            return(
                <TotalBalanceScreen/>
            );
        }else{
            return(
                <EarningBalanceScreen/>
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    <View style={{
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        padding: 5
                    }}>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20 }}>${this.state.cardTotalPrincipal} MXN</Text>
                            <Text style={{ fontSize: 15 }}>Puedes retirar ${this.state.cardTotalPrincipal} MXN</Text>
                            <Text style={{ fontSize: 15 }}>este próximo lunes</Text>
                        </View>

                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: 50
                    }}>
                        <TouchableHighlight
                            style={[styles.button, {backgroundColor: this.state.backgroundColorTotal}]}
                            onPress={this.changeToTotal}>
                            <Text>Total</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={[styles.button, {backgroundColor: this.state.backgroundColorEarning}]}
                            onPress={this.changeToEarnings}>
                            <Text>Ganancias</Text>
                        </TouchableHighlight>
                    </View>
                    { this.fnTotalOrEarnings() }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        padding: 12,
        borderWidth: 1
    }
});