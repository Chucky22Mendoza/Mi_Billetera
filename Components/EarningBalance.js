// In App.js in a new project

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-elements';

export default class EarningBalanceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    render() {
        return (
            <View>
                <Divider style={styles.row}></Divider>

                <View style={{
                        height: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: '#D4D4D4'
                }}>
                    <Text style={{fontSize: 15, paddingLeft: 5}}>27/08</Text>
                </View>

                <Divider style={styles.row}></Divider>

                <View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>23:59:00</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>+ $85.00 MXN</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Viaje MiGo</Text>
                    </View>
                </View>

                <Divider style={styles.row}></Divider>

                <View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>23:00:00</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>+ $70.00 MXN</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Viaje MiGo</Text>
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
                </View>

                <Divider style={styles.row}></Divider>

                <View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>22:55:15</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>+ $110.00 MXN</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Viaje MiGo</Text>
                    </View>
                </View>

                <Divider style={styles.row}></Divider>

                <View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>22:40:15</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>+ $150.00 MXN</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Viaje MiGo</Text>
                    </View>
                </View>

                <Divider style={styles.row}></Divider>

                <View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 18, paddingLeft: 5, fontWeight: 'bold' }}>22:00:40</Text>
                        <Text style={{ fontSize: 15, paddingLeft: 5, marginTop: 10, fontWeight: 'bold' }}>+ $20.00 MXN</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 15, paddingLeft: 5, paddingTop: 2 }}>Extras</Text>
                    </View>
                </View>

                <Divider style={styles.row}></Divider>

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