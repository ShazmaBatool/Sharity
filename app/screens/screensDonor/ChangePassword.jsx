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
// import admin from "firebase-admin";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Screen from "../../common/Screen";
import { Customization } from "../../config/Customization";

export default function ChangePassword({ navigation }) {
  const [password, setPassword] = React.useState("");
  const [changePassword, setChangePassword] = React.useState("");

  const handleSubmit = () => {
    var user = firebase.auth().currentUser;
    user

      .then(function () {
        // Update successful.
        Alert.alert("Updated successfully!");
        navigation.navigate("Settings");
      })
      .catch(function (error) {
        // An error happened.
        Alert.alert(error.toString());
      });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.titleBar}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="#52575D"
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ alignSelf: "left", marginTop: 15 }}>
        <View style={styles.action}>
          <FontAwesome name="key" color="#bb2265" size={20} />
          <TextInput
            placeholder="Please enter your current password"
            placeholderTextColor="#666666"
            keyboardType="visible-password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCorrect={false}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Set new password"
            placeholderTextColor="#666666"
            keyboardType="visible-password"
            value={changePassword}
            onChangeText={(text) => setChangePassword(text)}
            autoCorrect={false}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Confirm new password"
            placeholderTextColor="#666666"
            keyboardType="visible-password"
            value={changePassword}
            onChangeText={(text) => setChangePassword(text)}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
      </View>

      <View
        style={{
          margin: 20,
        }}
      >
        <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
          <Text style={styles.submitButton}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Screen>
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
    marginTop: 24,
    marginHorizontal: 16,
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
    marginTop: Platform.Any === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
