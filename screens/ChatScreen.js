import React, { useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { auth, db } from '../firebase'
import * as firebase from "firebase";


const ChatScreen = ({ navigation, route }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            // main title
            title: "Chat",

            // near back symbol title not visible
            headerBackTitleVisible: false,

            // the main title will align left
            headerTitleAlign: "left",

            // overwriting the headerTitle with Avatar and Text
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* in header it will show the recent message profile pic */}
                    <Avatar rounded source={{ uri: messages[0]?.data.photoURL || 'https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png'}} />

                    <Text style={{ color: "white", marginLeft: 10, fontWeight: '700' }}>{route.params.chatName}</Text>
                </View>
            ),

            // headerLeft: ()=>(
            //     <TouchableOpacity >
            //         <AntDesign name="arrowleft" size={24} color={'white'} />
            //     </TouchableOpacity>
            // )

            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20 }}>

                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color={'white'} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])
    // useLayoutEffect should update when navigation and message

    // mapping to text input
    const [input, setInput] = useState("")

    const sendMessage = () => {
        Keyboard.dismiss()

        // In db inside chats it will go to particular chatid(which we can give through route) >>> message and it will add firebase server timestamp, message which user type in input, displayName which we store early in authentication , email and photoURL
        db.collection("chats").doc(route.params.id).collection("message").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        });

        // clearing the input field
        setInput("")
    }


    // storing messages in an arrary
    const [messages, setMessages] = useState([])

    // to get messages from db and displaying it in screen we are using the useLayoutEffect because we have to depend on route(as we are passing the route.params.id to get into particular room
    useLayoutEffect(() => {
        // here it will go into chats > particular roomid > messages > orderBy desc > mapping realtime data using snapshot and appending it to setMessages arrary with id and data
        const unsubscribe = db.collection("chats").doc(route.params.id).collection('message').orderBy("timestamp", "desc").onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) =>
            ({
                id: doc.id,
                data: doc.data()
            }))))

        // cleaning function
        return unsubscribe
    }, [route])

    // console.log("messages >>> ", messages)
    // console.log("messages[0]?.data.photoURL >>> ",messages[0]?.data.photoURL)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} >
            <StatusBar style="light" />
            {/* is Platform is IOS then KeyboardAvoidingView will be padding else it will be height */}
            {/* we use keyboardAvoiding view because when the keyboard arrive it will move up with the keyboard */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                style={styles.container}
                keyboardVerticalOffset={90}
            >

                {/* when you click somewhere else it will dismiss the keyboard */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    {/* REACT fragment use because we have two components side by side */}
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {/* destructuring the message and taking id and data */}
                            {/* setting logic for sender and receiver as follows */}
                            {/* if in the data the mail is equal to the user who is logged in then it is the receiver; else sender */}

                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar size={30} rounded position="absolute" bottom={-15} right={-5} source={{ uri: data.photoURL }}
                                            // web
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5
                                            }}
                                        />
                                        <Text style={styles.receiverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar size={30} rounded position="absolute" bottom={-15} left={-5}
                                            source={{ uri: data.photoURL }}
                                            // web
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                left: -15
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>

                                    </View>
                                )
                            ))}
                        </ScrollView>

                        <View style={styles.footer} >
                            <TextInput placeholder='Signal Message' style={styles.textInput} value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={sendMessage}></TextInput>

                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name='send' size={24} color={"#2B68E6"}></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },

    textInput: {
        flex: 1,
        bottom: 0,
        height: 40,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },

    receiver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        // it will align itself to right end
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },

    receiverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    },

    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },

    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },

    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    }

})
