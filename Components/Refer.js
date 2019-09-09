// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import ReferDriverScreen from './ReferDrivers';
import ReferPassangerScreen from './ReferPassangers';
import TopTemplate from './TopTemplate';

export default class ReferScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drivers: true,
            passengers: false,
            backgroundColorDrivers: 'green',
            backgroundColorPassengers: '#DDDDDD'
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Refiere'
    };

    changeToDrivers = () => {
        this.setState({'drivers': true});
        this.setState({'passengers': false});
        this.setState({ backgroundColorDrivers: 'green' });
        this.setState({ backgroundColorPassengers: '#DDDDDD' });
    };

    changeToPassangers = () => {
        this.setState({'passengers': true});
        this.setState({'drivers': false});
        this.setState({ backgroundColorPassengers: 'green' });
        this.setState({ backgroundColorDrivers: '#DDDDDD' });
    };

    fnDriversOrPassengers () {
        if( this.state.drivers ){
            return(
                <ReferDriverScreen/>
            );
        }else{
            return(
                <ReferPassangerScreen/>
            );
        }
    }

    render() {
        return (
            <View>
                <TopTemplate></TopTemplate>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 20,
                    paddingBottom: 5,
                }}>
                    <TouchableHighlight
                        style={[styles.button, {backgroundColor: this.state.backgroundColorDrivers}]}
                        onPress={this.changeToDrivers}>
                        <Text>Invita conductores</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={[styles.button, {backgroundColor: this.state.backgroundColorPassengers}]}
                        onPress={this.changeToPassangers}>
                        <Text>Invita pasajeros</Text>
                    </TouchableHighlight>
                </View>
                    { this.fnDriversOrPassengers() }
            </View>
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
    row: {
        height: 10,
        backgroundColor: "#f0f4f7"
    },
    button: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10
    },
    buttonLink: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginHorizontal: 30,
        marginTop: 100
    }
});