import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList,Image,StyleSheet,TextInput,Button, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "@react-native-firebase/app";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

console.log("<<<<--- STARTING THIS APP --->>>>>");


function App() {
  const [Arr, setArr] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const renderMyDataItem = ({ item }) => {
    return (
      <View key={item.id} style={{ marginTop: 30, paddingHorizontal: 20,backgroundColor:'#ededed', marginHorizontal:20,paddingVertical:20 ,borderRadius:20,flex:1,flexDirection:'row' }}>
        <Image source={{uri:item.img}} style={{height:40,width:40,alignSelf:'center',borderRadius:10}} />
        <View style={{marginLeft:30,alignSelf:'center'}}>
        <Text style={{fontSize:22,fontWeight:'bold'}} >{item.name}</Text>
        <Text style={{fontSize:18}} >+92{item.no}</Text>
        </View>
        
      </View>
  
    );
  }

  useEffect(() => {

// -------------------------->>>>>>>>>>>>>>>>
// THIS CODE IS FIREBASE REALTIME TIME DATABASE DATA ACCESS____FIREBASE REALTIME_____>>>>>>>>
  //   AsyncStorage.getItem("myData_key").then((value) => {
  //     var testData = JSON.parse(value);
  //     if (testData == null) {
  //       console.log('--->>>> nul hai');
  //     const myData = firebase.database().ref("myData");
  //     myData.on("value", datasnap => {
  //       var getObj = datasnap.val();
  //        console.log('---> ',getObj);
  //         setArr(getObj);
  //         AsyncStorage.setItem("myData_key", JSON.stringify(getObj));

  //     })
  //     }
  //   else {
  //     setArr(JSON.parse(value));
  //     AsyncStorage.setItem("myData_key", JSON.stringify(getObj));
  //     console.log('Async Save ---> ',JSON.parse(value));

  //   }
  // })

  // -------------------------->>>>>>>>>>>>>>>>


  // ------------------------------------------------------------------------------------------
  // THIS CODE IS FIRESTORE DATA ACCESS________FIREBASE FIRESTORE_______>>>>
 let newArr = [];
  firestore()
  .collection('myData')
  .get()
  .then(querySnapshot => {
    console.log('data --->> ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      const data = documentSnapshot.data();
      newArr.push(data);
      console.log('hi>>>',newArr);
      setArr(newArr)
      
    });
  });
// ------------------------------------------------------------------------------------------
 
}, [])  // <<<<---- USEEFFECT END

// ------------------------------------------------------------------------------------------

// THIS CODE IS USER SIGN IN FUNCTIONALITY PEFORM___________SIGN IN___________>>>>>>>
// const signIn = ()=>{
//   auth()
//   .createUserWithEmailAndPassword(email,pass)
//   .then(() => {
//     console.log('User account created & signed in!');
//     alert('Login Successfully')
//   })
//   .catch(error => {
//     if (error.code === 'auth/email-already-in-use') {
//       console.log('That email address is already in use!');
//       Alert.alert('Already Use','in this email address is already exist!')
//     }

//     if (error.code === 'auth/invalid-email') {
//       console.log('That email address is invalid!');
//       alert('That email address is invalid!')
//     }
    
//     alert('email address is invalid!')
//     console.error(error);
//   });
// }

// ------------------------------------------------------------------------------------------


// THIS CODE IS USER LOGIN CONFIRMATION FUNCTIONALITY PERFORM__________USER LOGIN OR NOT LOGIN_____>>>
// const user = ()=>{
//   auth().onAuthStateChanged((user)=>{
//     if(user){
//       Alert.alert('Already Sign In')
//     }
//     else{
//       Alert.alert('Please Login!')
//     }
//   });
 
// }
// ------------------------------------------------------------------------------------------


// THIS CODE IS USER SIGNOUT FUNCTIONALITY PERFORM___________LOGOUT_________>>>>>>>
// const logout = () =>{
//   auth().signOut().then(()=> Alert.alert('Logout!'))
// }

// ------------------------------------------------------------------------------------------




  
  return (
    <>
    <View style={{backgroundColor:'red',marginHorizontal:40,marginTop:30,      paddingHorizontal:20,paddingVertical:10,alignItems:'center',borderRadius:10,}}>
      <Text style={{fontSize:20,color:'white'}}>Firebase Contact List</Text>
    </View>


    <View>
      <SafeAreaView>
        <FlatList
          data={Arr}
          renderItem={renderMyDataItem}
          keyExtractor={(item) => item.id}

        />
      </SafeAreaView>
    </View>

</>
  );

// return (
//   <View style={styles.container}>  
//     {/* <TextInput
//       style={styles.inputStyle}
//       placeholder="Name"
//       value={Arr}
//       onChangeText={(value) => setArr}
//     />       */}
//     <TextInput
//       style={styles.inputStyle}
//       placeholder="Email"
//       // value={'email'}
//       onChangeText={(vl) => setEmail(vl)}
//     />
//     <TextInput
//       style={styles.inputStyle}
//       placeholder="Password"
//       // value={pass}
//       onChangeText={(vl) => setPass(vl)}
//       maxLength={15}
//       secureTextEntry={true}
//     />   
//     <Button
//       color="#3740FE"
//       title="Signup"
//       onPress={() => signIn()}
//     />
//      {/* <Button style={styles.user}
//       color="#3740FE"
//       title="user"
//       // onPress={() => user()}
//     />
//      <Button style={{ marginTop:10 }}
//       color="#3740FE"
//       title="logout"
//       // onPress={() => logout()}
//     /> */}
//     <Text 
//       style={styles.loginText}
//       // onPress={() => this.props.navigation.navigate('Login')}
//       >
//       Already Registered? Click here to login
//     </Text>                          
//   </View>
// );
}



export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff',
    
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  user:{
    backgroundColor:'red',
  }
});


