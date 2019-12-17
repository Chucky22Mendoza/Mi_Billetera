// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ReferDriverScreen from './ReferDrivers';
import ReferPassangerScreen from './ReferPassangers';
import TopTemplate from './TopTemplate';
import * as Font from 'expo-font';
import axios from 'axios';

/**
 *
 *
 * @export
 * @class ReferScreen
 * @extends {React.Component}
 */
export default class ReferScreen extends React.Component {
    /**
     *Creates an instance of ReferScreen.
     * @param {*} props
     * @memberof ReferScreen
     */
    constructor(props) {
        super(props);
        //Variables globales utilizadas en la vista
        this.state = {
            id_chofer: this.props.navigation.state.params.id_chofer,
            drivers: true,
            passengers: false,
            backgroundColorDrivers: '#ec6a2c',
            backgroundColorPassengers: '#DDDDDD',
            fontLoaded: false,
            out_id_promocion: 0,
            out_nombre_promocion: '',
            out_condiciones: '',
            out_frase_motivacional: '',
            out_fecha_inicio: '',
            out_fecha_termino: '',
            out_hora_inicio: '',
            out_hora_termino: '',
            out_ciudad: '',
            out_beneficio: ''
        };
    }

    /**
     *
     *
     * @memberof ReferScreen
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
     * @memberof ReferScreen
     */
    componentWillMount = () => {
        this.principal_body();
    }

    /**
     *
     *
     * @memberof ReferScreen
     */
    principal_body = async () => {
        try{
            const res = await axios.post('http://35.203.42.33:3001/usuarios/interfaz_77_78/obtener_promocion');
            if(res.status == 200){
                let out_id_promocion, out_nombre_promocion, out_condiciones, out_frase_motivacional, out_fecha_inicio, out_fecha_termino, out_hora_inicio, out_hora_termino, out_ciudad, out_beneficio;
                //Comprobar si la información ha sido encriptada

                if(res.data.encrypt){
                    //Desencriptación y asignación a variables de los datos
                    out_id_promocion = aes256.decrypt(res.data.datos[0].out_id_promocion);
                    out_nombre_promocion = aes256.decrypt(res.data.datos[0].out_nombre_promocion);
                    out_condiciones = aes256.decrypt(res.data.datos[0].out_condiciones);
                    out_frase_motivacional = aes256.decrypt(res.data.datos[0].out_frase_motivacional);
                    out_fecha_inicio = aes256.decrypt(res.data.datos[0].out_fecha_inicio);
                    out_fecha_termino = aes256.decrypt(res.data.datos[0].out_fecha_termino);
                    out_hora_inicio = aes256.decrypt(res.data.datos[0].out_hora_inicio);
                    out_hora_termino = aes256.decrypt(res.data.datos[0].out_hora_termino);
                    out_ciudad = aes256.decrypt(res.data.datos[0].out_ciudad);
                    out_beneficio = aes256.decrypt(res.data.datos[0].out_beneficio);
                }else{
                    out_id_promocion = res.data.datos[0].out_id_promocion;
                    out_nombre_promocion = res.data.datos[0].out_nombre_promocion;
                    out_condiciones = res.data.datos[0].out_condiciones;
                    out_frase_motivacional = res.data.datos[0].out_frase_motivacional;
                    out_fecha_inicio = res.data.datos[0].out_fecha_inicio;
                    out_fecha_termino = res.data.datos[0].out_fecha_termino;
                    out_hora_inicio = res.data.datos[0].out_hora_inicio;
                    out_hora_termino = res.data.datos[0].out_hora_termino;
                    out_ciudad = res.data.datos[0].out_ciudad;
                    out_beneficio = res.data.datos[0].out_beneficio;
                }

                //Actualización de las variables con los datos del WS ya tratados
                this.setState({
                    out_id_promocion: out_id_promocion,
                    out_nombre_promocion: out_nombre_promocion,
                    out_condiciones: out_condiciones,
                    out_frase_motivacional: out_frase_motivacional,
                    out_fecha_inicio: out_fecha_inicio,
                    out_fecha_termino: out_fecha_termino,
                    out_hora_inicio: out_hora_inicio,
                    out_hora_termino: out_hora_termino,
                    out_ciudad: out_ciudad,
                    out_beneficio: out_beneficio
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
     * @static
     * @memberof ReferScreen
     *
     * Contenedor de librería: react-navigation-stack, nombre de la vista y sus funcionamiento dentro del proyecto
     *
     */
    static navigationOptions = {
        title: 'Refiere'
    };

    /**
     *
     *
     * @memberof ReferScreen
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
     * @memberof ReferScreen
     *
     * Método que controla el cambio de valores como de colores de conductores (click en botón)
     *
     */
    changeToDrivers = () => {
        this.setState({'drivers': true});
        this.setState({'passengers': false});
        this.setState({ backgroundColorDrivers: '#ec6a2c' });
        this.setState({ backgroundColorPassengers: '#DDDDDD' });
    };

    /**
     *
     *
     * @memberof ReferScreen
     *
     * Método que controla el cambio de valores como de colores de pasajeros (click en botón)
     *
     */
    changeToPassangers = () => {
        this.setState({'passengers': true});
        this.setState({'drivers': false});
        this.setState({ backgroundColorPassengers: '#ec6a2c' });
        this.setState({ backgroundColorDrivers: '#DDDDDD' });
    };

    /**
     *
     *
     * @returns
     * @memberof ReferScreen
     *
     * Método que controla el renderizado de las vistas, dependiendo que botón ha sido clickeado
     *
     */
    fnDriversOrPassengers () {
        let fecha_inicio, fecha_termino, ciudad, nombre_promocion, frase_motivacional, condiciones, beneficio;
        if( this.state.drivers ){  //Según el valor boolean global de drivers se hace el renderizado
            if(this.state.out_fecha_inicio.length > 0 && this.state.out_fecha_termino.length > 0 && this.state.out_ciudad.length > 0){
                fecha_inicio = this.state.out_fecha_inicio;
                fecha_termino = this.state.out_fecha_termino;
                ciudad = this.state.out_ciudad;
                return(
                    <ReferDriverScreen fecha_inicio = { fecha_inicio } fecha_termino = { fecha_termino } ciudad = { ciudad } /> //Renderizado de conductores
                );
            }

        }else{
            if(this.state.out_nombre_promocion.length > 0 && this.state.out_frase_motivacional.length > 0 && this.state.out_condiciones.length > 0 && this.state.out_beneficio.length > 0){
                nombre_promocion = this.state.out_nombre_promocion;
                frase_motivacional = this.state.out_frase_motivacional;
                condiciones = this.state.out_condiciones;
                beneficio = this.state.out_beneficio;
                return(
                    <ReferPassangerScreen nombre_promocion = { nombre_promocion } frase_motivacional = { frase_motivacional } condiciones = { condiciones } beneficio = { beneficio }/>  //Renderizado de pasajeros
                );
            }
        }
    }

    /**
     *
     *
     * @returns
     * @memberof ReferScreen
     *
     * Componentes principales
     *
     */
    render() {
        return (
            <View>
                <TopTemplate></TopTemplate>
                <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20, paddingBottom: 5, }}>
                    {
                        //botón que hace la petición del componente ReferDrivers
                    }
                    <TouchableOpacity style={[styles.button, {backgroundColor: this.state.backgroundColorDrivers}]} onPress={this.changeToDrivers}>
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt' }}>Invita conductores</Text>
                            ) : null
                        }
                    </TouchableOpacity>

                    {
                        //botón que hace la petición del componente ReferPassangers
                    }
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
                    {
                        //Lugar en la vista que renderiza los componentes requeridos
                        this.fnDriversOrPassengers()
                    }
            </View>
        );
    }
}

//Estilos de diseño defenidos
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10
    }
});