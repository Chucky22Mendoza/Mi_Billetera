// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import TopTemplate from './TopTemplate';
import axios from 'axios';
import * as Font from 'expo-font';
import Constants from 'expo-constants';

//Variables para encriptar los datos recibidos
//const aes256 = require('aes256');
//var key = "92AE31A79FEEB2A3";

/**
 *
 *
 * @export
 * @class WalletScreen
 * @extends {React.Component}
 */
export default class WalletScreen extends React.Component {
    /**
     *Creates an instance of WalletScreen.
     * @param {*} props
     * @memberof WalletScreen
     */
    constructor(props) {
        super(props);
        //Variables globales utilizadas en la vista
        this.state = {
            id_chofer: 1,  //ID del chofer, cambiar según el inicio de sesión del usuario
            tarjeta_gan: 0,  //Parámetro del WS
            efectivo_gan: 0,  //Parámetro del WS
            externo_gan: 0,  //Parámetro del WS
            total_gan: 0,  //Parámetro del WS
            total_gan_dia: 0,  //Parámetro del WS
            cuota_plat_r: 0,  //Parámetro del WS
            cuota_socio_r: 0,  //Parámetro del WS
            rango_fechas: '00/00 - 00/00',  //Parámetro del WS
            cant_servicios: 0,  //Parámetro del WS
            ganancia_final: 0,  //Parámetro del WS
            out_adeudo_plataforma_efec: 0,  //Parámetro del WS
            out_adeudo_socio_efec: 0,  //Parámetro del WS
            fecha_actual: '',  //Calculado al iniciar la aplicación
            tiempo_segundos: 0,  //Calculador de tiempo conectado del usuario (Se requiere un método específico)
            tiempo_minutos: 55,  //Calculador de tiempo conectado del usuario (Se requiere un método específico)
            tiempo_horas: 10,  //Calculador de tiempo conectado del usuario (Se requiere un método específico)
            connListItems: [],  //Objeto contenedor de los componentes agregados dinámicamente
            fontLoaded: false,  //Variable para comprobar las fuentes cargadas
            switchValue: true,  //Valor del switch para comprobar la conexión del usuario, se calcula en conjunto con el tiempo conectado
            refreshing: true,  //Refrescar la vista
            validate_promotion: false, //valor que valida si hay un promoción en la fecha actual
        };
    }

    /**
     *
     *
     * @memberof WalletScreen
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
     * @static
     * @memberof WalletScreen
     *
     * Contenedor de librería: react-navigation-stack, nombre de la vista y sus funcionamiento dentro del proyecto
     */
    static navigationOptions = {
        title: 'Mi Billetera'
    };


    /**
     *
     *
     * @memberof WalletScreen
     *
     * Método que ejecuta las peticiones de datos al WS antes de renderizar la vista
     *
     */
    async componentWillMount(){
        this.principal_body(); //Llamada al método principal que contiene el tratamiento de datos y componentes dinámicos
        this.principal_body_2(); //Llamada al método principal para comprobar si existen promociones actuales
    }

    /**
     *
     *
     * @memberof WalletScreen
     *
     * Método que se ejecuta después de renderizar la vista; el cual carga las fuentes requeridas
     */
    async componentDidMount() {
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof WalletScreen
     *
     * Método que contiene el tratamiento de datos y componentes dinámicos, al igual que las peticiones al WS
     *
     */
    principal_body = async () => {
        /******* Calcular fecha actual formateada ******/

        let date, day, month, year, fecha;
        date = new Date();  //Generar objeto de una nueva fecha

        day = date.getDate();  //Obtener el día actual, formato 'DD'
        month = date.getMonth() + 1;  //Mes actual, se suma uno por su inicializción como objeto en 0, formata 'MM'
        year = date.getFullYear();  //Obtener el año actual en formato 'YYYY'

        if(day.toString().length == 1 ){
            day = '0' + day;  //Tratamiento del formato del día
        }

        if(month.toString().length == 1 ){
            month = '0' + month;  //tratamiento del formato del mes
        }

        fecha = day + "/" + month + "/" + year;  //Formato completo de la fecha actual: 'DD/mm/YYYY'
        this.setState({
            fecha_actual: fecha  //Actualizar en su variable
        });

        /******* Calcular fecha actual formateada ******/

        //Try-catch para manejar error de conexión
        try{
            //Variable que contiene los datos de respuesta del WS
            const res = await axios.post('http://35.203.42.33:3001/billetera/interfaz_75/billetera', {
                id_chofer: this.state.id_chofer
            }); //Se requiere enviar las variables requeridas por el WS en formato JSON

            //console.log(res.status);

            //Comprobar que la respuesta del WS es correcta
            if(res.status == 200){
                //Inicialización de variables necesarias para la reconlacción de los datos
                let rango_fechas, tarjeta_gan, efectivo_gan, externo_gan, total_gan, total_gan_dia, cuota_plat_r, cuota_socio_r, cant_servicios;

                //Comprobar si la información ha sido encriptada
                if (res.data.datos[0].encrypt) {
                    //Desencriptación y asignación a variables de los datos
                    tarjeta_gan = aes256.decrypt(res.data.datos[0].tarjeta_gan);
                    efectivo_gan = aes256.decrypt(res.data.datos[0].efectivo_gan);
                    externo_gan = aes256.decrypt(res.data.datos[0].externo_gan);
                    total_gan = aes256.decrypt(res.data.datos[0].total_gan);
                    total_gan_dia = aes256.decrypt(res.data.datos[0].total_gan_dia);
                    cuota_plat_r = aes256.decrypt(res.data.datos[0].cuota_plat_r);
                    cuota_socio_r = aes256.decrypt(res.data.datos[0].cuota_socio_r);
                    rango_fechas = aes256.decrypt(key, res.data.datos[0].rango_fechas);
                    cant_servicios = aes256.decrypt(res.data.datos[0].cant_servicios);
                    ganancia_final = aes256.decrypt(res.data.datos[0].ganancia_final);
                    out_adeudo_plataforma_efec = aes256.decrypt(res.data.datos[0].out_adeudo_plataforma_efec);
                    out_adeudo_socio_efec = aes256.decrypt(res.data.datos[0].out_adeudo_socio_efec);
                } else {
                    //Asignación a variables de los datos
                    rango_fechas = res.data.datos[0].rango_fechas;
                    tarjeta_gan = res.data.datos[0].tarjeta_gan;
                    efectivo_gan = res.data.datos[0].efectivo_gan;
                    externo_gan = res.data.datos[0].externo_gan;
                    total_gan = res.data.datos[0].total_gan;
                    total_gan_dia = res.data.datos[0].total_gan_dia;
                    cuota_plat_r = res.data.datos[0].cuota_plat_r;
                    cuota_socio_r = res.data.datos[0].cuota_socio_r;
                    cant_servicios = res.data.datos[0].cant_servicios;
                    ganancia_final = res.data.datos[0].ganancia_final;
                    out_adeudo_plataforma_efec = res.data.datos[0].out_adeudo_plataforma_efec;
                    out_adeudo_socio_efec = res.data.datos[0].out_adeudo_socio_efec;
                }

                //Tratamiento de las fechas para obtener sus rangos
                let obj_semana = rango_fechas.split(' ');  //Separación de la variable en un objeto
                let fecha_dia_1 = obj_semana[0];  //Día de la primer fecha
                let fecha_dia_2 = obj_semana[4];  //Día de la segunda fecha

                //Tratamiento del formato del día
                if (fecha_dia_1.substring(0, 1) == "0") {
                    fecha_dia_1 = fecha_dia_1.replace('0', '');
                }

                //Tratamiento del formato del día
                if (fecha_dia_2.substring(0, 1) == "0") {
                    fecha_dia_2 = fecha_dia_2.replace('0', '');
                }

                //Formato del rango de fechas: 'DD de mmm(letra) - DD de mmm(letra)'
                let semana = fecha_dia_1 + ' ' + obj_semana[1] + ' ' + obj_semana[2] + ' ' + obj_semana[3] + ' ' + fecha_dia_2 + ' ' + obj_semana[5] + ' ' + obj_semana[6];

                //Actualización de las variables con los datos del WS ya tratados
                this.setState({
                    tarjeta_gan: tarjeta_gan,
                    efectivo_gan: efectivo_gan,
                    externo_gan: externo_gan,
                    total_gan: total_gan,
                    total_gan_dia: total_gan_dia,
                    cuota_plat: cuota_plat_r,
                    cuota_socio: cuota_socio_r,
                    rango_fechas: semana,
                    cant_servicios: cant_servicios,
                    ganancia_final: ganancia_final,
                    out_adeudo_plataforma_efec: out_adeudo_plataforma_efec,
                    out_adeudo_socio_efec: out_adeudo_socio_efec,
                    refreshing: false
                });
            }else{ //Error en el WS
                alert("Servicio no disponible, intente más tarde", "Error");
            }

        }catch(error){  //Obtención del error
            //Error de conexión
            if(error.message == 'Network Error'){
                alert("Verifique su conexión e intente nuevamente", "Error");
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }

            console.log(error);
        }
    };

    /**
     *
     *
     * @memberof WalletScreen
     */
    principal_body_2 = async () => {
        //Try-catch para manejar error de conexión
        try{
            //Variable que contiene los datos de respuesta del WS
            const res = await axios.post('http://35.203.42.33:3001/usuarios/interfaz_77_78/comprobar_promocion');

            //Comprobar que la respuesta del WS es correcta
            if(res.status == 200){
                let res_integer = res.data.out_validate;
                let validate_promotion;
                let encrypt = res.data.encrypt;

                if(encrypt){
                    res_integer = aes256.decrypt(key, res_integer);
                }

                if(res_integer == 1){
                    validate_promotion = true;
                }else{
                    validate_promotion = false;
                }

                this.setState({
                    validate_promotion: validate_promotion,
                });
            }else{ //Error en el WS
                alert("Servicio no disponible, intente más tarde", "Error");
            }
        } catch (error) {
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
     * @memberof WalletScreen
     *
     * Método para refrescar la vista
     */
    onRefresh() {
        //Limpiamos los datos de la vista para preparar los nuevos en caso de que existan
        this.setState({
            tarjeta_gan: 0,
            efectivo_gan: 0,
            externo_gan: 0,
            total_gan: 0,
            total_gan_dia: 0,
            cuota_plat_r: 0,
            cuota_socio_r: 0,
            rango_fechas: '00/00 - 00/00',
            cant_servicios: 0,
            ganancia_final: 0,
            out_adeudo_plataforma_efec: 0,
            out_adeudo_socio_efec: 0,
            fecha_actual: '',
            tiempo_segundos: 0,
            tiempo_minutos: 55,
            tiempo_horas: 10,
            connListItems: [],
            validate_promotion: false
        });
        //Volvemos a ejecutar el método que contiene el tratamiento de los datos y la petición al WS
        this.principal_body();
        this.principal_body_2();
    }

    /**
     *
     *
     * @returns
     * @memberof WalletScreen
     *
     * Componentes principales
     *
     */
    render() {

        //Comprobar el estado de la variable de refrescado
        if (this.state.refreshing) {
            return (
                //Se muestra mientras los datos están siendo recargados
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                <ScrollView style={{ marginBottom: 75 }}
                    refreshControl={
                        <RefreshControl
                            //Componente que hace la petición de refrescado
                            refreshing={this.state.refreshing}  //Comprobar estado de variable de refrescado
                            onRefresh={this.onRefresh.bind(this)}  //Refrescar
                        />
                    }>

                    {
                        //Componente que contiene la parte superior de la vista
                    }
                    <TopTemplate></TopTemplate>

                    <TouchableOpacity onPress={() =>
                        //Pasar datos y navegar a la vista de "Earning"
                        this.props.navigation.navigate("Earning",
                        { total_gan: this.state.total_gan,
                            id_chofer: this.state.id_chofer,
                            rango_fechas: this.state.rango_fechas
                        })}>
                        <View
                            style={{
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                padding: 5
                            }}>

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                {
                                    //Forma de cargar las fuentes
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Ganancias de esta semana</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 10 }}>{this.state.rango_fechas}</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 20 }}>${this.state.total_gan} MXN</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                position: 'absolute',
                                paddingLeft: 260
                            }}>
                                <Icon
                                    name='chevron-right'
                                    size={30}
                                    style={{
                                        paddingLeft: 50
                                    }}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>

                    <Divider style={styles.row}></Divider>

                    <TouchableOpacity onPress={() =>
                    //Pasar datos y navegar a la vista de "Card"
                    this.props.navigation.navigate("Card", {
                        tarjeta_gan: this.state.tarjeta_gan,
                        id_chofer: this.state.id_chofer
                        })}>
                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Tarjeta</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.tarjeta_gan} MXN</Text>
                                    ) : null
                                }
                                <Icon
                                    name='chevron-right'
                                    size={15}
                                    style={{ paddingLeft: 10 }}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 5
                    }}>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Efectivo</Text>
                                ) : null
                            }
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.efectivo_gan} MXN</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 5
                    }}>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Extra</Text>
                                ) : null
                            }
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.externo_gan} MXN</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 5
                    }}>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Comisión plataforma</Text>
                                ) : null
                            }
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.cuota_plat_r} MXN</Text>
                                ): null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 5
                    }}>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Comisión socio</Text>
                                ) : null
                            }
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>${this.state.cuota_socio_r} MXN</Text>
                                ): null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <TouchableOpacity onPress={() =>
                    //Pasar datos y navegar a la vista de "Travel"
                    this.props.navigation.navigate("Travel", {
                        id_chofer: this.state.id_chofer
                    })}>
                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15 }}>Ver Viajes</Text>
                                    ) : null
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Icon
                                    name='chevron-right'
                                    size={15}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5
                    }}>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt' }}>{this.state.fecha_actual}</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 40,
                        width: 400,
                        justifyContent: 'space-evenly',
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 40,
                            width: 200
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>{this.state.cant_servicios}</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>Viajes</Text>
                                ) : null
                            }
                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 80,
                            width: 200
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    //Agregar la función para el tiempo conectado
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>{this.state.tiempo_horas}:{this.state.tiempo_minutos}</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>Tiempo conectado</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 5
                    }}>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>Ganancias del día</Text>
                                ) : null
                            }
                        </View>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Bd', fontSize: 16 }}>${this.state.total_gan_dia} MXN</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 5
                    }}>

                        <View>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>Adeudos por cobros en efecivo</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 40,
                        width: 400,
                        justifyContent: 'space-evenly',
                        flexDirection: 'row'
                    }}>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 40,
                            width: 200
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>${this.state.out_adeudo_plataforma_efec} MXN</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>Cuota de servicio YiMi</Text>
                                ) : null
                            }
                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 80,
                            width: 200
                        }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>${this.state.out_adeudo_socio_efec} MXN</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>Cuota de socio</Text>
                                ) : null
                            }
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <TouchableOpacity onPress={() => this.state.validate_promotion ?
                        //Pasar datos y navegar a la vista de "Refer"
                        this.props.navigation.navigate("Refer", {
                            id_chofer: this.state.id_chofer
                        })
                        : alert('Actualmente no existen promociones validas', 'Atención')
                    }>
                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                {
                                    this.state.fontLoaded ? (
                                        <Text style={{ fontFamily: 'Aller_Lt', }}>Gana dinero refiriendo</Text>
                                    ) : null
                                }
                            </View>

                            <View>
                                <Icon
                                    name='chevron-right'
                                    size={15}
                                />
                            </View>

                        </View>
                    </TouchableOpacity>

                    <Divider style={styles.row}></Divider>
                    <Divider style={styles.row}></Divider>
                    <Divider style={styles.row}></Divider>

                </ScrollView>

                <View style={{
                    height: 90,
                    marginTop: 475,
                    paddingTop: 5,
                    position: 'absolute',
                    flexDirection: 'row',
                    backgroundColor: '#f0f4f7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 25
                    }}>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 25
                    }}>
                        <Icon
                            name='car'
                            size={45}
                            onPress={this.test}
                            style={{
                                    color: '#ec6a2c'
                                }}
                        />
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', }}>Inicio</Text>
                            ) : null
                        }
                    </View>

                    <TouchableOpacity onPress={() =>
                    //Pasar datos y navegar a la vista de "Wallet"
                    this.props.navigation.navigate("Wallet")
                    }>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 25
                        }}>
                            <Icon
                                name='wallet'
                                size={45}
                                style={{
                                    color: '#ec6a2c'
                                }}
                            />
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', }}>Mi billetera</Text>
                                ) : null
                            }
                        </View>
                    </TouchableOpacity>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 25
                    }}>
                        <Icon
                            name='user'
                            size={45}
                            onPress={this.test}
                            style={{
                                color: '#ec6a2c'
                            }}
                        />
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', }}>Mi perfil</Text>
                            ) : null
                        }
                    </View>

                </View>

            </View>

        );
    }
}

//Estilos de diseño defenidos
const styles = StyleSheet.create({
    row: {
        height: 5,
        backgroundColor: "#f0f4f7"
    },
});