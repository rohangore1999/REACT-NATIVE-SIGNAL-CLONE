import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from "react-native-elements"
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {

    // defining state to store data
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIn = () => {
        // it will authenticate if the user's email is correct or not.
        // if corrent, then we dont need to handle as our useEffect will take that if logged in the redirect to Home screen.
        // so we only need to handle the error part.
        auth.signInWithEmailAndPassword(email,password).catch((error)=> alert(error.message))
    }

    // this useEffect will run one time when the login page get load.

    // it will check if the user is present in the firebase if present it will redirect to Home page.

    // here we are using navigation.replace means when we logged in after that we dont want to have back button so we are replacing. If we do navigation.navigate then in that we are having back button functionality.

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            console.log("authUser >>>", authUser)
            if (authUser){
                navigation.replace("Home")
            }
        })
        // its a clean up fucntion. it will clean the useEffect after executing to get free memory.
        return unsubscribe
    }, [])


    return (
        // instead of view we are using "KeyboardAvoidingView" so that when we click on input field the keyboard should move the content upward this is because of behavior="padding"
        <KeyboardAvoidingView style={styles.container}>
            {/* it will make status of our phone(battery status, range etc visible(dark/light) )  */}
            <StatusBar style='light' />

            <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/56/Logo_Signal..png" }} style={{ width: 200, height: 200 }} />

            {/* adding style component (inputContainer) to View tag */}
            <View style={styles.inputContainer}>
                {/* autoFocus will focus to that element as soon as page gets load */}
                {/* In react we use onChange; but here we have onChangeText which return text and that we ca n directly set to our useState */}
                <Input placeholder="Email" autofocus type="email" value={email} onChangeText={(text) => setEmail(text)} />

                {/* secureTextEntry will enable to hide text while entering */}
                {/* In react we use onChange; but here we have onChangeText which return text and that we ca n directly set to our useState */}
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn}/>

            </View>
            {/* In Native we have byDefault all styles in Flex and also with the Flex Direction as columns */}

            {/* as Button is imported from "react-native-elements" so they are in some internal container so to define style component we have to use containerStyle instead of style */}

            {/* for Native we have onPress insteat of onClick */}
            <Button containerStyle={styles.button} onPress={signIn} title={"Login"} />

            {/* if we want to navigate to other page onPress; we have onPress={()=>navigation.navigate('Register')} and 'Register' came from App.js 'name' field */}
            <Button containerStyle={styles.button} title={"Register"} type='outline' onPress={()=>navigation.navigate('Register')} />

            {/* if the keyboard is touching after padding use below code */}
            {/* <View style={{ height:100 }} /> */}

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        // notice that we here it will align vertically center NOT horizontally.
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
