// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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
            textInputVal: false
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

            const res = await axios.post('http://192.168.1.74:3000/webservice/interfaz81/verviajes', {
                id_chofer: this.state.id_chofer
            });
            const obj = res.data.datos;
            this.setState({
                objTravels: obj
            });
        }catch(e){
            alert("No hay conexión al web service", "Error");
        }
        this.testTravels();
    }

    testTravels = () => {
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

    onPressInput = () => {
        if(this.state.textInputVal){
            this.setState({
                textInputVal: false
            });
        }else{
            this.setState({
                textInputVal: true
            });
        }
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
                        <TouchableOpacity key={"view_1_" + index} onPress={this.onPressInput} style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text key={"hora_" + index} style={{ fontSize: 25, paddingLeft: 5 }}>{object.out_hora}</Text>
                            <Text key={"total_" + index} style={{ fontSize: 25, paddingLeft: 5 }}>${object.out_total} MXN</Text>
                        </TouchableOpacity>
                    );
                    obj_items_aux.push(
                        <View key={"view_2_" + index} style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon key={"icon_origen_" + index} name='chevron-right' size={15} onPress={this.test} style={{ color: 'green', paddingLeft: 10 }} />
                            <Text key={"origen_" + index} style={{ fontSize: 15, paddingLeft: 5 }}>{object.out_origen}</Text>
                        </View>
                    );
                    obj_items_aux.push(
                        <View key={"view_3_" + index} style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon key={"icon_destino_" + index} name='chevron-right' size={15} onPress={this.test} style={{ color: 'red', paddingLeft: 10 }} />
                            <Text key={"destino_" + index} style={{ fontSize: 15, paddingLeft: 5 }}>{object.out_destino}</Text>
                        </View>
                    );
                }else{
                    obj_items_aux.push(
                        <TouchableOpacity key={"view_1_title_" + index} style={{ height: 25, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#D4D4D4'}}>
                            <Text key={index} style={{fontSize: 15, paddingLeft: 5}}>{object}</Text>
                        </TouchableOpacity>
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

    render() {
        return (
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    {this.state.obj_items}
                    {this.state.textInputVal ?
                        <TextInput style={{display: 'flex'}}></TextInput>
                        : <TextInput style={{display: 'none'}}></TextInput>
                    }

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
        justifyContent: 'center',
    },
    row: {
        height: 10,
        backgroundColor: "#f0f4f7"
    }
});
