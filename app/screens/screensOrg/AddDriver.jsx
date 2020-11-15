import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Button from "react-native-button";
import { Customization } from "../../config/Customization";
import firebase from "firebase";

export default function AddDriver() {
  const [name, setName] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  const [vehicleID, setVehicleID] = React.useState("");
  const database = firebase.database();

  const onPressAddDriver = () => {
    if (contactInfo.length == 11) {
      database.ref("Drivers/").push({
        driverName: name,
        driverContactInfo: contactInfo,
        driverVehicleInfo: vehicleID,
      });
    } else if (contactInfo.length > 11 || contactInfo.length < 11) {
      alert("Please enter 11-digits phone number.");
      return;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Add Driver</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Enter your full name"
          keyboardType="default"
          onChangeText={(text) => setName(text)}
          value={name}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="033xxxxxxxx"
          keyboardType="phone-pad"
          onChangeText={(text) => setContactInfo(text)}
          value={contactInfo}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Enter your vehicle information"
          keyboardType="default"
          onChangeText={(text) => setVehicleID(text)}
          value={vehicleID}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={onPressAddDriver}
      >
        Add Driver
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
    textAlign: "left",
    marginLeft: 20,
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
