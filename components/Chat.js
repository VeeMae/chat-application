import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native';
import { Bubble, Day, GiftedChat, SystemMessage } from 'react-native-gifted-chat';

export default class Chat extends Component {
  constructor(props) {
        super(props);
        this.state = {
            // text: ''
            messages: []
        };
  }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: `${this.props.route.params.name} has entered the chat!`,
                    createdAt: new Date(),
                    system: true,
                },
            ],
        })
    }

    // Sending a message function
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    // Styles for the message bubbles
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    },
                    left: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        )
    }

    // Styles for the date displayed above the messages
    renderDay = props => {
        return (
            <Day
                {...props}
                containerStyle={{
                    marginBottom: 15,
                    backgroundColor: '#fff',
                    width: '25%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 10
                }}
                textStyle={{
                    color: '#000',
                    fontSize: 14
                }}
            />
        )
    }

    // Styles for the system message
    renderSystemMessage = props => {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                    backgroundColor: '#fff',
                    width: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 10
                }}
                textStyle={{
                    fontSize: 14,
                    color: '#000'
                }}
            />
        )
    }

    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        return (

            <View
                style={{
                    flex: 1,
                    backgroundColor: this.props.route.params.bgColor,
                }}
            >
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderSystemMessage={this.renderSystemMessage}
                    renderDay={this.renderDay}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id:1,
                    }}
                />

                {/* Fix keyboard covering message input field */}
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>

        );
    }
}