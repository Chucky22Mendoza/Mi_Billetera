import React from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Divider } from 'react-native-elements';
import * as Font from 'expo-font';

/**
 *
 *
 * @export
 * @class ExtraTemplate
 * @extends {React.Component}
 *
 */
export default class ExtraTemplate extends React.Component {
    constructor(props) {
        super(props);
        //Variables globales
        this.state = {
            switchValue: true,
            fontLoaded: false,
        };
    }

    /**
     *
     *
     * @memberof ExtraTemplate
     */
    async componentDidMount(){
        await Font.loadAsync({
            'Aller_Lt': require('./../assets/fonts/Aller_Lt.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    /**
     *
     *
     * @memberof ExtraTemplate
     */
    test = () => {
        alert("This is a test", "Hola");
    };

    /**
     *
     *
     * @returns
     * @memberof ExtraTemplate
     */
    render() {
        return (
            <View>

                <Divider style={styles.row}></Divider>

                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', height:60 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Switch value={ this.state.switchValue } onValueChange={( switchValue ) => this.setState({ switchValue })}/>
                        {
                            this.state.fontLoaded ? (
                                <Text style={{ fontFamily: 'Aller_Lt', fontSize: 20 }}>{this.state.switchValue ? 'Conectado' : 'Desconectado'}</Text>
                            ) : null
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon
                            name='exclamation-circle'
                            size={40}
                            onPress={this.test}
                            style={{
                                marginRight: 5,
                                color: '#ff8834'
                            }}
                        />
                        <Icon
                            name='question-circle'
                            size={40}
                            onPress={this.test}
                            style={{
                                marginRight: 5,
                                color: '#ff8834'
                            }}
                        />
                        <Icon
                            name='cog'
                            size={40}
                            onPress={this.test}
                            style={{
                                marginRight: 20,
                                color: '#ff8834'
                            }}
                        />
                    </View>
                </View>
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
