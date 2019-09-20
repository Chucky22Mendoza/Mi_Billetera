// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Row } from 'react-native-table-component';
import { Divider } from 'react-native-elements';
import TopTemplate from './TopTemplate';
import axios from 'axios';
import { SQLite } from "expo";

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
            rango_fechas: '',
            cant_servicios: 0,
            fecha_actual: '',
            tiempo_segundos: 0,
            tiempo_minutos: 55,
            tiempo_horas: 10,
            switchValue: true,
            connListItems: [],
            tableData_1: [
                [2, '10:55']
            ],
            tableData_1: [
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

    getMonth = (mes) => {
        switch (mes) {
            case '01':
                return 'ene';
            case '02':
                return 'feb';
            case '03':
                return 'mar';
            case '04':
                return 'abr';
            case '05':
                return 'may';
            case '06':
                return 'jun';
            case '07':
                return 'jul';
            case '08':
                return 'ago';
            case '09':
                return 'sep';
            case '10':
                return 'oct';
            case '11':
                return 'nov';
            case '12':
                return 'dic';
        }
    }

    getCentavos = (numberValue) => {
        numberValue = numberValue.toString();
        let split_numberValue = numberValue.split('.');

        if(split_numberValue.length > 1){
            outValue = numberValue + '0';
        }else{
            outValue = numberValue + '.00';
        }
        return outValue;
    }

    async componentDidMount(){
        //console.log(TopTemplate.props.switchValue);
        //console.log(db);
        try{
            //console.log(this.props.switchValue);
            const res = await axios.post('http://187.234.45.213:3001/webservice/interfaz75/billetera', {
                id_chofer: this.state.id_chofer
            });

            //console.log(res);

            // handle success
            const fechas_first = res.data.datos[0].rango_fechas;
            let split_fechas = fechas_first.split('-');
            let primer_mes = split_fechas[1];
            let primer_dia = split_fechas[2];
            let segundo_mes = split_fechas[4];
            let segundo_dia = split_fechas[5];

            primer_mes = this.getMonth(primer_mes);
            segundo_mes = this.getMonth(segundo_mes);

            const fechas = primer_dia + " de " + primer_mes + " - " + segundo_dia + " de " + segundo_mes;

            let tarjeta_gan = res.data.datos[0].tarjeta_gan;
            tarjeta_gan = this.getCentavos(tarjeta_gan);

            let efectivo_gan = res.data.datos[0].efectivo_gan;
            efectivo_gan = this.getCentavos(efectivo_gan);

            let externo_gan = res.data.datos[0].externo_gan;
            externo_gan = this.getCentavos(externo_gan);

            let total_gan = res.data.datos[0].total_gan;
            total_gan = this.getCentavos(total_gan);

            let total_gan_dia = res.data.datos[0].total_gan_dia;
            total_gan_dia = this.getCentavos(total_gan_dia);

            let cuota_plat_r = res.data.datos[0].cuota_plat_r;
            cuota_plat = this.getCentavos(cuota_plat_r);

            let cuota_socio_r = res.data.datos[0].cuota_socio_r;
            cuota_socio_r = this.getCentavos(cuota_socio_r);

            let cant_servicios = res.data.datos[0].cant_servicios;

            let date = new Date();
            let fecha = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

            this.setState({
                tarjeta_gan: tarjeta_gan,
                efectivo_gan: efectivo_gan,
                externo_gan: externo_gan,
                total_gan: total_gan,
                total_gan_dia: total_gan_dia,
                cuota_plat: cuota_plat_r,
                cuota_socio: cuota_socio_r,
                rango_fechas: fechas,
                cant_servicios: cant_servicios,
                fecha_actual: fecha
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

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        height: 60
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Switch value={this.state.switchValue} onValueChange={(switchValue) => this.setState({ switchValue })} />
                            <Text style={{ fontSize: 20 }}>{this.state.switchValue ? 'Conectado' : 'Desconectado'}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Icon
                                name='exclamation-circle'
                                size={40}
                                onPress={this.test}
                                style={{
                                    marginRight: 5
                                }}
                            />
                            <Icon
                                name='question-circle'
                                size={40}
                                onPress={this.test}
                                style={{
                                    marginRight: 5
                                }}
                            />
                            <Icon
                                name='cog'
                                size={40}
                                onPress={this.test}
                                style={{
                                    marginRight: 20
                                }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Earning")}>
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Card")}>
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
                    <View>
                        <Row data={this.state.tableData_1} textStyle={styles.text} />
                        <Row data={this.state.tableData_2} textStyle={styles.text} />
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
                            <Text>${this.state.cuota_plat} MXN</Text>
                            <Text>Cuota de servicio MiGo</Text>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 80,
                            width: 200
                        }}>
                            <Text>${this.state.cuota_socio} MXN</Text>
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
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        fontSize: 12,
        margin: 2
    }
});