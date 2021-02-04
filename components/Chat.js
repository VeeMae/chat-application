import React, { Component } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform, Text, LogBox } from 'react-native';
import { Bubble, Day, GiftedChat, SystemMessage, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            uid: 0,
            loggedInText: 'Please wait while we fetch your data...',
            isConnected: false,
            image: '',
            location: ''
        };

        LogBox.ignoreAllLogs();

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

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
            console.log(error.message);
        }
    };

    async deleteMessages() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (error) {
            console.log(error.message);
        }
    }


    componentDidMount() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });

        // Get updates about the network state
        NetInfo.addEventListener(connection => {
            const isOnline = connection.isConnected;
            if (isOnline == true) {
                this.setState({
                    isConnected: true
                })
            } else {
                this.setState({
                    isConnected: false
                })
            }
        });

        // Checks for a connection and outputs one of 2 results: online or offline usability
        NetInfo.fetch().then(connection => {
            if (connection.isConnected == true) {

                this.setState({
                    isConnected: true
                });

                // Upon loading, check whether the user is signed in. If not, create a new user.
                this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                    if (!user) {
                        await firebase.auth().signInAnonymously();
                    }
                    this.setState(
                        {
                            user: {
                                _id: user.uid,
                                avatar: 'https://placeimg.com/140/140/any',
                                name
                            },
                            messages: [],
                            loggedInText: `${this.props.route.params.name} is now in the chat room`
                        }
                    );

                    // Reference to the active user's messages
                    this.referenceChatUser = firebase.firestore().collection('messages');
                    // listen for collection changes for current user
                    this.unsubscribeChatUser = this.referenceChatUser.orderBy('createdAt', 'desc').onSnapshot(this.onCollectionUpdate);
                });
            } else {
                this.setState({
                    isConnected: false
                })
                // Keeps previous messages in view, but does not allow for sending new messages
                this.getMessages();
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeChatUser();
        this.authUnsubscribe();

    };


    // Retrieves the current data in messages collection and stores it in the messages state, allowing the data to be rendered in the view.
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            messages.push({
                _id: data._id,
                createdAt: data.createdAt.toDate(),
                text: data.text,
                user: data.user,
                image: data.image || null,
                location: data.location || null
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
            uid: this.state.uid,
            image: messages.image || null,
            location: messages.location || null
        })
    }


    // Sending a message function
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
                this.addMessage();
                this.saveMessages();
        });
    }

    // Change how the input bar is rendered
    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
            return (
                <InputToolbar {...props}/>
            );
        }
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

    renderCustomActions = (props) => {
        return <CustomActions {...props} />;
    };

    renderCustomView (props) {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{width: 150,
                    height: 100,
                    borderRadius: 13,
                    margin: 3
                    }}
                    showsUserLocation={true}
                    region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
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
                <Text style={styles.systemText}>{this.state.loggedInText}</Text>
                <GiftedChat
                    renderBubble={this.renderBubble}
                    renderSystemMessage={this.renderSystemMessage}
                    renderDay={this.renderDay}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    renderActions={this.renderCustomActions}
                    renderCustomView={this.renderCustomView}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={this.state.user}
                    renderUsernameOnMessage={true}
                    image={this.state.image}
                />

                {/* Fix keyboard covering message input field */}
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    systemText: {
        backgroundColor: '#fff',
        fontSize: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 2
    }
})