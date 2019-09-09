// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Picker } from 'react-native';

export default class ReferDriversScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: ''
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    render() {
        return (
            <View>

                <View style={{flexDirection: 'row', marginLeft: 30, marginVertical: 10}}>
                    <Text style={{marginTop: 15, fontSize: 16}}>Ciudad</Text>
                    <View style={{borderWidth: 1.2, borderRadius: 5, marginLeft: 20 }}>
                        <Picker
                            selectedValue={this.state.city}
                            style={{ height: 50, width: 150}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ city: itemValue })
                            }>
                            <Picker.Item label="Colima" value="Colima" />
                            <Picker.Item label="Jalisco" value="Jalisco" />
                        </Picker>
                    </View>
                </View>

                <Text style={{
                    fontSize: 15,
                    marginHorizontal: 30,
                    marginVertical: 5
                }}>
                    Refiere a tu amigo entre DD/MM/AAAA y DD/MM/AAAA
                </Text>
                <Text style={{
                    fontSize: 15,
                    marginHorizontal: 30,
                    marginVertical: 5
                }}>
                    Asegura que tu amigo seleccione Colima al registrarse
                </Text>
                <TouchableHighlight
                    style={styles.buttonLink}
                    onPress={this.test}>
                    <Text>Obtener enlace</Text>
                </TouchableHighlight>

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
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginHorizontal: 30,
        marginTop: 100
    }
});