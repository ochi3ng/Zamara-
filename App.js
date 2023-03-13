import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput,TouchableOpacity} from 'react-native';
// 192.168.0.114
export default function App() {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View >
        <Text style={styles.header}>Hello Again!</Text>
        <Text style={styles.text}>Welcome back you`ve been missed!</Text>
        <TextInput style={styles.container} placeholder='Enter username'/>
        <TextInput style={styles.container} placeholder='Password' />
        <TouchableOpacity>
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  headerContainer:{
    flex: 1,
    backgroundColor:
      'rgb(243, 237, 242)',
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
    fontSize:30
  },
  container: {
    backgroundColor: 'rgb(255,255,255)',
    marginBottom: 5,
    height:60,
    justifyContent: 'center',
    paddingLeft:10,
    borderRadius:10,
  },
  button:{
    backgroundColor:'rgb(253,107,104)',
    height:60,
    textAlign:'center',
    justifyContent:'center',
    borderRadius:11,
    color:'white',
  }
 
});
