import { View, Text,TextInput,StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const StaffDetailScreen=() =>{
  return (
      <View style={styles.container}>
            <View style={styles.inercontainer}>
                <View>
                    <Text style={styles.number}>STAFF NUMBER</Text>
                  <TextInput style={styles.numberinput} placeholder="Staff Number" keyboardType="numeric" />
                </View>
                <View style={styles.display}>
                  <View style={styles.displaycontainer}>
                        <Text>STAFF NAME</Text>
                      <TextInput style={styles.input} placeholder="Staff Name" />
                    </View>
                  <View style={styles.displaycontainer}>
                    <Text>STAFF Email</Text>
                      <TextInput style={styles.input} placeholder="Staff Email" keyboardType="email-address" />
                  </View>
                </View>
              <View style={styles.display}>
                  <View style={styles.displaycontainer}>
                    <Text>Department</Text>
                      <TextInput style={styles.input} placeholder="Department" />
                  </View>
                  <View style={styles.displaycontainer}>
                    <Text>Salary</Text>
                      <TextInput style={styles.input} placeholder="Salary" keyboardType="numeric" />
                  </View>
                </View>
              <TouchableOpacity style={styles.createbutton}>
                  <Text style={styles.createstaff}>CREATE STAFF</Text>
              </TouchableOpacity>
            </View>
            
      </View>
  )
}

export default StaffDetailScreen

const styles = StyleSheet.create({
container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgb(241,245,255)'
},
input:{
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    width:'90%',
    marginBottom: 10,  
},
    numberinput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
     
    
    },
    inercontainer:{
        backgroundColor:'rgb(255,255,255)',
        height:'60%',
        justifyContent:'center',
        borderRadius:15,
        marginLeft:9,
        padding:10,
        marginRight:9
    },
    display:{
        flexDirection:'row', 
    },
    displaycontainer:{
        width:'50%',
    },
    createbutton:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 9,
        padding: 10,
        width: '39%',
        color:'white',
        backgroundColor: 'rgb(31,31,61)',
        marginLeft:200,
    },
    createstaff: {
        color: 'white',
        textAlign: 'center'
    },
})