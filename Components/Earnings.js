// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import TopTemplate from './TopTemplate';
import axios from 'axios';
import * as Font from 'expo-font';
import { BarChart } from "react-native-chart-kit";

export default class EarningScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objEarnings: [],
            obj_aux_final: [],
            obj_aux_final_2: [],
            obj_fechas: [],
            obj_items: [],
            validateWS: false,
            objTotalEarnings: {},
            id_chofer: this.props.navigation.state.params.id_chofer,
            earningTotalPrincipal: this.props.navigation.state.params.total_gan,
            rango_fechas: this.props.navigation.state.params.rango_fechas,
            fontLoaded: false
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Ganancias'
    };

    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});

        try{
            const res = await axios.post('http://34.95.33.177:3001/billetera/interfaz_78_2/ganancias', {
                id_chofer: this.state.id_chofer
            });
            const obj = res.data.datos;
            this.setState({
                objTotalEarnings: obj,
                validateWS: true
            });

        }catch(e){
            console.log(e);
            alert("Servicio no disponible, intente más tarde", "Error");
            this.setState({
                validateWS: false
            });
        }
        try{

            const res = await axios.post('http://34.95.33.177:3001/billetera/interfaz_78/ganancias', {
                id_chofer: this.state.id_chofer
            });
            const obj = res.data.datos;
            this.setState({
                objEarnings: obj,
                validateWS: true
            });
        }catch(e){
            console.log(e);
            alert("Servicio no disponible, intente más tarde", "Error");
            this.setState({
                validateWS: false
            });
        }
        this.objToTotalEarnings();
        this.objToEarnings();
    }

    objToTotalEarnings = () => {
        const earningTotal = this.state.objTotalEarnings;
        const obj_total = [];
        const obj_fechas = [];
        let total_mon = 0;
        let fecha_aux;
        let last_index_obj = earningTotal.length;

        earningTotal.forEach((total, index) => {
            if(total.encrypt){
                total.out_fecha = aes256.decrypt(key, total.out_fecha);
                total.out_total = aes256.decrypt(key, total.out_total);
                total.out_hora = aes256.decrypt(key, total.out_hora);
            }

            if(!obj_fechas.includes(total.out_fecha)){
                obj_fechas.push(total.out_fecha);
                fecha_aux = total.out_fecha;
                total_mon += parseFloat(total.out_total);
            }else{
                total_mon += parseFloat(total.out_total);
            }

            if(fecha_aux != total.out_fecha){
                obj_total.push(total_mon);
                total_mon = 0;
            }

            if((index + 1) == last_index_obj){
                obj_total.push(total_mon);
                total_mon = 0;
            }

        });

        this.setState({
            obj_aux_final_2: obj_total,
            obj_fechas: obj_fechas
        });

    }

    objToEarnings = () => {
        const earnings = this.state.objEarnings;
        const obj_aux = [];

        earnings.forEach(earning => {
            if(earning.encrypt){
                earning.out_fecha = aes256.decrypt(key, earning.out_fecha);
                earning.out_id_tran = aes256.decrypt(key, earning.out_id_tran);
                earning.out_form_pago = aes256.decrypt(key, earning.out_form_pago);
                earning.out_id_serv = aes256.decrypt(key, earning.out_id_serv);
                earning.out_total = aes256.decrypt(key, earning.out_total);
                earning.out_cuota_plat = aes256.decrypt(key, earning.out_cuota_plat);
                earning.out_cuota_socio = aes256.decrypt(key, earning.out_cuota_socio);
                earning.out_hora = aes256.decrypt(key, earning.out_hora);
            }

            if(!obj_aux.includes(earning.out_fecha)){
                obj_aux.push(earning.out_fecha);
            }

            obj_aux.push(earning);
        });

        this.setState({
            obj_aux_final: obj_aux
        });
        this.componentBody();
    }

    componentBody = () =>{
        const obj = this.state.obj_aux_final;
        let obj_items_aux = [];

        if(obj.length != 0){
            let obj_actual = obj;
            this.setState({
                obj_aux_final: obj_actual
            });
            let last_index_obj = obj_actual.length;
            let index_obj = 0;

            obj_actual.forEach((object, index) => {
                obj_items_aux.push(<Divider key={"divider_inicio_" + index} style={styles.row}></Divider>);
                if (object.hasOwnProperty('out_fecha')) {
                    if(object.out_form_pago === 'Tarjeta'){
                        object.out_form_pago = 'Pago con tarjeta';
                    }else if(object.out_form_pago === 'Efectivo'){
                        object.out_form_pago = 'Pago en efectivo';
                    }
                    obj_items_aux.push(
                        <View key={"view_principal_" + index}>
                            <View key={"view_1_" + index} style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_hora_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>{object.out_hora} {object.out_id_serv}</Text>
                                    ) : null
                                }
                            </View>
                            <View key={"view_2_" + index} style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_form_pago_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>{object.out_form_pago}</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_total_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>${object.out_total} MXN</Text>
                                    ) : null
                                }
                            </View>
                            <View key={"view_3_" + index} style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_cuota_servicio_YiMi_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>Cuota del servicio de YiMi</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_cuota_servicio_YiMi_total_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>- ${object.out_cuota_plat} MXN</Text>
                                    ) : null
                                }
                            </View>
                            <View key={"view_4_" + index} style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_cuota_socio_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>Cuota de socio</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_cuota_socio_total_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>- ${object.out_cuota_socio} MXN</Text>
                                    ) : null
                                }
                            </View>
                        </View>
                    );

                    if(object.out_cupon != '0.00' && object.out_cupon != null){
                        obj_items_aux.push(
                            <View key={"view_5_" + index} style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_cupón_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>Cupón</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"text_cupón_total_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>${object.out_cupon} MXN</Text>
                                    ) : null
                                }
                            </View>
                        );
                    }

                }else{
                    obj_items_aux.push(
                        <View key={"view_fecha_total_" + index} style={{ height: 25, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#D4D4D4' }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text key={"text_fecha_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>{object}</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text key={"text_total_final_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingRight: 5 }}>${this.getCentavos(this.state.obj_aux_final_2[index_obj])} MXN</Text>
                                ) : null
                            }
                        </View>
                    );

                    index_obj += 1;
                }
                if((index + 1) == last_index_obj){
                    obj_items_aux.push(<Divider key={"divider_final_" + index} style={styles.row}></Divider>);
                }
            });

            this.setState({
                obj_items: obj_items_aux
            });

        }
    }

    setInfoWS = () =>{
        return(<View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 400,
                    height: 400
                }}>
                    <Image
                        source= {require('./../resource/img/loading.gif')}
                        style= {styles.img}
                    />
                </View>);
    }

    getCentavos = (numberValue) =>{
        if(numberValue == '' || numberValue == null){
            numberValue = 0;
        }

        let valueString = numberValue.toString();
        let split_numberValue = valueString.split('.');
        let outValue = 0;
        if(split_numberValue.length > 1){
            outValue = numberValue + '0';
        }else{
            outValue = numberValue + '.00';
        }
        return outValue;
    }

    render() {
        const data = {
            labels: this.state.obj_fechas,
            datasets: [{data: this.state.obj_aux_final_2}]
        };

        return (
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 28, padding: 10 }}>Ganancias</Text>
                            ) : null
                        }
                        <View style={{ flexDirection: 'row' }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 28, paddingTop: 5 }}>${this.state.earningTotalPrincipal}</Text>
                                ) : null
                            }
                            {
                                this.state.fontLoaded ? (
                                    <Text style={{ fontFamily: 'Aller_Lt', fontSize: 21, paddingTop: 10, paddingRight: 10 }}> MXN</Text>
                                ) : null
                            }
                        </View>
                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{ flex: 1 }}>
                        <BarChart
                            data={data}
                            width={Dimensions.get("window").width}
                            height={250}
                            yAxisLabel={'$'}
                            fromZero={true}
                            chartConfig={{
                                backgroundColor: "#fff",
                                backgroundGradientFrom: "#fff",
                                backgroundGradientTo: "#fff",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                strokeWidth: 4
                            }}/>
                    </View>

                    {
                        this.state.fontLoaded ? (
                            <Text style={{ fontFamily: 'Aller_Lt', textAlign: 'center', height: 25 }}>{this.state.rango_fechas}</Text>
                        ) : null
                    }

                    { this.state.validateWS ? this.state.obj_items : this.setInfoWS() }

                </View>
            </ScrollView>
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
    }
});
