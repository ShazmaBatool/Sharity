import React from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
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
  const [error, setError] = React.useState({
    email: "",
    password: "",
  });

  // const database = firebase.database();
  const onPressLogin = async () => {
    if (!error.email && !error.password) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(function (user) {
            // SyncStorage.set("@userphoneNumber", user.user.phoneNumber);
            // SyncStorage.set("@userPassword", password);
            signIn();
          });
      } catch (error) {
        Alert.alert(error.toString());
      }
    } else {
      Alert.alert("Please enter correct data.");
    }
  };
  const validateEmail = (text) => {
    if (text === "") {
      setError({ email: "email is required." });
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        text
      )
    ) {
      setError({ email: "Please enter valid email-address" });
    } else {
      setError({ email: "" });
      setEmail(text);
    }
    setEmail(text);
  };
  const validatePassword = (text) => {
    if (text === "") {
      setError({ password: "Password is required." });
    } else {
      setError({ password: "" });
      setPassword(text);
    }
    setPassword(text);
  };
  const forgotPassword = () => {
    var emailAddress = "arslanali4492@gmail.com";

    firebase
      .auth()
      .sendPasswordResetEmail(emailAddress)
      .then(function (res) {
        // Email sent.
        Alert.alert(
          "A password reset link has been sent to your email address"
        );
      })
      .catch(function (error) {
        // An error happened.
        Alert.alert(error.toString());
      });
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Enter email e.g. example@address.com"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => validateEmail(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.email}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
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
      <Text
        onPress={() => navigation.navigate("ForgotPassword")}
        style={styles.forgotPassword}
      >
        FORGOT YOUR PASSWORD?
      </Text>
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
    fontSize: Customization.fontSize.content,
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
    backgroundColor: Customization.color.white,
    borderRadius: Customization.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: Customization.color.tint,
  },
  error: {
    marginRight: "auto",
    marginLeft: 70,
    color: Customization.color.errorText,
  },
  forgotPassword: {
    marginBottom: 12,
    color: "#0000FF",
    borderBottomWidth: 1,
  },
});
