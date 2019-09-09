// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, Button, Switch, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import TopTemplate from './TopTemplate';

export default class TravelScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Ver viajes'
    };

    render() {
        return (
            <ScrollView>
                <View>
                    <TopTemplate></TopTemplate>
                    <View style={{
                        height: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#D4D4D4'
                    }}>
                        <Text style={{fontSize: 15, paddingLeft: 5}}>26/08</Text>
                    </View>
                    <Divider style={styles.row}></Divider>
                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>22:55</Text>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>$110.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'green',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de inicio</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'red',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de finalización</Text>
                        </View>
                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>22:30</Text>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>$115.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'green',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de inicio</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'red',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de finalización</Text>
                        </View>
                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>21:55</Text>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>$170.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 20, paddingLeft: 5, paddingTop: 5 }}>Extra</Text>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}> $20.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'green',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de inicio</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'red',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de finalización</Text>
                        </View>
                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                        height: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#D4D4D4'
                    }}>
                        <Text style={{fontSize: 15, paddingLeft: 5}}>25/08</Text>
                    </View>
                    <Divider style={styles.row}></Divider>
                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>21:55</Text>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>Cancelado por el cliente</Text>
                        </View>
                    </View>

                    <Divider style={styles.row}></Divider>

                    <View style={{
                    }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>21:30</Text>
                            <Text style={{ fontSize: 25, paddingLeft: 5 }}>$150.00 MXN</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'green',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de inicio</Text>
                        </View>
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row', margin: 5 }}>
                            <Icon
                                name='chevron-right'
                                size={15}
                                onPress={this.test}
                                style={{
                                    color: 'red',
                                    paddingLeft: 10
                                }}
                            />
                            <Text style={{ fontSize: 15, paddingLeft: 5 }}>Dirección de finalización</Text>
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
        justifyContent: 'center',
    },
    row: {
        height: 10,
        backgroundColor: "#f0f4f7"
    }
});
