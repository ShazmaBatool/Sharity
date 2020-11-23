// import React, { Component } from "react";
// import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
// import { Actions } from "react-native-router-flux";
// import axios from "axios";
// import { AsyncStorage } from "react-native";
// import Styles from "../Style/Style";
// import { LinearGradient } from "expo-linear-gradient";
// export default class DeleteAccount extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       User: "",
//       Password: "",
//     };
//   }
//   componentDidMount() {
//     if (this.props.client === "Student") {
//       Alert.alert(
//         "Delete Account",

//         "Do you Really want to Delete Account,                            Do you Forget Password?",
//         [
//           { text: "Yes", onPress: () => this.getdata() },
//           { text: "No", onPress: () => Actions.S_home() },
//         ],
//         { cancelable: false }
//       );
//     } else {
//       Alert.alert(
//         "Delete Account",

//         "Do you Really want to Delete Account,                            Do you Forget Password?",
//         [
//           { text: "Yes", onPress: () => this.getdata() },
//           { text: "No", onPress: () => Actions.T_home() },
//         ],
//         { cancelable: false }
//       );
//     }
//   }

//   getdata = async () => {
//     try {
//       const value = await AsyncStorage.getItem("User_Name");
//       if (value !== null) {
//         // We have data!!
//         this.setState({ User: value });
//         console.log("Session Value from Home", value);
//       }
//     } catch (error) {
//       alert("Error in session");
//     }
//     try {
//       const value1 = await AsyncStorage.getItem("Password");
//       if (value1 !== null) {
//         this.setState({ Password: value1 });
//         console.log("Session Value from Home", value1);
//       }
//     } catch (error) {
//       // Error retrieving data
//     }

//     if (this.props.client == "Student") {
//       const newTodo = {
//         User_Name: this.state.User,
//         Student_Password: this.state.Password,
//       };

//       axios
//         .post(
//           "http://192.168.8.103:4000/online_tutor_db/DeleteStudentAccount",
//           newTodo
//         )
//         .then(Actions.login());
//     }

//     if (this.props.client == "Teacher") {
//       const newTodo = {
//         User_Name: this.state.User,
//         Teacher_Password: this.state.Password,
//       };
//       alert(this.state.User);
//       axios
//         .post(
//           "http://192.168.8.103:4000/online_tutor_db/DeleteTeacherAccount",
//           newTodo
//         )
//         .then(Actions.login());
//     }
//   };

//   render() {
//     return <React.Fragment></React.Fragment>;
//   }
// }
