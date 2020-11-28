import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import firebase from "firebase";

import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Customization } from "../../config/Customization";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState({
    email: "",
  });

  const forgotPassword = async () => {
    if (!error.email) {
      try {
        await firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(function () {
            // Email sent.
            Alert.alert(
              "An email sent to your email address for password reset."
            );
          });
      } catch (error) {
        Alert.alert(error.toString());
      }
    } else {
      Alert.alert("Please enter the verified email address.");
    }
  };
  const validateEmail = (text) => {
    if (text === "") {
      setError({ email: "Email is required." });
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

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="#52575D"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#bb2265" size={20} />
          <TextInput
            placeholder="Email Address e.g. ...@gmail.com"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => validateEmail(text)}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <Text style={styles.error}>{error.email}</Text>
        <TouchableOpacity style={styles.commandButton} onPress={forgotPassword}>
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
  },

  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginHorizontal: 16,
    padding: 5,
  },

  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: Customization.color.tint,
    alignItems: "center",
    marginTop: 10,
  },

  submitButton: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,

    paddingLeft: 10,
    color: "#05375a",
  },
  error: {
    marginRight: "auto",
    marginLeft: 70,
    color: Customization.color.errorText,
  },
});
