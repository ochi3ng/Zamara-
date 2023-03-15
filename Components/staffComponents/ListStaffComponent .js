import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { base_url } from "../../const";
import { useNavigation } from "@react-navigation/native";
import  DeleteIcon  from "react-native-vector-icons/AntDesign";
import EditIcon from "react-native-vector-icons/AntDesign";
const Item = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
       <View style={styles.containerlist}>
          <View style={styles.table}>
            <Text style={styles.headerText}>{item.name}</Text>
            <Text style={styles.headerText}>{item.number}</Text>
            <Text style={styles.headerText}>{item.email}</Text>
            <Text style={styles.headerText}>{item.department}</Text>
            <Text style={styles.headerText}>{item.salary}</Text>
            <View style={styles.icons}>
              <Text><DeleteIcon name="delete" /></Text>
              <Text><EditIcon name="edit" /></Text>
            </View>
          
          </View>
          <View style={styles.underline} />
       </View>
      </TouchableOpacity>
      <CustomeModal setModalVisible={setModalVisible} modalVisible={modalVisible} item={item} />
      <DeleteModal setModalVisible={setModalVisible} modalVisible={modalVisible} item={item} />
    </View>
  );
};

const ListStaffComponent = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetch(base_url)
      .then((res) =>
        res.json().then((data) => {
          setLoading(false);
          setUser(data);
        })
      )
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <View style={styles.containerv}>
      <View style={styles.createstaffbutton}>
      <TouchableOpacity style={styles.listbutton}>
          <Text style={styles.listtext}>
            ListStaff
          </Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.staffbutton}>
          <Text style={styles.createtext}>
            createstaff
          </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.containe }>
 
        <Text style={styles.textContainer}>Name</Text>
        <Text style={styles.textContainer}>Number</Text>
        <Text style={styles.textContainer}>Email</Text>
        <Text style={styles.textContainer}>Department</Text>
        <Text style={styles.textContainer}>Salary</Text>
        <Text style={styles.textContainer}>Action</Text>
      
      </View>
      <FlatList data={user} renderItem={({ item }) => <Item item={item} />} keyExtractor={(item) => item._id} />
    </View>
  );
};

export default ListStaffComponent;

const CustomeModal = ({ setModalVisible, modalVisible, item }) => {
  const navigation = useNavigation();
  const [name, onNameChange] = useState(item.name);
  const [number, onNumberChange] = useState(item.number);
  const [email, onEmailChange] = useState(item.email);
  const [department, onDepartmentChange] = useState(item.department);
  const [salary, onChangeSalary] = useState(item.salary);
  const updateUser = () => {
    fetch(`${base_url}/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        number: number,
        email: email,
        department: department,
        salary: salary
      }),
    });
    setModalVisible(false);
    navigation.navigate("list");
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
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
          <Text style={styles.createstaff} onPress={updateUser}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Modal>
  );
};

const DeleteModal = ({ setModalVisible, modalVisible, item }) => {
  const updatUser = () => {
    fetch(`${base_url}/${item._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    navigation.navigate("list");
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      Delete modal
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(241,245,255)'
  },
  containerv:{
    flex: 1,
    justifyContent:'center'
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
  

  },
  createstaff: {
    color: 'white',
    textAlign: 'center'
  },
  table:{ 
    height: 60,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection:'row',
    backgroundColor: '#ccc',
    borderBottomRadius:"100",
  },

  headerText:{
    fontWeight: 'bold',
    fontSize: 10,
    width:60,
    height:'auto',
    alignItems:'center'
  },
  icons:{
    flexDirection:'row',
    width:'15%',
    fontSize:34,
    justifyContent:'space-between'
  },
  containe:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:"center",
    height:40,
    padding:10,
    backgroundColor: 'rgb(35,82,124)',
   
  },
  textContainer:{
    color:'white'
  },
  underline: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginTop: 5,
  },
  createstaffbutton:{
    flexDirection:'row',
    height:55,
    padding:10,
    alignItems: "center",
  },
  staffbutton:{
    backgroundColor:'blue',
    height: 40,
    width:90,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  listbutton: {
    backgroundColor: 'green',
    height: 40,
    width: 90,
    marginRight:5,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  listtext:{
    color:'white'
  },
  createtext: {
    color: 'white'
  }
})