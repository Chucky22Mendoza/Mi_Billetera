// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

export default class ReferPassangerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
        };
    }

    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    render() {
        return (
            <View>
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt',  marginLeft: 30, marginHorizontal: 5 }}>Código promocional</Text>
                    ) : null
                }
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.code}>
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', marginLeft: 30 }}>1d2d35f</Text>
                            ) : null
                        }
                        <TouchableOpacity
                            style={styles.buttonCopy}
                            onPress={this.test}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', color: '#fff' }}>Copiar</Text>
                                ) : null
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Bd', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Instrucciones</Text>
                    ) : null
                }
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Comparte tu código durante tus viajes, invita a pasajeros a ingresar tu código</Text>
                    ) : null
                }
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Invita pasajeros a que descarguen YiMi</Text>
                    ) : null
                }
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Obten $xx por cada usuario que refieras</Text>
                    ) : null
                }
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
    code: {
        height: 100,
        width: 300,
        borderWidth: 2,
        marginVertical: 30,
        marginTop: 5,
        marginBottom: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginHorizontal: 10
    },
    buttonCopy: {
        alignItems: 'center',
        backgroundColor: '#00FF',
        padding: 10,
        marginRight: 30
    }
});
