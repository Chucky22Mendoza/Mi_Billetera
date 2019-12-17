// In App.js in a new project

import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import * as Font from 'expo-font';

/**
 *
 *
 * @export
 * @class EarningBalanceScreen
 * @extends {React.Component}
 */
export default class EarningBalanceScreen extends React.Component {
    /**
     *Creates an instance of EarningBalanceScreen.
     * @param {*} props
     * @memberof EarningBalanceScreen
     */
    constructor(props) {
        super(props);
        //Variables globales utilizadas en la vista
        this.state = {
            id_chofer: this.props.id_chofer,  //Obtener el id_chofer enviado por la vista anterior
            obj_aux_final: [],  //Objeto que contiene todas las varibles de la petición al WS
            obj_items: [],  //Objeto que contiene los componentes dinámicos de la vista
            validateWS: false,  //Obtener si el WS se ejecuta correctamente
            objTotalEarnings: [],  //Objeto que contiene las variables individuales de la petición al WS
            fontLoaded: false,
            encrypt: false
        };
    }

    /**
     *
     *
     * @memberof EarningBalanceScreen
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
     * @memberof EarningBalanceScreen
     *
     * Método que se ejecuta después de renderizar la vista; el cual carga las fuentes requeridas
     *
     */
    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof EarningBalanceScreen
     *
     * Método que ejecuta las peticiones de datos al WS antes de renderizar la vista
     *
     */
    async componentWillMount(){
        this.principal_body(); //Llamada al método principal que contiene el tratamiento de datos y componentes dinámicos
    }

    /**
     *
     *
     * @memberof EarningBalanceScreen
     *
     * Método que contiene el tratamiento de datos y componentes dinámicos, al igual que las peticiones al WS
     *
     */
    async principal_body(){
        //Try-catch para manejar error de conexión
        try{
            //Variable que contiene los datos de respuesta del WS
            const res = await axios.post('http://35.203.42.33:3001/billetera/interfaz_80/tarjeta', {
                id_chofer: this.state.id_chofer
            }); //Se requiere enviar las variables requeridas por el WS en formato JSON

            //Comprobar que la respuesta del WS es correcta
            if(res.status == 200){
                const obj = res.data.datos;  //Obtener el objeto de todos los datos desde el WS
                const encrypt = res.data.encrypt;
                //Actualizar las variables globales con las respuestas
                this.setState({
                    objTotalEarnings: obj,
                    validateWS: true,
                    encrypt: encrypt
                });
                //Llamar el método que da tratamiento a los datos y obtiene los componentes dinámicos
                this.objToTotalEarnings();
            }else{ //Error en el WS
                alert("Servicio no disponible, intente más tarde", "Error");
                this.setState({
                    validateWS: false
                });
            }
        }catch(error){  //Obtención del error
            //Error de conexión
            if(error.message == 'Network Error'){
                alert("Verifique su conexión e intente nuevamente", "Error");
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }
            console.log(error);
            this.setState({
                validateWS: false
            });
        }
    }

    /**
     *
     *
     * @memberof EarningBalanceScreen
     *
     * Método para obtener los componentes dinámicos y el tratamiento de los datos
     *
     */
    objToTotalEarnings = () => {
        const earnings = this.state.objTotalEarnings;  //Inicializar objeto con el objeto de los datos obtenidos del WS
        const obj_aux = [];  //Objeto que contendrá todos los valores del WS

        if(earnings.length > 0){
            //Recorrido de las variables del objeto
            earnings.forEach(earning => {
                //En caso de estar habilitada la encriptación se tiene que realizar su desencriptación y su asignación correspondiente
                if (this.state.encrypt) {
                    earning.out_fecha = aes256.decrypt(key, earning.out_fecha);
                    earning.out_id_servicio = aes256.decrypt(key, earning.out_id_servicio);
                    earning.out_ganancia = aes256.decrypt(key, earning.out_ganancia);
                    earning.out_hora = aes256.decrypt(key, earning.out_hora);
                }

                //Ordenar por fecha los objetos que contienen los datos dinámicos
                if (!obj_aux.includes(earning.out_fecha)) {
                    obj_aux.push(earning.out_fecha);
                }
                //Ya reescrito el objeto actual se agrega al objeto que se utilizará dinámicamente
                obj_aux.push(earning);
            });
        }

        //Actualización de la variable global del objeto
        this.setState({
            obj_aux_final: obj_aux
        });
        //Método de los componentes dinámicos
        this.componentBody();
    }

    /**
     *
     *
     * @memberof EarningBalanceScreen
     *
     * Método para agregar los componentes dinámicos
     *
     */
    componentBody = () =>{
        const obj = this.state.obj_aux_final;  //Variables obtenidas
        let obj_items_aux = [];  //Objeto auxiliar para agregar los componentes

        //Comprobar que existen datos
        if(obj.length != 0){
            let obj_actual = obj;
            //Reasignación de variables
            this.setState({
                obj_aux_final: obj_actual
            });
            //obtener la última posición del objeto
            let last_index_obj = obj_actual.length;

            //Recorrido del objeto, por cada valor en el objeto se genera un componente, dependiendo del tipo/nombre
            obj_actual.forEach((object, index) => {
                obj_items_aux.push(<Divider key={"divider_inicio_" + index} style={styles.row}></Divider>);
                if (object.hasOwnProperty('out_fecha')) {

                    if(object.out_ganancia.indexOf('-') != -1){
                        object.out_ganancia = object.out_ganancia.replace('-', '');
                        object.out_ganancia = '- $' + object.out_ganancia + ' MXN';
                    }else{
                        object.out_ganancia = '+ $' + object.out_ganancia + ' MXN';
                    }
                    obj_items_aux.push(
                        <View key={"view_principal_" + index}>
                            <View key={"view_1_" + index} style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_hora_" + index} style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingLeft: 5 }}>{object.out_hora}</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_total_" + index} style={{ fontFamily: 'Aller_Bd', fontSize: 15, paddingLeft: 5, marginTop: 10 }}>{object.out_ganancia}</Text>
                                    ) : null
                                }
                            </View>
                            <View key={"view_2_" + index} style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_servicio_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>{object.out_id_servicio}</Text>
                                    ) : null
                                }
                            </View>
                        </View>
                        );
                //Al ser un valor individual se requiere de otro componente
                }else{
                    obj_items_aux.push(
                        <View key={"view_fecha_" + index}
                        style={{
                            height: 25,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#D4D4D4'
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text key={"text_fecha_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>{object}</Text>
                                ) : null
                            }
                        </View>
                    );
                }
                //En la última posición se agrega un divisor
                if((index + 1) == last_index_obj){
                    obj_items_aux.push(<Divider key={"divider_final_" + index} style={styles.row}></Divider>);
                }
            });

            //Actualizar variable global de los componentes
            this.setState({
                obj_items: obj_items_aux
            });

        }
    }

    /**
     *
     *
     * @memberof EarningBalanceScreen
     *
     * Método de espera de carga
     *
     */
    setInfoWS = () =>{
        return(<View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 200,
                    height: 200
                }}>
                    <Image
                        source= {require('./../resource/img/loading.gif')}
                        style= {styles.img}
                    />
                </View>);
    }

    /**
     *
     *
     * @returns
     * @memberof EarningBalanceScreen
     */
    render() {
        return (
            <View>
                {   //Insertar los componentes del obj_items global, en caso de no cargar, setInfoWS se mostrará
                    this.state.validateWS ?
                        this.state.obj_items
                        : this.setInfoWS()
                }
            </View>

        );
    }
}

//Estilos de diseño defenidos
const styles = StyleSheet.create({
    row: {
        height: 10,
        backgroundColor: "#f0f4f7"
    }
});