import React from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import Button from "react-native-button";
import SyncStorage from "sync-storage";

import { Customization } from "../../config/Customization";
import { AuthContext } from "../../../context";
import firebase from "firebase";
import firebaseConfig from "../../../Firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function SignInDriver({ navigation }) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [error, setError] = React.useState({
    phoneNumber: "",
    password: "",
  });
  const database = firebase.database();
  const { signIn } = React.useContext(AuthContext);
  const onPressLogin = () => {
    database
      .ref("/Users/Driver/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        var driverArray = result.filter((object) => {
          return object.driverContactInfo === phoneNumber;
        });
        if (driverArray.length === 0) {
          Alert.alert(
            "No phone number match with record please contact your Organization."
          );
        } else {
          signIn();
          SyncStorage.set("@driverPhone", phoneNumber);
        }
      })
      .catch(function (error) {
        Alert.alert(error.toString());
      });
  };
  const validatePhoneNumber = (text) => {
    if (text === "") {
      setError({ phoneNumber: "Phone number is required." });
    } else if (text.length !== 11) {
      setError({ phoneNumber: "Phone must be 11 digits." });
    } else if (/^\d{10}$/) {
      setError({ phoneNumber: "Phone must be 11 digits." });
    } else {
      setError({ phoneNumber: "" });
      setPhone(text);
    }
    setPhoneNumber(text);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder='Phone Number e.g. 03xxxxxxxxx'
          value={phoneNumber}
          keyboardType='number-pad'
          onChangeText={(text) => validatePhoneNumber(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <Text style={styles.error}>{error.phone}</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={onPressLogin}>
        Sign In
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  or: {
    color: "black",
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: Customization.fontSize.title,
    fontWeight: "bold",
    color: Customization.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "center",
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: Customization.fontSize.content,
    color: Customization.color.text,
  },
  loginContainer: {
    width: Customization.buttonWidth.main,
    backgroundColor: Customization.color.tint,
    borderRadius: Customization.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: Customization.color.white,
  },
  placeholder: {
    fontFamily: Customization.fontName.text,
    color: "red",
  },
  InputContainer: {
    width: Customization.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Customization.color.grey,
    borderRadius: Customization.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: Customization.color.text,
  },
  facebookContainer: {
    width: Customization.buttonWidth.main,
    backgroundColor: Customization.color.facebook,
    borderRadius: Customization.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: Customization.color.white,
  },
  error: {
    marginRight: "auto",
    marginLeft: 70,
    color: Customization.color.errorText,
  },
});
