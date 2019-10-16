// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReferDriverScreen from './ReferDrivers';
import ReferPassangerScreen from './ReferPassangers';
import TopTemplate from './TopTemplate';
import * as Font from 'expo-font';

export default class ReferScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_chofer: this.props.navigation.state.params.id_chofer,
            drivers: true,
            passengers: false,
            backgroundColorDrivers: '#ec6a2c',
            backgroundColorPassengers: '#DDDDDD',
            fontLoaded: false,
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Refiere'
    };

    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    changeToDrivers = () => {
        this.setState({'drivers': true});
        this.setState({'passengers': false});
        this.setState({ backgroundColorDrivers: '#ec6a2c' });
        this.setState({ backgroundColorPassengers: '#DDDDDD' });
    };

    changeToPassangers = () => {
        this.setState({'passengers': true});
        this.setState({'drivers': false});
        this.setState({ backgroundColorPassengers: '#ec6a2c' });
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20, paddingBottom: 5, }}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: this.state.backgroundColorDrivers}]} onPress={this.changeToDrivers}>
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt' }}>Invita conductores</Text>
                            ) : null
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: this.state.backgroundColorPassengers}]}
                        onPress={this.changeToPassangers}>
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt' }}>Invita pasajeros</Text>
                            ) : null
                        }
                    </TouchableOpacity>
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