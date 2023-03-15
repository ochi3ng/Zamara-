import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function DetailScreen({ route }) {
    const [loading, setLoading]= useState(false)
    const [user, setUser] = useState();
    const { userId } = route.params;
    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/users/${userId}`)
            .then((res) =>
                res.json().then((data) => {
                    setUser(data);
                   
                })
            )
            .catch((err) => console.log(err));
        setLoading(false)
    }, [userId]);
    return (
        <SafeAreaView style={styles.details}>
            <View style={styles.outerview}>
                <Text style={styles.zamara}>
                    ZAMARA APP
                </Text>
            </View>
            <View style={styles.outerview}>
                <View style={styles.moredetails}>
                    <Text style={styles.detailscontainer}>Welcome</Text>
                    <Text style={styles.detailsText}>{user?.firstName}</Text>
                </View>
                <View style={styles.Agedetails}>
                    <Text>
                        Your profile details is as below:
                    </Text>
                </View>
               {loading ? <Text>Loading ...</Text> : <>
                    <View style={styles.Agedetails}>
                        <Text style={styles.detailscontainer}>Age:</Text>
                        <Text style={styles.detailsText}>{user?.age}</Text>
                    </View>
                    <View style={styles.genderdetails}>
                        <Text style={styles.detailscontainer}>Gender:</Text>
                        <Text style={styles.detailsText}>{user?.gender}</Text>
                    </View>
                    <View style={styles.moredetails}>
                        <Text style={styles.detailscontainer}>Email:</Text>
                        <Text style={styles.emaildetails}>{user?.email}</Text>
                    </View>
                    <View style={styles.moredetails}>
                        <Text style={styles.detailscontainer}>Phone:</Text>
                        <Text style={styles.detailsText}>{user?.phone}</Text>
                    </View>
                    <View style={styles.moredetails}>
                        <Text style={styles.detailscontainer}>BirthDate:</Text>
                        <Text style={styles.detailsText}>{user?.birthDate}</Text>
                    </View>
                    <View style={styles.genderdetails}>
                        <Text style={styles.detailscontainer}>BloodGroup: </Text>
                        <Text style={styles.detailsText}>{user?.bloodGroup}</Text>
                    </View>
                    <View style={styles.genderdetails}>
                        <Text style={styles.detailscontainer}>Height: </Text>
                        <Text style={styles.detailsText}>{user?.height}</Text>
                    </View>
                    <View style={styles.genderdetails}>
                        <Text style={styles.detailscontainer}>weight: </Text>
                        <Text style={styles.detailsText}>{user?.weight}</Text>
                    </View>
                    <View style={styles.genderdetails}>
                        <Text style={styles.detailscontainer}>EyeColor:</Text>
                        <Text style={styles.detailsText}> {user?.eyeColor}</Text>
                    </View></>}

            </View>
        </SafeAreaView>
    )
}

export default DetailScreen;

const styles = StyleSheet.create({
    outerview: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 16,
        width: 350
    },
    details: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        justifyContent: 'center',
    },
    moredetails: {
        color: 'white',
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    detailscontainer: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    detailsText: {
        fontSize: 17,
        marginLeft: 3
    },
    Agedetails: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    genderdetails: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    zamara: {
        fontSize: 50
    },
    emaildetails: {
        fontSize: 17,
        marginLeft: 3,
        textDecorationLine: 'underline',
        textDecorationColor: 'red',
    }

})