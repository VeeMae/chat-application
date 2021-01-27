import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';

export default class Chat extends Component {
  constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
  }

    alertMyText(input = []) {
        Alert.alert(input.text)
    }

    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: this.props.route.params.bgColor,
            }}>
                <Text style={styles.title}>
                    Have Fun Chatting!
                </Text>

                <TextInput
                    onChangeText={(text) => this.setState({ text })}
                    style={styles.textInput}
                    value={this.state.text}
                    placeholder='Type Here'
                >
                </TextInput>
                <View style={styles.buttonContainer}>
                    <Button
                        title='Submit'
                        onPress={() => { this.alertMyText({ text: this.state.text }) }}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10,
    },
    textInput: {
        height: 50,
        width: '90%',
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 50,
        padding: 10,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#fff',
    },
    buttonContainer: {
        margin: 10,
    }

})