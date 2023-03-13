import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetailScreen from "./Components/DetailScreen";
import LogInScreen from "./Components/LogInScreen";
export default function App() {
    const [token, setToken] = useState();
    useEffect(() => {
        const getSessionToken = async () => {
            try {
                const sessionToken = await AsyncStorage.getItem("sessionToken");
                if (sessionToken !== null) {
                    setToken(sessionToken);
                }
            } catch (error) {
                console.log("Error while retrieving session token: " + error);
            }
        };
        getSessionToken();
    }, []);
    const stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <SafeAreaView style={{flex:1}}>
                <stack.Navigator initialRouteName={token ? "details" : "login"}>
                    <stack.Screen name="login" component={LogInScreen} options={{ headerShown: false }} />
                    <stack.Screen name="details" component={DetailScreen} options={{ headerShown: false }} />
                </stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}