// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import TopTemplate from './TopTemplate';
import axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';
import * as Font from 'expo-font';

export default class TravelScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_chofer: this.props.navigation.state.params.id_chofer,
            objTravels: [],
            obj_aux_final: [],
            obj_items: [],
            validateWS: false,
            fontLoaded: false,
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Ver viajes'
    };

    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});

        try{
            const res = await axios.post('http://34.95.33.177:3001/billetera/interfaz_81/verviajes', {
                id_chofer: this.state.id_chofer
            });
            const obj = res.data.datos;
            this.setState({
                objTravels: obj,
                validateWS: true
            });
            this.objToTravels();
        }catch(e){
            alert("No hay conexión al web service", "Error");
            this.setState({
                validateWS: false
            });
        }

    }

    objToTravels = () => {
        const travels = this.state.objTravels;
        const obj_aux = [];

        travels.forEach(travel => {
            if(travel.encrypt){
                travel.id_transaccion = aes256.decrypt(key, travel.id_transaccion);
                travel.out_fecha = aes256.decrypt(travel.out_fecha);
                travel.out_hora = aes256.decrypt(travel.out_hora);
                travel.out_id_serv = aes256.decrypt(travel.out_id_serv);
                travel.out_origen = aes256.decrypt(travel.out_origen); //No se usa
                travel.out_destino = aes256.decrypt(travel.out_destino);//No se usa
                travel.out_total = aes256.decrypt(travel.out_total);
                travel.out_propina = aes256.decrypt(travel.out_propina);
                travel.out_estado_servicio = aes256.decrypt(travel.out_estado_servicio);
            }

            if(!obj_aux.includes(travel.out_fecha)){
                obj_aux.push(travel.out_fecha);
            }

            obj_aux.push(travel);
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
                    if(object.estado_servicio === "Finalizada con exito"){
                        let obj_data = [object.out_hora, object.out_total, object.out_propina];

                        obj_items_aux.push(
                            <Rows key={"row_data_" + index} data={[obj_data]} textStyle={styles.text} />
                        );
                        /*{
                            this.state.fontLoaded ? (
                                <Text key={"hora_" + index} style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingLeft: 30 }}>{object.out_hora}</Text>
                            ) : null
                        }
                        {
                            this.state.fontLoaded ? (
                                <Text key={"total_" + index} style={{ fontFamily: 'Aller_Bd', fontSize: 18 }}>${object.out_total}</Text>
                            ) : null
                        }
                        {
                            this.state.fontLoaded ? (
                                <Text key={"propina_" + index} style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingRight: 30 }}>${object.out_propina}</Text>
                            ) : null
                        }*/
                    }else{
                        obj_items_aux.push(
                            <View key={"view_1_" + index} style={{ justifyContent: 'space-around', flexDirection: 'row', marginHorizontal: 5 }}>
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"hora_" + index} style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingLeft: 30 }}>{object.out_hora}</Text>
                                    ) : null
                                }
                                {
                                    this.state.fontLoaded ? (
                                        <Text key={"cancelado_" + index} style={{ fontFamily: 'Aller_Bd', fontSize: 20, paddingLeft: 15 }}>{object.estado_servicio}</Text>
                                    ) : null
                                }
                            </View>
                        );
                    }
                }else{
                    obj_items_aux.push(
                        <View key={"view_1_title_" + index} style={{ height: 25, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#D4D4D4'}}>
                            {
                                this.state.fontLoaded ? (
                                    <Text key={index} style={{ fontFamily: 'Aller_Lt', fontSize: 16, paddingLeft: 30 }}>{object}</Text>
                                ) : null
                            }
                        </View>
                    );
                }
                if((index + 1) == last_index_obj){
                    obj_items_aux.push(<Divider key={"divider_final1_" + index} style={styles.row}></Divider>);
                    obj_items_aux.push(<Divider key={"divider_final2_" + index} style={styles.row}></Divider>);
                }
            });
            this.setState({
                obj_items: obj_items_aux
            });
        }
    }

    setInfoWS = () =>{
        return(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 400, height: 400 }}>
                    <Image
                        source= {require('./../resource/img/loading.gif')}
                        style= {styles.img}
                    />
                </View>);
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    <Divider style={styles.row}></Divider>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 14, paddingLeft: 30 }}>Fecha/Hora</Text>
                            ) : null
                        }
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 14 }}>Ganancias MXN</Text>
                            ) : null
                        }
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 14, paddingRight: 30 }}>Extra MXN</Text>
                            ) : null
                        }
                    </View>
                </View>
                { this.state.validateWS ? this.state.obj_items : this.setInfoWS() }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        height: 5,
        backgroundColor: "#f0f4f7"
    },
    head: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 30
    },
    text: {
        fontSize: 14,
        fontFamily: 'Aller_Lt',
        textAlign: 'center'
    },
    img: {
        backgroundColor: "#f0f4f7"
    }
});
