// In App.js in a new project

import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import axios from 'axios';

export default class TotalBalanceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_chofer: this.props.id_chofer,
            obj_aux_final: [],
            obj_items: [],
            validateWS: false,
            objTotalEarnings: []
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    async componentDidMount(){
        try{

            const res = await axios.post('http://34.95.33.177:3001/billetera/interfaz_79/tarjeta', {
                id_chofer: this.state.id_chofer
            });
            const obj = res.data.datos;
            this.setState({
                objTotalEarnings: obj,
                validateWS: true
            });
            this.objToTotalEarnings();

        }catch(e){
            console.log(e);
            alert("No hay conexión al web service", "Error");
            this.setState({
                validateWS: false
            });
        }

    }

    objToTotalEarnings = () => {
        const earnings = this.state.objTotalEarnings;
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
                earning.out_cupon = aes256.decrypt(key, earning.out_cupon);
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

            obj_actual.forEach((object, index) => {
                obj_items_aux.push(<Divider key={"divider_inicio_" + index} style={styles.row}></Divider>);
                if (object.hasOwnProperty('out_fecha')) {
                    obj_items_aux.push(
                        <View key={"view_principal_" + index}>
                            <View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>{object.out_hora}</Text>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>- ${object.out_cuota_plat} MXN</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Cuota de servicio de YiMi</Text>
                                </View>
                            </View>

                            <Divider style={styles.row}></Divider>

                            <View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>{object.out_hora}</Text>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>- ${object.out_cuota_socio} MXN</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Cuota de socio</Text>
                                </View>
                            </View>

                            <Divider style={styles.row}></Divider>

                            <View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>{object.out_hora}</Text>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>${object.out_total} MXN</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>{object.out_id_serv}</Text>
                                </View>
                            </View>

                        </View>
                        );

                    if (object.out_cupon != '0.00' && object.out_cupon != null) {
                        obj_items_aux.push(
                            <View>
                                <Divider style={styles.row}></Divider>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>{object.out_hora}</Text>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>${object.out_cupon} MXN</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Cupón</Text>
                                </View>
                            </View>
                        );
                    }
                }else{
                    obj_items_aux.push(
                        <View key={"view_fecha_" + index}
                        style={{
                            height: 25,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: '#D4D4D4'
                        }}>
                            <Text key={"text_fecha_" + index} style={{fontSize: 15, paddingLeft: 5}}>{object}</Text>
                        </View>
                    );

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

    render() {
        return (
            <View>
                { this.state.validateWS ? this.state.obj_items : this.setInfoWS() }
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        width: 200,
        padding: 12,
        borderWidth: 1
    },
    row: {
        height: 10,
        backgroundColor: "#f0f4f7"
    }
});