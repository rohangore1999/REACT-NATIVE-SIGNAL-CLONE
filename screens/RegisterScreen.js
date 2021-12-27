import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAvoidingView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image, Text } from "react-native-elements"
import { useLayoutEffect } from 'react';
import { auth } from '../firebase';



// as in App.js the screens are inside the NavigationContainer so we'll get navigation as props
const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    // to style headers which we have styled in App.js
    // we have to use useLayoutEffect; which is same as useEffect

    // and will change on Navigation of the page
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation])

    const register = () => {
        // here we are register the user with email and password
        // CreateUserWithEmailAndPassword return promis object "authUser" in that we also update users displayName, photoURL
        // if the photoURL is not present then update it with default image (imgUrl || "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png")
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imgUrl || "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"
                })
            }).catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />

            {/* In React Native we dont have h1 h2 h3 tag; so we can pass it as a props to Text tag- from react-native-elements */}
            <Text h4 style={{ marginBottom: 50, fontWeight: 'normal' }}>Create a Signal Account</Text>

            <View style={styles.inputContainer}>
                {/* input from react-native-elements */}
                <Input placeholder="Full Name" autofocus type="text" value={name} onChangeText={(text) => { setName(text) }} />

                <Input placeholder="Email" type="email" value={email} onChangeText={(text) => { setEmail(text) }} />

                <Input placeholder="Password" type="password" secureTextEntry value={password} onChangeText={(text) => { setPassword(text) }} />

                {/* onSubmitEditing allow us to submit if we hit enter; it will call regiter function */}
                <Input placeholder="Profile Picture Url (optional)" type="text" value={imgUrl} onChangeText={(text) => { setImgUrl(text) }} onSubmitEditing={register} />

            </View>

            {/* it will call register function onPress */}
            {/* raised is the style for button */}
            <Button title="Register" onPress={register} raised style={styles.button} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },

    inputContainer: {
        width: 300,

    },

    button: {
        width: 200,
        marginTop: 10,
    }
})
