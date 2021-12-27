import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { auth, db } from '../firebase'
import * as firebase from "firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
    // to store the data(messages) as an arrary
    const [chatMessages, setChatMessages] = useState([])

    // retriving the data from firebase database
    useEffect(() => {
       const unsubscribe =  db.collection('chats').doc(id).collection('message').orderBy("timestamp", 'desc').onSnapshot((snapshot) => setChatMessages(snapshot.docs.map((doc) => (doc.data()))))

    //    to clean afer getting data
       return unsubscribe
    })

    // console.log("chatMessages >>> ", chatMessages)
    /* OUTPUT
    chatMessages >>>  Array [
    Object {
        "displayName": "Elon Musk",
        "email": "em@gmail.com",
        "message": "hey",
        "photoURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/408px-Elon_Musk_2015.jpg",
        "timestamp": Object {
        "nanoseconds": 262000000,
        "seconds": 1640599812,
        },
    },
    */

    return (

        // when we click on any listitems it will send to the function the id and chatName
        <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>

            <Avatar rounded source={{ uri: chatMessages?.[0]?.photoURL || 'https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png' }} />

            {/* each chats */}
            <ListItem.Content>
                {/* title */}
                <ListItem.Title style={{ fontWeight: "800" }}>
                    {chatName}
                </ListItem.Title>

                {/* its subtitles */}
                {/* numberOfLines={1} >>> means atleast we have 1 line and after that '...' because of ellipsizeMode='tail' */}
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
