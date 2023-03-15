
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [name, onNameChange] = useState();
    const [password, onPasswordChange] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const LoginFunction = () => {
        setLoading(true);
        fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: name,
                password: password,
            }),
        })
            .then((res) =>
                res.json().then((data) => {
                    setLoading(false);
                    if (data.token !== undefined) {
                        setError(false);
                        AsyncStorage.setItem("sessionToken", JSON.stringify(data.id));
                        navigation.push("details", {userId: data.id, name:name});
                        return;
                    }
                    setError(true);

                }) 
            )
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    return (
        <SafeAreaView style={styles.headerContainer}>
            {loading ? (
                <Text style={styles.loading}>Loading ...</Text>
            ) : (
                    <View>
                        <View style={styles.logo}>
                            <Image
                                source={require('../assets/zamaralogo.png')}
                            />
                        </View>
                        <View style={styles.bodyContainer}>

                            <Text style={styles.header}>Hello Again!</Text>
                            <Text style={styles.text}>Welcome back to Zamara</Text>
                            <View style={styles.inputs}>
                                <TextInput value={name} onChangeText={onNameChange} style={styles.container} placeholder='Enter username' />
                                <TextInput value={password} onChangeText={onPasswordChange} style={styles.container} placeholder='Password'
                                    secureTextEntry={true} />
                                {error && <Text style={styles.Invalid}> You entered invalid credentials</Text>}
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.signIn} onPress={LoginFunction}>Sign In</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
            )}
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: 'whitesmoke',
        width: 380,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 500
    },

    headerContainer: {
        flex: 1,
        backgroundColor: 'rgb(31,31,61)',
        alignItems: 'center',
        justifyContent: 'center',

    },

    header: {

        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
    },
    container: {
        backgroundColor: 'rgb(255,255,255)',
        marginBottom: 15,
        width: 300,
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
        paddingLeft: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: 'rgb(31,31,61)',
        height: 60,
        width: 300,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        marginTop: 50
    },
    signIn: {
        color: 'white',
        textAlign: 'center'
    },
    logo: {
        paddingTop: 270,
        marginBottom: 20,
        marginLeft:70,
    },
    inputs: {
        alignItems: 'center'
    },
    Invalid: {
        color: 'red',
        fontSize: 12,
        marginRight: 120
    },
    loading:{
        color: 'white'
    }

});
