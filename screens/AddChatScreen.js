import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome"
import { Button, Input, Image } from "react-native-elements"
import { db } from '../firebase'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native'



const AddChatScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            HeaderBackTitle: "Chats",

        })
    }, [navigation])
    // as we are using the navigation so we are using the navigation as a dependency

    // state to handle input 
    const [input, setInput] = useState("")

    // its an async function; it will wait for the response
    // it will go the chats db and add the chatName and the input which user give
    const createChat = async () => {
        await db.collection("chats").add({
            chatName: input,
        }).then(() => {
            navigation.goBack() // navigation.goBack() simply go back to Home page
        }).catch((error) => alert(error))
    }

    return (
        <SafeAreaView>
            <StatusBar style="light"/>
            <View style={styles.container}>
                {/* leftIcon >>> to get icon leftside of the input  */}
                {/* onSubmitEditing >>> when press enter then also it will submit */}
                <Input placeholder="Enter a chat name" onSubmitEditing={createChat} value={input} onChangeText={(text) => { setInput(text) }}
                    leftIcon={
                        <Icon name="wechat" type="antdesign" size={24} color={'black'} />
                    }
                />

                <Button disabled={!input} onPress={createChat} title="Create new Chat" />
            </View>
        </SafeAreaView>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    }
})
