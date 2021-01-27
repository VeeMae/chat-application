import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bgColor: ''
        };
    }

    render() {

        return (
            <ImageBackground style={styles.imgBackground} resizeMode='cover' source={require('../assets/bgImg.png')}>
                <View
                    style={styles.container}
                    title='Chat App'
                >
                    <Text style={styles.title}>Welcome to the Chat App</Text>
                    <KeyboardAvoidingView
                        style={styles.box}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={styles.inputContainer}>
                            <TextInput
                            style={styles.textInput}
                                value={this.state.name}
                                onChangeText={(name) => this.setState({name})}
                            placeholder= 'Your Name'
                        />
                        </View>

                        <Text style={styles.text}>Choose Background Color:</Text>
                        <View style={styles.bgColorContainer}>
                            <TouchableOpacity
                                style={styles.circle1}
                                onPress={() => this.setState({bgColor: '#090C08'})}
                            >
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.circle2}
                                onPress={() => this.setState({ bgColor: '#474056' })}
                            >
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.circle3}
                                onPress={() => this.setState({bgColor: '#8A95A5'})}
                            >
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.circle4}
                                onPress={() => this.setState({bgColor: '#B9C6AE'})}
                            >
                            </TouchableOpacity>
                        </View>
                         {/* <Text>Chosen Color:</Text>
                         <View style={{
                                backgroundColor: this.state.bgColor,
                                borderWidth: 1,
                                borderColor: '#2A323C',
                                borderRadius: 5,
                                width: 100,
                            height: 20,
                                marginTop: 10,
                            }}>
                        </View> */}
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text
                                style={styles.chatButton}
                                onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, bgColor: this.state.bgColor })}>Start Chatting
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
        </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFF',
        textAlign: 'center',
        marginTop: 10,
    },
    imgBackground: {
        flex: 1,
    },
    box: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 5,
        margin: 20,
        padding: 10,
        width: '88%',
        height: '43%',
        backgroundColor: '#fff',
        textAlign: 'left',
        position: 'absolute',
        bottom: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 20,
    },
    textInput: {
        height: 50,
        width: '90%',
        borderColor: '#2A323C',
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,

    },
    inputContainer: {
        flex: 0.3,
        width: '100%',
        marginBottom: 40,
    },
    bgColorContainer: {
        flex: 0.5,
        flexDirection: 'row',
        marginBottom: 20,
        marginLeft: 20,
    },
    circle1: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#090C08',
        marginRight: 10,
        marginTop: 10,
    },
    circle2: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#474056',
        marginRight: 10,
        marginTop: 10,
    },
    circle3: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#8A95A5',
        marginRight: 10,
        marginTop: 10,
    },
    circle4: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: '#B9C6AE',
        marginRight: 10,
        marginTop: 10,
    },
    chatButton: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        padding: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        backgroundColor: '#757083',
        width: '88%',
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 1,
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
    }



})