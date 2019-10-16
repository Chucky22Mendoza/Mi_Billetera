// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Table, Row } from 'react-native-table-component';
import { Divider } from 'react-native-elements';
import TopTemplate from './TopTemplate';
import axios from 'axios';
import * as Font from 'expo-font';
//const aes256 = require('aes256');
//var key = "92AE31A79FEEB2A3";

export default class WalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_chofer: 1,
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
            switchValue: true,
            fontLoaded: false,
            connListItems: [],
            tableData_1: [
                [2, '10:55']
            ],
            tableData_2: [
                ['Viajes', 'Tiempo conectado']
            ]
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Mi Billetera'
    };


    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});

        let date, day, month, year, fecha;
        date = new Date();

        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();

        if(day.toString().length == 1 ){
            day = '0' + day;
        }

        if(month.toString().length == 1 ){
            month = '0' + month;
        }

        fecha = day + "/" + month + "/" + year;
        this.setState({
            fecha_actual: fecha
        });
        try{
            const res = await axios.post('http://34.95.33.177:3001/billetera/interfaz_75/billetera', {
                id_chofer: this.state.id_chofer
            });

            // handle success
            let rango_fechas, tarjeta_gan, efectivo_gan, externo_gan, total_gan, total_gan_dia, cuota_plat_r, cuota_socio_r, cant_servicios;

            if(res.data.datos[0].encrypt){
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
            }else{
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

            let obj_semana = rango_fechas.split(' ');
            let fecha_dia_1 = obj_semana[0];
            let fecha_dia_2 = obj_semana[4];

            if (fecha_dia_1.substring(0, 1) == "0") {
                fecha_dia_1 = fecha_dia_1.replace('0', '');
            }

            if (fecha_dia_2.substring(0, 1) == "0") {
                fecha_dia_2 = fecha_dia_2.replace('0', '');
            }

            let semana = fecha_dia_1 + ' ' + obj_semana[1] + ' ' + obj_semana[2] + ' ' + obj_semana[3] + ' ' + fecha_dia_2 + ' ' + obj_semana[5] + ' ' + obj_semana[6];

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
                out_adeudo_socio_efec: out_adeudo_socio_efec
            });
        }catch(e){
            console.log(e);
            alert("No hay conexión al web service", "Error");
        }
    }

    render() {
        return (
            <View>
                <ScrollView style={{marginBottom: 75}}>

                    <TopTemplate></TopTemplate>

                    <TouchableOpacity onPress={() => this.state.total_gan != 0 ? this.props.navigation.navigate("Earning", { total_gan: this.state.total_gan, id_chofer: this.state.id_chofer, rango_fechas: this.state.rango_fechas }) : Alert('Esperando al servidor', 'Wait')}>
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

                    <TouchableOpacity onPress={() => this.state.tarjeta_gan != 0 ? this.props.navigation.navigate("Card", { tarjeta_gan: this.state.tarjeta_gan, id_chofer: this.state.id_chofer }) : Alert('Esperando al servidor', 'Wait')}>
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Travel", {id_chofer: this.state.id_chofer})}>
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Refer", { id_chofer: this.state.id_chofer })}>
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Wallet")}>
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        height: 5,
        backgroundColor: "#f0f4f7"
    },
});