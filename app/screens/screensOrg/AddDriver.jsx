import React from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import Button from "react-native-button";
import { Customization } from "../../config/Customization";
import firebase from "firebase";

export default function AddDriver({ navigation }) {
  const [name, setName] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  const [vehicleID, setVehicleID] = React.useState("");
  const [error, setError] = React.useState({
    fullName: "",
    phone: "",
    vehicle: "",
  });

  const database = firebase.database();

  const onPressAddDriver = () => {
    if (contactInfo.length == 13) {
      database.ref("/Users/Driver").push({
        driverName: name,
        driverContactInfo: contactInfo,
        driverVehicleInfo: vehicleID,
      });
      setName("");
      setContactInfo("");
      setVehicleID("");
      Alert.alert("Driver added successfully!");
      navigation.navigate("Driver Details");
    } else if (contactInfo.length > 11 || contactInfo.length < 11) {
      Alert.alert("Please enter 11-digits phone number.");
      return;
    }
  };
  const validateUserName = (text) => {
    var letters = /^[A-Za-z\s]+$/;
    if (text === "") {
      setError({ fullName: "Name is required." });
    } else if (text.length < 4) {
      setError({ fullName: "Name must be greater than 3 characters." });
    } else if (text.length > 35) {
      setError({ fullName: "Name must be less than 35 characters." });
    } else if (!letters.test(text)) {
      setError({ fullName: "Input must contains alphabets only." });
    } else {
      setError({ fullName: "" });
      setName(text);
    }
    setName(text);
  };
  const validateVehicle = (text) => {
    if (text === "") {
      setError({ vehicle: "Vehicle is required." });
    } else if (text.length < 4) {
      setError({ vehicle: "Name must be greater than 3 characters." });
    } else if (text.length > 6) {
      setError({ vehicle: "Name must be less than 6 characters." });
    } else {
      setError({ vehicle: "" });
      setVehicleID(text);
    }
    setVehicleID(text);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Add Driver</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder='Enter name as per CNIC'
          keyboardType='default'
          onChangeText={(text) => validateUserName(text)}
          value={name}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <Text style={styles.error}>{error.fullName}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder='+923xxxxxxxxx'
          keyboardType='phone-pad'
          onChangeText={(text) => setContactInfo(text)}
          value={contactInfo}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder='Enter the assigned vehicle ID'
          keyboardType='default'
          onChangeText={(text) => validateVehicle(text)}
          value={vehicleID}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <Text style={styles.error}>{error.vehicle}</Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={onPressAddDriver}>
        Add Driver
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
  error: {
    marginRight: "auto",
    marginLeft: 70,
    color: Customization.color.errorText,
  },
});
