// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, Clipboard } from 'react-native';
import * as Font from 'expo-font';
import axios from 'axios';

/**
 *
 *
 * @export
 * @class ReferDriversScreen
 * @extends {React.Component}
 */
export default class ReferDriversScreen extends React.Component {
    /**
     *Creates an instance of ReferDriversScreen.
     * @param {*} props
     * @memberof ReferDriversScreen
     */
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            cities: [],
            fecha_inicio: this.props.fecha_inicio,  //Obtener fecha_inicio enviado por la vista anterior
            fecha_termino: this.props.fecha_termino,
            ciudad: this.props.ciudad,
            obj_items: [],
            fontLoaded: false,
            code_driver: null,
            clipboardContent: null,
            encrypt: false
        };
    }

    /**
     *
     *
     * @memberof ReferDriversScreen
     */
    componentDidMount = async () => {
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof ReferDriversScreen
     */
    componentWillMount = () => {
        this.principal_body();
        this.principal_body_2();
    }

    /**
     *
     *
     * @memberof ReferDriversScreen
     */
    principal_body = async () => {
        try{
            const res = await axios.get('http://35.203.57.92:3001/codigo_chofer');
            if(res.status == 200){
                let code = res.data;
                this.setState({
                    code_driver: code
                });
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }
        }catch(error){
            //Error de conexión
            if(error.message == 'Network Error'){
                alert("Verifique su conexión e intente nuevamente", "Error");
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }
            console.log(error);
        }
    }

    /**
     *
     *
     * @memberof ReferDriversScreen
     */
    principal_body_2 = async () => {
        try{
            const res = await axios.post('http://35.203.57.92:3001/usuarios/interfaz_77/ciudad');
            if(res.status == 200){
                let cities = res.data.datos;
                let encrypt = res.data.encrypt;
                this.setState({
                    cities: cities,
                    encrypt: encrypt
                });
                this.componentBody();
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }
        }catch(error){
            //Error de conexión
            if(error.message == 'Network Error'){
                alert("Verifique su conexión e intente nuevamente", "Error");
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }
            console.log(error);
        }
    }


    /**
     *
     *
     * @memberof ReferDriversScreen
     */
    componentBody = () => {
        let cities = this.state.cities;
        let obj_items_aux = [];
        cities.forEach((city, index) => {
            if(this.state.encrypt){
                city.id_ciudad = aes256.decrypt(key, city.id_ciudad);
                city.nombre_ciudad = aes256.decrypt(key, city.nombre_ciudad);
            }
            obj_items_aux.push(<Picker.Item key={"item_picker_" + index} label={city.nombre_ciudad} value={city.id_ciudad}/>);
        });

        this.setState({
            obj_items: obj_items_aux
        });
    }

    /**
     *
     *
     * @memberof ReferDriversScreen
     */
    writeToClipboard = async () => {
        await Clipboard.setString(this.state.code_driver);
        alert('Copiado al portapapeles');
    };

    /**
     *
     *
     * @returns
     * @memberof ReferDriversScreen
     */
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
                                    { this.state.obj_items }
                                </Picker>
                            ) : null
                        }
                    </View>
                </View>
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Refiere a tu amigo entre {this.state.fecha_inicio} y {this.state.fecha_termino}</Text>
                    ) : null
                }
                {
                    this.state.fontLoaded ? (
                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, marginHorizontal: 30, marginVertical: 5 }}>Asegura que tu amigo seleccione {this.state.ciudad} al registrarse</Text>
                    ) : null
                }
                <TouchableOpacity style={styles.buttonLink} onPress={this.writeToClipboard}>
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

//Estilos de diseño defenidos
const styles = StyleSheet.create({
    buttonLink: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ec6a2c',
        padding: 10,
        marginHorizontal: 30,
        marginTop: 100
    }
});