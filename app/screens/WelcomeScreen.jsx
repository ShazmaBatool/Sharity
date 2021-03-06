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
import { Picker } from "@react-native-community/picker";

import { Customization } from "../config/Customization";
import SplashScreen from "../screens/SplashScreen";

export default function WelcomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState("donor");
  const database = firebase.database();

  const handleClick = () => {
    if (user === "donor") {
      database.ref("UserType/").set({
        userType: user,
      });
      navigation.navigate("Donor");
    } else if (user === "org") {
      database.ref("UserType/").set({
        userType: user,
      });
      navigation.navigate("Org");
    } else {
      database.ref("UserType/").set({
        userType: user,
      });
      navigation.navigate("Driver");
    }
  };
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => null;
  }, []);
  if (isLoading == true) {
    return <SplashScreen />;
  }
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.title}>Welcome to Sharity</Text>
      {/* <Text style={styles.content}>Please Select One to Proceed</Text> */}
      <View style={styles.buttonContainer}>
        <Picker
          selectedValue={user}
          style={{ width: 170 }}
          onValueChange={(itemValue) => setUser(itemValue)}>
          <Picker.Item
            label='Donor'
            value='donor'
            color={Customization.color.tint}
          />
          <Picker.Item
            label='Organization'
            value='org'
            color={Customization.color.tint}
          />
          <Picker.Item
            label='Driver'
            value='driver'
            color={Customization.color.tint}
          />
        </Picker>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          title='NEXT'
          color={Customization.color.tint}
          onPress={handleClick}
        />
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
  // content: {
  //   fontSize: Customization.fontSize.content,
  //   // fontWeight: "bold",
  //   color: Customization.color.tint,
  //   marginTop: 20,
  //   textAlign: "center",
  //   marginBottom: 20,
  //   marginLeft: 20,
  //   marginRight: 20,
  // },
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
