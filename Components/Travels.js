// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import TopTemplate from './TopTemplate';
import axios from 'axios';

export default class TravelScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_chofer: 1,
            objTravels: [],
            obj_aux_final: [],
            obj_items: [],
            validateWS: false
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Ver viajes'
    };

    async componentDidMount(){
        try{

            const res = await axios.post('http://34.95.33.177:3001/billetera/interfaz_81/verviajes', {
                id_chofer: this.state.id_chofer
            });
            const obj = res.data.datos;
            this.setState({
                objTravels: obj,
                validateWS: true
            });
        }catch(e){
            alert("No hay conexión al web service", "Error");
            this.setState({
                validateWS: false
            });
        }
        this.objToTravels();
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
                        obj_items_aux.push(
                            <View key={"view_1_" + index} style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text key={"hora_" + index} style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 30 }}>{object.out_hora}</Text>
                                <Text key={"total_" + index} style={{ fontSize: 18, fontWeight: 'bold' }}>${object.out_total}</Text>
                                <Text key={"propina_" + index} style={{ fontSize: 18, fontWeight: 'bold', paddingRight:30 }}>${object.out_propina}</Text>
                            </View>
                        );
                        /*obj_items_aux.push(
                            <View key={"view_2_" + index} style={{ display: !this.state.displayAddr ? 'none' :'flex', justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                                <Icon key={"icon_origen_" + index} name='chevron-right' size={15} style={{ color: 'green', paddingLeft: 10 }} />
                                <Text key={"origen_" + index} style={{ fontSize: 15, paddingLeft: 5 }}>{object.out_origen}</Text>
                            </View>
                        );
                        obj_items_aux.push(
                            <View key={"view_3_" + index} style={{ display: !this.state.displayAddr ? 'none' :'flex', justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                                <Icon key={"icon_destino_" + index} name='chevron-right' size={15} style={{ color: 'red', paddingLeft: 10 }} />
                                <Text key={"destino_" + index} style={{ fontSize: 15, paddingLeft: 5 }}>{object.out_destino}</Text>
                            </View>
                        );*/
                    }else{
                        obj_items_aux.push(
                            <View key={"view_1_" + index} style={{ justifyContent: 'space-around', flexDirection: 'row', marginHorizontal: 5 }}>
                                <Text key={"hora_" + index} style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 30 }}>{object.out_hora}</Text>
                                <Text key={"cancelado_" + index} style={{ fontSize: 20, paddingLeft: 15, fontWeight: 'bold' }}>{object.estado_servicio}</Text>
                            </View>
                        );
                    }
                }else{
                    obj_items_aux.push(
                        <View key={"view_1_title_" + index} style={{ height: 25, flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#D4D4D4'}}>
                            <Text key={index} style={{fontSize: 16, paddingLeft: 30}}>{object}</Text>
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
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    <Divider style={styles.row}></Divider>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, paddingLeft: 30 }}>Fecha/Hora</Text>
                            <Text style={{ fontSize: 14}}>Ganancias MXN</Text>
                            <Text style={{ fontSize: 14, paddingRight:30 }}>Extra MXN</Text>
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
        fontSize: 14
    },
    img: {
        backgroundColor: "#f0f4f7"
    }
});
