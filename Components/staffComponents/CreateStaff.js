import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { base_url } from "../../const";
import { useNavigation } from "@react-navigation/native";

const CreateStaff = () => {
    const [name, onNameChange] = useState();
    const [number, onNumberChange] = useState();
    const [email, onEmailChange] = useState();
    const [department, onDepartmentChange] = useState();
    const [salary, onChangeSalary] = useState()
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigation = useNavigation()
    const createUser = () => {
        
        setLoading(true);
        fetch(base_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                number: number,
                email: email,
                department: department,
                salary: salary
            }),
        })
            .then((res) =>
                res.json().then((data) => {
                    setLoading(false);
                    navigation.navigate('home')
                })
            )
            .catch(() => {
                setLoading(false);
            });
    };
    return (
        <View>
            {loading ? (
                <Text>Submiting Please wait...</Text>
            ) : (
                <View >
                    <View style={styles.inercontainer}>
                        <View>
                            <Text style={styles.number}>Staff Name</Text>
                            <TextInput style={styles.numberinput} value={name} onChangeText={onNameChange} placeholder="Staff name" />
                        </View>
                        <View style={styles.display}>
                            <View style={styles.displaycontainer}>
                                <Text>Staff number</Text>
                                <TextInput style={styles.input} placeholder="Staff number" value={number} onChangeText={onNumberChange} keyboardType="numeric" />
                            </View>
                            <View style={styles.displaycontainer}>
                                <Text>Staff email</Text>
                                <TextInput style={styles.input} placeholder="Staff Email" value={email} onChangeText={onEmailChange} keyboardType="email-address" />
                            </View>
                        </View>
                        <View style={styles.display}>
                            <View style={styles.displaycontainer}>
                                <Text>Department</Text>
                                <TextInput style={styles.input} placeholder="Department" value={department} onChangeText={onDepartmentChange} />
                            </View>
                            <View style={styles.displaycontainer}>
                                <Text>Salary</Text>
                                <TextInput style={styles.input} placeholder="Salary" value={salary} onChangeText={onChangeSalary} keyboardType="numeric" />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.createbutton}>
                            <Text style={styles.createstaff} onPress={createUser}>CREATE STAFF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default CreateStaff;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(241,245,255)'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        width: '90%',
        marginBottom: 10,
    },
    numberinput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,


    },
    inercontainer: {
        backgroundColor: 'rgb(255,255,255)',
        height: 'auto',
        justifyContent: 'center',
        borderRadius: 15,
        marginLeft: 9,
        padding: 10,
        marginRight: 9
    },
    display: {
        flexDirection: 'row',
    },
    displaycontainer: {
        width: '50%',
    },
    createbutton: {
        backgroundColor: 'rgb(31,31,61)',
        height: 60,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        marginTop: 10
    },
    createstaff: {
        color: 'white',
        textAlign: 'center'
    },
})