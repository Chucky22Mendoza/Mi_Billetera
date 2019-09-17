import React from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';

export default class ExtraTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchValue: true
        };
    }

    test = () => {
        alert("This is a test", "Hola");
    };

    render() {
        return (
            <View>

                <Divider style={styles.row}></Divider>

                <View style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    height:60
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Switch value={ this.state.switchValue } onValueChange={( switchValue ) => this.setState({ switchValue })}/>
                        <Text style={{fontSize:20}}>{ this.state.switchValue ? 'Conectado' : 'Desconectado' }</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon
                            name='exclamation-circle'
                            size={40}
                            onPress={this.test}
                            style={{
                                marginRight: 5
                            }}
                        />
                        <Icon
                            name='question-circle'
                            size={40}
                            onPress={this.test}
                            style={{
                                marginRight: 5
                            }}
                        />
                        <Icon
                            name='cog'
                            size={40}
                            onPress={this.test}
                            style={{
                                marginRight: 20
                            }}
                        />
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
        height: 10,
        backgroundColor: "#f0f4f7"
    }
});
