import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { StatusBar } from 'expo-status-bar';


const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([])

    useEffect(() => {
        // it will to our db inside chats >> collection >> Snapshot (return realtime data)
        // remember that we have define chats as an array so it will get append in chats array/lists
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubscribe //to clean after running; so that not to stay in our memory
    }, [])
    // no dependency as we want to connect to db on first mount


    // when we click on header avatar, it will signout and replace the home page with login, because we dont want back button functionality so we replace the page from stack

    // and as we are signing out using "auth.signOut()" so in Login page useEffect will not work because of auth.signOut()
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }

    // useLayoutEffect >>> to customize the headers.
    // useLayoutEffect >>> also we can give our custom styling for headerLeft we have view component avatar with touableopacity will give feedback

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",

            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),

            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}>

                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>

                </View>
            ),
        })
    }, [navigation])
    // entire useEffect is dependent on navigation; when navigation change the useEffect will run


    // enterChat will take the id and the chatName >>> which we get from CustomListItem
    // id will be the particular chat
    // chatName will be the room name

    const enterChat = (id, chatName) =>{
        navigation.navigate('Chat', {
            id:id,
            chatName:chatName
        })
    }

    return (
        // SafeAreaView will take care of phone's cut outs area.
        <SafeAreaView>
            <StatusBar style="auto"/>
            <ScrollView style={styles.container}>
                {/* taking from the components; so that we can reuse it */}
                {/* destructuring the chats array and passing it as id and form data getting chatname */}
                {/* enterChat we are passing the function as a props */}
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height: "100%",
    }
})
