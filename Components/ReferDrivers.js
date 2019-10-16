// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';
import * as Font from 'expo-font';

export default class ReferDriversScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            fontLoaded: false,
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    render() {
        return (
            <View>

                <View style={{flexDirection: 'row', marginLeft: 30, marginVertical: 10}}>
                    {
                        this.state.fontLoaded ? (
                            <Text style={{ fontFamily: 'Aller_Lt', marginTop: 15, fontSize: 16 }}>Ciudad</Text>
                        ) : null
                    }
                    <View style={{borderWidth: 1.2, borderRadius: 5, marginLeft: 20 }}>
                        {
                            this.state.fontLoaded ? (
                                <Picker
                                    selectedValue={this.state.city}
                                    style={{ height: 50, width: 150, fontFamily: 'Aller_Lt', }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ city: itemValue })
                                    }>
                                    <Picker.Item label="Colima" value="Colima" />
                                    <Picker.Item label="Jalisco" value="Jalisco" />
                                </Picker>
                            ) : null
                        }
                    </View>
                </View>
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Refiere a tu amigo entre DD/MM/AAAA y DD/MM/AAAA</Text>
                    ) : null
                }
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Asegura que tu amigo seleccione Colima al registrarse</Text>
                    ) : null
                }
                <TouchableOpacity style={styles.buttonLink} onPress={this.test}>
                    {
                        this.state.fontLoaded ? (
                            <Text style={{ fontFamily: 'Aller_Lt' }}>Obtener enlace</Text>
                        ) : null
                    }
                </TouchableOpacity>

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
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginHorizontal: 10
    },
    buttonLink: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ec6a2c',
        padding: 10,
        marginHorizontal: 30,
        marginTop: 100
    }
});