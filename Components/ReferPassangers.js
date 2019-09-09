// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class ReferPassangerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    render() {
        return (
            <View>
                <Text style={{marginLeft: 30, marginHorizontal: 5}}>Código promocional</Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.code}>
                        <Text style={{marginLeft: 30}}>1d2d35f</Text>
                        <TouchableHighlight
                            style={styles.buttonCopy}
                            onPress={this.test}>
                            <Text style={{
                                color:'#fff'
                            }}>Copiar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginHorizontal: 30,
                    marginVertical: 5
                }}>
                    Instrucciones
                </Text>
                <Text style={{
                    fontSize: 15,
                    marginHorizontal: 30,
                    marginVertical: 5
                }}>
                    Comparte tu código durante tus viajes, invita a pasajeros a ingresar tu código
                </Text>
                <Text style={{
                    fontSize: 15,
                    marginHorizontal: 30,
                    marginVertical: 5
                }}>
                    Invita pasajeros a que descarguen MiGo
                </Text>
                <Text style={{
                    fontSize: 15,
                    marginHorizontal: 30,
                    marginVertical: 5
                }}>
                    Obten $xx por cada usuario que refieras
                </Text>
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
