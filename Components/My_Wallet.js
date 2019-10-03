// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Table, Row } from 'react-native-table-component';
import { Divider } from 'react-native-elements';
import TopTemplate from './TopTemplate';
import axios from 'axios';
import { SQLite } from "expo";
//const aes256 = require('aes256');
//var key = "92AE31A79FEEB2A3";

//const db = SQLite.openDatabase('database.db');

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
        let date, fecha;
        date = new Date();
        fecha = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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

            this.setState({
                tarjeta_gan: tarjeta_gan,
                efectivo_gan: efectivo_gan,
                externo_gan: externo_gan,
                total_gan: total_gan,
                total_gan_dia: total_gan_dia,
                cuota_plat: cuota_plat_r,
                cuota_socio: cuota_socio_r,
                rango_fechas: rango_fechas,
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

                    <TouchableOpacity onPress={() => this.state.total_gan != 0 ? this.props.navigation.navigate("Earning", { total_gan: this.state.total_gan }) : Alert('Esperando al servidor', 'Wait')}>
                        <View
                            style={{
                                height: 70,
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                                padding: 5
                            }}>

                            <View style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={{ fontSize: 15 }}>Ganancias de esta semana</Text>
                                <Text style={{ fontSize: 10 }}>{this.state.rango_fechas}</Text>
                                <Text style={{ fontSize: 20 }}>${this.state.total_gan} MXN</Text>
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

                    <TouchableOpacity onPress={() => this.state.tarjeta_gan != 0 ? this.props.navigation.navigate("Card", { tarjeta_gan: this.state.tarjeta_gan }) : Alert('Esperando al servidor', 'Wait')}>
                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 15 }}>Tarjeta</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 15 }}>${this.state.tarjeta_gan} MXN</Text>
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
                            <Text style={{ fontSize: 15 }}>Efectivo</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontSize: 15 }}>${this.state.efectivo_gan} MXN</Text>
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
                            <Text style={{ fontSize: 15 }}>Extra</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontSize: 15 }}>${this.state.externo_gan} MXN</Text>
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
                            <Text style={{ fontSize: 15 }}>Comisión plataforma</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontSize: 15 }}>${this.state.cuota_plat_r} MXN</Text>
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
                            <Text style={{ fontSize: 15 }}>Comisión socio</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{ fontSize: 15 }}>${this.state.cuota_socio_r} MXN</Text>
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Travel")}>
                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 15 }}>Ver Viajes</Text>
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
                            <Text>{this.state.fecha_actual}</Text>
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
                            <Text>{this.state.cant_servicios}</Text>
                            <Text>Viajes</Text>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 80,
                            width: 200
                        }}>
                            <Text>{this.state.tiempo_horas}:{this.state.tiempo_minutos}</Text>
                            <Text>Tiempo conectado</Text>
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
                            <Text>Ganancias del día</Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>${this.state.total_gan_dia} MXN</Text>
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
                            <Text>Adeudos por cobros en efecivo</Text>
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
                            <Text>${this.state.out_adeudo_plataforma_efec} MXN</Text>
                            <Text>Cuota de servicio MiGo</Text>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 80,
                            width: 200
                        }}>
                            <Text>${this.state.out_adeudo_socio_efec} MXN</Text>
                            <Text>Cuota de socio</Text>
                        </View>

                    </View>

                    <Divider style={styles.row}></Divider>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Refer")}>
                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text>Gana dinero refiriendo</Text>
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
                        <Text>Inicio</Text>
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
                            <Text>Mi billetera</Text>
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
                        <Text>Mi perfil</Text>
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