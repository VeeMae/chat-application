import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native';
import { Bubble, Day, GiftedChat, SystemMessage } from 'react-native-gifted-chat';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            uid: 0,
        };

        //   Initialize Firestore app and connect to Firestore database
        const firebaseConfig = {
            apiKey: "AIzaSyDj2Y5d5zyVS3w-wXxXgSm2XNeyQxunOL0",
            authDomain: "chat-application-3a279.firebaseapp.com",
            projectId: "chat-application-3a279",
            storageBucket: "chat-application-3a279.appspot.com",
            messagingSenderId: "596102069281",
            appId: "1:596102069281:web:9fb69415c26e5b2d6db760",
            measurementId: "G-STNKB9XG81",
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        this.referenceChatUser = null;

        //  Create a reference to Firestore database collection 'messages'. Stores and retrieves chat messages users send
        this.referenceChatMessages = firebase.firestore().collection('messages');
    }

    componentDidMount() {
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }
            this.setState(
                {
                    user: {
                        uid: user.uid,
                        avatar: 'https://placeimg.com/140/140/any'
                    },
                    messages: []
                }
            );

            this.referenceChatUser = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

            this.unsubscribeChatUser = this.referenceChatUser.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
        })

        this.setState({
            messages: [
                {
                    _id: 2,
                    text: `${this.props.route.params.name} has entered the chat!`,
                    createdAt: new Date(),
                    system: true,
                },
            ]
        })
    }

    componentWillUnmount() {
        this.unsubscribeChatUser();
        this.authUnsubscribe();

    };


    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                createdAt: data.createdAt.toDate(),
                text: data.text,
                user: data.user
            });
        });
        this.setState({
            messages
        });
    };


    // Adding messages to database
    addMessage() {
        const messages = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: messages._id,
            createdAt: messages.createdAt,
            text: messages.text,
            user: messages.user,
            uid: this.state.uid
        })
    }


    // Sending a message function
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            this.addMessage();
        });
    }

    // Styles for the message bubbles
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#556062'
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
                    width: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 5,
                    padding: 5
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
                    marginBottom: 30,
                    backgroundColor: '#fff',
                    width: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    borderRadius: 5,
                    padding: 5
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
                    renderBubble={this.renderBubble}
                    renderSystemMessage={this.renderSystemMessage}
                    renderDay={this.renderDay}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={
                        {
                            _id: this.state.uid,
                            name: this.props.route.params.name,
                            avatar: 'https://placeimg.com/140/140/any'
                        }
                    }
                />

                {/* Fix keyboard covering message input field */}
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>

        );
    }
}