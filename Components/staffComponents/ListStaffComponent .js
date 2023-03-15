import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { base_url } from "../../const";
import { useNavigation } from "@react-navigation/native";
import  DeleteIcon  from "react-native-vector-icons/AntDesign";
import EditIcon from "react-native-vector-icons/AntDesign";

 import { useIsFocused } from '@react-navigation/native';
 
const Item = ({ item, setRefetch }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible]= useState(false);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     
       <View style={styles.containerlist}>
          <View style={styles.table}>
            <Text style={styles.headerText}>{item.name}</Text>
            <Text style={styles.headerText}>{item.number}</Text>
            <Text style={styles.headerText}>{item.email}</Text>
            <Text style={styles.headerText}>{item.department}</Text>
            <Text style={styles.headerText}>{item.salary}</Text>
            <View style={styles.icons}>
               <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text><EditIcon name="edit" /></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
              <Text><DeleteIcon name="delete" /></Text>
            </TouchableOpacity>
            </View>
          
          </View>
          <View style={styles.underline} />
       </View>
      
      <CustomeModal setModalVisible={setModalVisible} modalVisible={modalVisible} item={item} setRefetch={setRefetch}/>
      <DeleteModal setDeleteModalVisible={setDeleteModalVisible} modalVisible={deleteModalVisible} item={item} setRefetch={setRefetch} />
    </View>
  );
};

const ListStaffComponent = () => {
  const navigation= useNavigation()
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch]= useState(false)
   const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused){
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
        setRefetch(false)
    }
  
  }, [isFocused, refetch]);
  return (
    <View style={styles.containerv}>
      <View style={styles.createstaffbutton}>
      <TouchableOpacity style={styles.listbutton} onPress={()=> navigation.navigate('list')}>
          <Text style={styles.listtext}>
            List staff
          </Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.staffbutton} onPress={()=> navigation.navigate("create")}>
          <Text style={styles.createtext}>
            Create  staff
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
      <FlatList data={user} renderItem={({ item }) => <Item item={item} setRefetch={setRefetch}/>} keyExtractor={(item) => item._id} />
    </View>
  );
};

export default ListStaffComponent;

const CustomeModal = ({ setModalVisible, modalVisible, item, setRefetch }) => {
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
    setRefetch(true)
    setModalVisible(false);
    navigation.navigate("list");
  };
  const CancleUpdate =()=>{
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
      <View style={styles.containerk} >
      <View style={styles.inercontainer}>
          <View style={styles.updatetextcontainer}>
            <Text style={styles.update}>Update details for user </Text>
            <Text style={styles.updatetext}>{item.name}</Text>
        </View>
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
          <TouchableOpacity style={styles.cancelcreatebutton}>
            <Text style={styles.createstaff} onPress={CancleUpdate}>Cancel</Text>
          </TouchableOpacity>
      </View>
    </View>
    </Modal>
  );
};

const DeleteModal = ({ setDeleteModalVisible, modalVisible, item, setRefetch }) => {
  const navigation = useNavigation();
  const deleteUser = () => {
    fetch(`${base_url}/${item._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setRefetch(true)
    setDeleteModalVisible(false);
    navigation.navigate("list");
  };

  const CancelDelete =() =>{
    setDeleteModalVisible(false)
    navigation.navigate("list")
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        navigation.navigate("staff")
      }}
    >
      <View style={styles.containerr}>
        <View style={styles.textcontainer}>
          <Text style={styles.hellotext}>Hello </Text>
          <Text style={styles.name}>{item.name}, </Text>
        </View>
        <Text style={styles.deletettext}>are you sure you want to delete this staff?</Text>
        <View style={styles.Cancelbuttons}>
          <TouchableOpacity onPress={deleteUser}>
            <Text style={styles.confirm}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={CancelDelete}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerk: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'gray'
  },
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
    marginRight: 9,


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
    marginTop: 30
  

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
  },
  deletecontainer:{
   backgroundColor:'red'
  },
  confirm: {
    backgroundColor: 'blue',
    height: 40,
    width: 130,
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    paddingTop: 9,
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10

  },
  cancel: {
    backgroundColor: 'green',
    height: 40,
    width: 150,
    textAlign: 'center',
    color: 'white',
    paddingTop: 9,
    borderRadius: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 25,

  },
  hellotext: {
    fontSize: 25,
    color: 'white'
  },
  containerr:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'gray'
  },
  textcontainer: {
    flexDirection: 'row',
  },
  Cancelbuttons: {
    flexDirection: 'row',
  },
  deletettext: {
    color: 'white',
    marginBottom: 15
  },
  updatetext:{
    fontWeight: 'bold',
    fontSize: 20,
    color:'white'
  },
  update: {
    fontSize: 20,
    color: 'white'
  },
  updatetextcontainer:{
    flexDirection: 'row',
    backgroundColor: 'rgb(31,31,61)',
    padding:10
  },
  cancelcreatebutton:{
    backgroundColor: 'rgb(31,31,61)',
    height: 60,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    marginTop: 20
  }
})