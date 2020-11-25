import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "react-native-button";
import SyncStorage from "sync-storage";

import { Customization } from "../../config/Customization";
import { AuthContext } from "../../../context";
import firebase from "firebase";
import firebaseConfig from "../../../Firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function SignInDonor({ navigation }) {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  const [error, setError] = React.useState({
    phoneNumber: "",
    password: "",
  });

  // const database = firebase.database();
  const onPressLogin = async () => {
    if (!error.phoneNumber && !error.password) {
      try {
        await firebase
          .auth()
          .signInWithphoneNumberAndPassword(phoneNumber, password)
          .then(function (user) {
            SyncStorage.set("@userphoneNumber", user.user.phoneNumber);
            SyncStorage.set("@userPassword", password);
            signIn();
          });
      } catch (error) {
        console.log("loginUser -> error", error.toString());
      }
    } else {
      Alert.alert("Please enter the correct data.");
    }
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
  const validatePassword = (text) => {
    if (text === "") {
      setError({ password: "Password is required." });
    } else if (text.length < 6) {
      setError({ password: "Password must be greater than 6 characters." });
    } else {
      setError({ password: "" });
      setPassword(text);
    }
    setPassword(text);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Phone Number e.g. 03xxxxxxxxx"
          value={phoneNumber}
          keyboardType="phone-pad"
          onChangeText={(text) => validatePhoneNumber(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.phone}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          keyboardType="default"
          onChangeText={(text) => validatePassword(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.password}</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={onPressLogin}
      >
        Sign In
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        containerStyle={styles.facebookContainer}
        style={styles.facebookText}
        onPress={() => navigation.navigate("SignUpDonor")}
      >
        Don't have an account?
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
