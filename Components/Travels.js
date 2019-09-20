// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import TopTemplate from './TopTemplate';
import axios from 'axios';
import { Row, Table, Rows } from 'react-native-table-component';

export default class TravelScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_chofer: 1,
            objTravels: [],
            obj_aux_final: [],
            obj_items: [],
            tableHead: ['Fecha/Hora', 'Ganancia MXN', 'Extra MXN'],
            validateWS: false,
            displayAddr: false
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

            const res = await axios.post('http://187.234.45.213:3001/webservice/interfaz81/verviajes', {
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
            })
        }
        this.objToTravels();
    }

    objToTravels = () => {
        const travels = this.state.objTravels;
        const obj_aux = [];
        let i = 0;
        travels.forEach(travel => {
            i++;
            const fech_aux = travel.out_fecha;
            const fech_split = fech_aux.split("T");
            const fecha_completa = fech_split[0];
            const hora_completa = fech_split[1];
            const fecha_completa_split = fecha_completa.split("-");
            const fecha_final = fecha_completa_split[2] + "/" + fecha_completa_split[1];
            const hora_completa_split = hora_completa.split(":");
            const hora_final = hora_completa_split[0] + ":" + hora_completa_split[1];

            travel.out_fecha = fecha_final;
            travel.out_hora = hora_final;
            travel.id = i;

            if(travel.out_total == null){
                travel.out_total = 0;
            }
            if(travel.out_propina == null){
                travel.out_propina = 0;
            }

            //console.log(travel.estado_servicio);

            if(!obj_aux.includes(fecha_final)){
                obj_aux.push(fecha_final);
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
                            <TouchableOpacity key={"view_1_" + index} onPress={this.changeStateTravel} style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text key={"hora_" + index} style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 30 }}>{object.out_hora}</Text>
                                <Text key={"total_" + index} style={{ fontSize: 18, fontWeight: 'bold' }}>${object.out_total}</Text>
                                <Text key={"propina_" + index} style={{ fontSize: 18, fontWeight: 'bold', paddingRight:30 }}>${object.out_propina}</Text>
                            </TouchableOpacity>
                        );
                        obj_items_aux.push(
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
                        );
                    }else{
                        obj_items_aux.push(
                            <View key={"view_1_" + index} style={{ justifyContent: 'space-around', flexDirection: 'row', marginHorizontal: 5 }}>
                                <Text key={"hora_" + index} style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 30 }}>{object.out_hora}</Text>
                                <Text key={"cancelado_" + index} style={{ fontSize: 20, paddingLeft: 15, fontWeight: 'bold' }}>Cancelado por el cliente</Text>
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

    changeStateTravel = () => {
        if(this.state.displayAddr){
            this.setState({
                displayAddr: false
            });
        }else{
            this.setState({
                displayAddr: true
            });
        }
        this.componentBody();
        console.log(this.state.displayAddr);
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    <Divider style={styles.row}></Divider>
                    <View>
                        <Table>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
                        </Table>
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
