import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Button from "react-native-button";

import { Customization } from "../../config/Customization";
import { AuthContext } from "../../../context";
import firebase from "firebase";
import firebaseConfig from "../../../Firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function SignInDonor({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  const onPressLogin = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (user) {
          console.log(user);
          signIn();
        });
    } catch (error) {
      console.log("loginUser -> error", error.toString());
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder='E-mail or phone number'
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={onPressLogin}>
        Log in
      </Button>
      <Text style={styles.or}>OR</Text>
      <Button
        containerStyle={styles.facebookContainer}
        style={styles.facebookText}
        onPress={() => navigation.navigate("SignUpDonor")}>
        Don't have an account
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
});
