import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import firebase from "firebase";

import { Customization } from "../config/Customization";
import { Picker } from "@react-native-community/picker";

export default function WelcomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState("donor");
  const database = firebase.database();

  const handleClick = () => {
    if (user === "donor") {
      database.ref("UserType/").set({
        userType: user,
      });
      navigation.replace("Donor");
    } else if (user === "org") {
      database.ref("UserType/").set({
        userType: user,
      });
      navigation.replace("Org");
    } else {
      database.ref("UserType/").set({
        userType: user,
      });
      navigation.replace("driver");
    }
  };
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  if (isLoading == true) {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size='large'
        color={Customization.color.tint}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.title}>Welcome to Sharity</Text>
      <View style={styles.buttonContainer}>
        <Picker
          selectedValue={user}
          style={{ width: 150 }}
          onValueChange={(itemValue) => setUser(itemValue)}>
          <Picker.Item label='Donor' value='donor' color='#000' />
          <Picker.Item label='Organization' value='org' color='#000' />
          <Picker.Item label='Driver' value='driver' color='#000' />
        </Picker>
        <Button title='Choose One' color='#000' onPress={handleClick} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Customization.fontSize.title,
    fontWeight: "bold",
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
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#01010abf",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
  tagline: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  guideline: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  logoContainer: {
    position: "absolute",
    alignItems: "center",
    top: 70,
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 50,
    width: "100%",
  },
});
