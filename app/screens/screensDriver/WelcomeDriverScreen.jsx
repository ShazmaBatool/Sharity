import React from "react";
import Button from "react-native-button";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import firebase from "firebase";

import { Customization } from "../../config/Customization";

export default function WelcomeDriverScreen(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const database = firebase.database();

  React.useEffect(() => {
    database
      .ref("/UserType/")
      .once("value")
      .then(function (snapshot) {
        var result = snapshot.val();
        console.log("result", result.userType);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading == true) {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size="large"
        color={Customization.color.tint}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <Text style={styles.title}>Sign In as Driver</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => props.navigation.navigate("SignIn")}
      >
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
    marginBottom: 150,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  title: {
    fontSize: Customization.fontSize.title,
    // fontWeight: "bold",
    color: Customization.color.tint,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
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
  signupContainer: {
    width: Customization.buttonWidth.main,
    backgroundColor: Customization.color.white,
    borderRadius: Customization.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: Customization.color.tint,
    marginTop: 15,
  },
  signupText: {
    color: Customization.color.tint,
  },
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
