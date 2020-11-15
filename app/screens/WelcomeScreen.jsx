import React from "react";
import Button from "react-native-button";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { Customization } from "../config/Customization";
import { Picker } from "@react-native-community/picker";

export default function WelcomeScreen(props) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState("");
  const handleClick = () => {
    if (user === "donor") {
      navigation.navigate("DonorScreen", { user });
    } else {
      navigation.navigate("OrgScreen", { user });
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
        size="large"
        color={Customization.color.tint}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>
      <Text style={styles.title}>Welcome to Sharity</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => props.navigation.navigate("SignIn")}
      >
        Sign In
      </Button>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => props.navigation.navigate("SignUp")}
      >
        Sign Up
      </Button>

      <View style={styles.buttonContainer}>
        <Picker
          selectedValue={user}
          style={{ height: 200, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setUser(itemValue)}
        >
          <Picker.Item label="Donor" value="donor" color="#fff" />
          <Picker.Item label="Organization" value="org" color="#fff" />
        </Picker>
        <Button title="Choose One" color="#fff" onPress={handleClick} />
      </View>
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
