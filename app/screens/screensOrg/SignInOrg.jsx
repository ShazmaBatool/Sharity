import React from "react";
import firebase from "firebase";
import Button from "react-native-button";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { Customization } from "../../config/Customization";
import { AuthContext } from "../../../context";
import firebaseConfig from "../../../Firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function SignInOrg() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  const database = firebase.database();
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });

  const onPressLogin = async () => {
    if (!error.email && !error.password) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async function (user) {
            signIn();
          });
      } catch (error) {
        Alert.alert(error.toString());
      }
    } else {
      Alert.alert("Please enter the correct data.");
    }
  };
  const validateEmail = (text) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+))|("[\w-\s]+")([\w-]+(?:\.[\w-]+)))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (text === "") {
      setError({ email: "email is required." });
    } else {
      setError({ email: "" });
      setEmail(text);
    }
    setEmail(text);
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
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder='E-mail Address'
          value={email}
          keyboardType='email-address'
          onChangeText={(text) => validateEmail(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <Text style={styles.error}>{error.email}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(text) => validatePassword(text)}
          value={password}
          keyboardType='default'
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <Text style={styles.error}>{error.password}</Text>
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
  },
  or: {
    fontFamily: Customization.fontName.main,
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
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
});
