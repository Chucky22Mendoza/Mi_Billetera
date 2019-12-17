// In App.js in a new project

import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import axios from 'axios';
import * as Font from 'expo-font';

/**
 *
 *
 * @export
 * @class TotalBalanceScreen
 * @extends {React.Component}
 */
export default class TotalBalanceScreen extends React.Component {
    /**
     *Creates an instance of TotalBalanceScreen.
     * @param {*} props
     * @memberof TotalBalanceScreen
     */
    constructor(props) {
        super(props);
        this.state = {
            id_chofer: this.props.id_chofer,
            obj_aux_final: [],
            obj_items: [],
            validateWS: false,
            objTotalEarnings: [],
            fontLoaded: false,
        };
    }

    /**
     *
     *
     * @memberof TotalBalanceScreen
     */
    async componentWillMount(){
        this.principal_body();
    }

    /**
     *
     *
     * @memberof TotalBalanceScreen
     */
    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
            'Aller_Bd': require('./../assets/fonts/Aller_Bd.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof TotalBalanceScreen
     */
    async principal_body(){
        try{
            const res = await axios.post('http://35.203.42.33:3001/billetera/interfaz_79/tarjeta', {
                id_chofer: this.state.id_chofer
            });
            if(res.status == 200){
                const obj = res.data.datos;
                this.setState({
                    objTotalEarnings: obj,
                    validateWS: true
                });
                this.objToTotalEarnings();
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
                this.setState({
                    validateWS: false
                });
            }

        }catch(error){
            //Error de conexión
            if(error.message == 'Network Error'){
                alert("Verifique su conexión e intente nuevamente", "Error");
            }else{
                alert("Servicio no disponible, intente más tarde", "Error");
            }
            console.log(error);
            this.setState({
                validateWS: false
            });
        }
    }

    /**
     *
     *
     * @memberof TotalBalanceScreen
     */
    objToTotalEarnings = () => {
        const earnings = this.state.objTotalEarnings;
        const obj_aux = [];

        if(earnings.length > 0){
            earnings.forEach(earning => {
                if (earning.encrypt) {
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

                if (!obj_aux.includes(earning.out_fecha)) {
                    obj_aux.push(earning.out_fecha);
                }

                obj_aux.push(earning);
            });
        }

        this.setState({
            obj_aux_final: obj_aux
        });
        this.componentBody();
    }

    /**
     *
     *
     * @memberof TotalBalanceScreen
     */
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
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingLeft: 5 }}>{object.out_hora}</Text>
                                        ) : null
                                    }
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 15, paddingLeft: 5, marginTop: 10 }}>- ${object.out_cuota_plat} MXN</Text>
                                        ) : null
                                    }
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Cuota de servicio de YiMi</Text>
                                        ) : null
                                    }
                                </View>
                            </View>

                            <Divider style={styles.row}></Divider>

                            <View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingLeft: 5 }}>{object.out_hora}</Text>
                                        ) : null
                                    }
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 15, paddingLeft: 5, marginTop: 10 }}>- ${object.out_cuota_socio} MXN</Text>
                                        ) : null
                                    }
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Cuota de socio</Text>
                                        ) : null
                                    }
                                </View>
                            </View>

                            <Divider style={styles.row}></Divider>

                            <View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingLeft: 5 }}>{object.out_hora}</Text>
                                        ) : null
                                    }
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 15, paddingLeft: 5, marginTop: 10 }}>${object.out_total} MXN</Text>
                                        ) : null
                                    }
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>{object.out_id_serv}</Text>
                                        ) : null
                                    }
                                </View>
                            </View>

                        </View>
                        );

                    if (object.out_cupon != '0.00' && object.out_cupon != null) {
                        obj_items_aux.push(
                            <View>
                                <Divider style={styles.row}></Divider>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 18, paddingLeft: 5 }}>{object.out_hora}</Text>
                                        ) : null
                                    }
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Bd', fontSize: 15, paddingLeft: 5, marginTop: 10 }}>${object.out_cupon} MXN</Text>
                                        ) : null
                                    }
                                </View>
                                <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                                    {
                                        this.state.fontLoaded ? (
                                            <Text style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Cupón</Text>
                                        ) : null
                                    }
                                </View>
                            </View>
                        );
                    }
                }else{
                    obj_items_aux.push(
                        <View key={"view_fecha_" + index} style={{ height: 25, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#D4D4D4' }}>
                            {
                                this.state.fontLoaded ? (
                                    <Text key={"text_fecha_" + index} style={{ fontFamily: 'Aller_Lt', fontSize: 15, paddingLeft: 5 }}>{object}</Text>
                                ) : null
                            }
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

    /**
     *
     *
     * @memberof TotalBalanceScreen
     */
    setInfoWS = () =>{
        return(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 400, height: 400 }}>
                    <Image
                        source= {require('./../resource/img/loading.gif')}
                        style= {styles.img}
                    />
                </View>);
    }

    /**
     *
     *
     * @returns
     * @memberof TotalBalanceScreen
     */
    render() {
        return (
            <View>
                { this.state.validateWS ? this.state.obj_items : this.setInfoWS() }
            </View>

        );
    }
}

//Estilos de diseño defenidos
const styles = StyleSheet.create({
    row: {
        height: 10,
        backgroundColor: "#f0f4f7"
    }
});