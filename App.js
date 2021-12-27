import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';

// it will hold all screens
const Stack = createNativeStackNavigator()

// global styles
const globalScreenOptions = {
  // setting header background-color to #2C6BED
  headerStyle: { backgroundColor: "#2C6BED" },

  // header title font color to white
  headerTitleStyle: { color: "white" },

  // any icons which are in header to white
  headerTintColor: "white",

  headerTitleAlign: 'center',
}

export default function App() {
  return (
    // react navigation works similar to react router
    <NavigationContainer>
      {/* globalScreenOptions is the styles which we need to give to all screens */}
      <Stack.Navigator screenOptions={globalScreenOptions}>
        {/* First Page : LoginScreen */}
        {/* here pages are in stack structure: name of the stack is Login */}
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='AddChat' component={AddChatScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
