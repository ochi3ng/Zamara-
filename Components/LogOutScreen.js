import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LogOutScreen = ({ route }) => {
    const { name, userId } = route.params;
    const navigation = useNavigation();
    const logOut = async () => {
        AsyncStorage.removeItem("sessionToken")
        navigation.navigate("login")
    };

    return (
        <View style={styles.container}>
          <View style={styles.textcontainer}>
                <Text style={styles.hellotext}>Hello </Text>
                <Text style={styles.name}>{name}, </Text>
          </View>
            <Text style={styles.Logouttext}>are you sure you want to log out ?</Text>
       <View style={styles.Cancelbuttons}>
                <TouchableOpacity onPress={logOut}>
                    <Text style={styles.confirm}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("staff")}>
                    <Text style={styles.cancel}>Cancel</Text>
                </TouchableOpacity>
       </View>
        </View>
    );
};

export default LogOutScreen;
const styles = StyleSheet.create({
    container: {
         flex: 1,
          justifyContent: "center",
           alignItems: "center" ,
        backgroundColor: 'gray'
},
    textcontainer:{
    flexDirection: 'row', 
    },
  name:{
    fontWeight:'bold',
    fontSize:25,

  } ,
  confirm:{
      backgroundColor:'blue',
    height: 40,
    width:130,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
      paddingTop: 9,
    justifyContent: 'center',
    marginRight:20,
    borderRadius:10

  },
  cancel:{
          backgroundColor: 'green',
          height: 40,
          width: 150,
          textAlign: 'center',
        color: 'white',
        paddingTop:9,
      borderRadius: 10
  } ,
    hellotext:{
        fontSize:25,
            color: 'white'
    },
    Cancelbuttons:{
        flexDirection:'row',
    

    },
    Logouttext:{
        color: 'white',
        marginBottom:15
    },

})