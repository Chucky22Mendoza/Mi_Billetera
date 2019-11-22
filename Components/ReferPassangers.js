// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';

/**
 *
 *
 * @export
 * @class ReferPassangerScreen
 * @extends {React.Component}
 */
export default class ReferPassangerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            code_user: null,
            clipboardContent: null,
            nombre_promocion: this.props.nombre_promocion,  //Obtener fecha_inicio enviado por la vista anterior
            frase_motivacional: this.props.frase_motivacional,
            condiciones: this.props.condiciones,
            beneficio: this.props.beneficio,
        };
    }

    /**
     *
     *
     * @memberof ReferPassangerScreen
     */
    componentDidMount = async () => {
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof ReferPassangerScreen
     */
    componentWillMount = () => {
        this.principal_body();
    }

    /**
     *
     *
     * @memberof ReferPassangerScreen
     */
    principal_body = async () => {
        try{
            const res = await axios.get('http://34.95.33.177:3001/codigo_usuario');
            let code = res.data;
            this.setState({
                code_user: code
            });
        }catch(e){
            console.log(e);
            alert("Servicio no disponible, intente más tarde", "Error");
        }
    }

    writeToClipboard = async () => {
        await Clipboard.setString(this.state.code_user);
        alert('Copiado al portapapeles');
    };

    /**
     *
     *
     * @returns
     * @memberof ReferPassangerScreen
     */
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
                                <Text style={{ fontFamily: 'Aller_Lt', marginLeft: 30 }}>{this.state.code_user}</Text>
                            ) : null
                        }
                        <TouchableOpacity
                            style={styles.buttonCopy}
                            onPress={this.writeToClipboard}>
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
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>{this.state.frase_motivacional}</Text>
                    ) : null
                }
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Obten ${this.state.beneficio} mxn por cada usuario que refieras</Text>
                    ) : null
                }
            </View>
        );
    }
}

//Estilos de diseño defenidos
const styles = StyleSheet.create({
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
    buttonCopy: {
        alignItems: 'center',
        backgroundColor: '#00FF',
        padding: 10,
        marginRight: 30
    }
});
