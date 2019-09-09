// In App.js in a new project

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import TopTemplate from './TopTemplate';

export default class WalletScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    static navigationOptions = {
        title: 'Mi Billetera'
    };

    render() {
        return (
            <View>
                <ScrollView style={{marginBottom: 75}}>

                    <TopTemplate></TopTemplate>
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
                                <Text style={{ fontSize: 10 }}>27 de ago - 1 de sep</Text>
                                <Text style={{ fontSize: 20 }}>$5100.00 MXN</Text>
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Balance")}>
                        <View style={{
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            padding: 5
                        }}>

                            <View>
                                <Text style={{ fontSize: 15 }}>Balance</Text>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 15 }}>$4000.00 MXN</Text>
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
                            <Text style={{ fontSize: 15 }}>$1000.00 MXN</Text>
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
                            <Text style={{ fontSize: 15 }}>$100.00 MXN</Text>
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
                            <Text>27/08/2019</Text>
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
                            <Text>2</Text>
                            <Text>Viajes</Text>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 80,
                            width: 200
                        }}>
                            <Text>10:55</Text>
                            <Text>Tiempo conectados</Text>
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
                            <Text>Ganancias del día</Text>
                        </View>

                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>$155 MXN</Text>
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
                            <Text>$20.00 MXN</Text>
                            <Text>Cuota de servicio MiGo</Text>
                        </View>

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 80,
                            width: 200
                        }}>
                            <Text>$15.00 MXN</Text>
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
    }
});