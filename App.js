import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput,TouchableOpacity, Image} from 'react-native';
// 192.168.0.114
export default function App() {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.logo}>
          <Image
            source={require('./assets/zamaralogo.png')}
          />
      </View>
      <View style={styles.bodyContainer}>
      
          <Text style={styles.header}>Hello Again!</Text>
          <Text style={styles.text}>Welcome back to Zamara</Text>
         <View style={styles.inputs}>
          <TextInput style={styles.container} placeholder='Enter username' />
          <TextInput style={styles.container} placeholder='Password'
            secureTextEntry={true} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableOpacity>
         </View>
          <StatusBar style="auto" />
      
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  bodyContainer:{
    backgroundColor:'whitesmoke',
    width:380,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    height:500
  },

  headerContainer:{
    flex: 1,
    backgroundColor: 'rgb(31,31,61)',
    alignItems: 'center',
    justifyContent: 'center',

  },
 
  header: {

    fontSize:30,
    fontWeight:'bold',
    textAlign:'center'
  },
  text:{
    width:300,
    textAlign:'center',
    fontSize:30
  },
  container: {
    backgroundColor: 'rgb(255,255,255)',
    marginBottom: 15,
    width:300,
    alignItems:'center',
    height:60,
    justifyContent: 'center',
    paddingLeft:10,
    borderRadius:10,
  },
  button:{
    backgroundColor:'rgb(31,31,61)',
    height:60,
    width:300,
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center',
    borderRadius:11,
    marginTop:50
  },
  signIn: {
   color:'white',
   textAlign:'center'
  },
  logo:{
    paddingTop:300,
    marginBottom:20
  },
  inputs:{
  alignItems:'center'
  }
 
});
