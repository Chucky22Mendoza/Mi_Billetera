// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import TopTemplate from './TopTemplate';

export default class EarningScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Ganancias'
    };

    render() {
        return (
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                        <Text style={{
                            fontSize: 28,
                            padding: 10
                        }}>Ganancias</Text>
                        <View
                        style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: 28,
                                paddingTop: 5
                            }}>$5100.00</Text>
                            <Text style={{
                                fontSize: 21,
                                paddingTop: 10,
                                paddingRight: 10
                            }}> MXN</Text>
                        </View>
                    </View>
                    <Divider style={styles.row}></Divider>
                    <Image
                        style={{
                            width: 300,
                            height: 200,
                            marginLeft: 20,
                            resizeMode: 'cover'
                        }}
                        source={require('./../resource/img/graph.png')}
                    />
                    <Text style={{
                        textAlign: 'center',
                        height:25
                    }}>27/08 - 01/08</Text>
                    <Divider style={styles.row}></Divider>
                    <View style={{
                        height: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#D4D4D4'
                    }}>
                        <Text style={{fontSize: 15, paddingLeft: 5}}>27/08</Text>
                        <Text style={{fontSize: 15, paddingRight: 5}}>$185.00 MXN</Text>
                    </View>
                    <Divider style={styles.row}></Divider>
                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>23:59 Viaje</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Pago en efectivo</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>$120.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Cuota del servicio de MiGo</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>- $20.00 MXN</Text>
                        </View>
                    </View>
                    <Divider style={styles.row}></Divider>
                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>23:00 Viaje</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Pago online</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>$100.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Cuota del servicio de MiGo</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>- $15.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Cupón</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>$50.00 MXN</Text>
                        </View>
                    </View>
                    <Divider style={styles.row}></Divider>
                    <View style={{
                        height: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#D4D4D4'
                    }}>
                        <Text style={{fontSize: 15, paddingLeft: 5}}>26/08</Text>
                        <Text style={{fontSize: 15, paddingRight: 5}}>$1087.00 MXN</Text>
                    </View>
                    <Divider style={styles.row}></Divider>
                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>23:00 Viaje</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Pago online</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>$100.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Cuota del servicio de MiGo</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>- $15.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Cupón</Text>
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>$50.00 MXN</Text>
                        </View>
                    </View>
                    <Divider style={styles.row}></Divider>
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
