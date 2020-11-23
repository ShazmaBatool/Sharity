import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Button from "react-native-button";
import firebase from "firebase";

import { Customization } from "../../config/Customization";

export default function SignUpDonor({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const database = firebase.database();
  const handleSignUp = async () => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (user) {
          console.log(user);
          if (user)
            database.ref("Users/" + "Donor").push({
              donorName: fullName,
              donorContactInfo: phone,
              donorEmail: email,
              donorPassword: password,
              donorGender: gender,
            });
        });
    } catch (error) {
      alert(error.toString());
      console.log("signUpWithEmail -> error", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create New Account</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Full Name as per CNIC"
          value={fullName}
          keyboardType="name-phone-pad"
          onChangeText={(text) => setFullName(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Phone Number e.g. 03xxxxxxxxx"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={(text) => setPhone(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail Address"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          keyboardType="default"
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Specify gender"
          secureTextEntry={true}
          value={gender}
          keyboardType="name-phone-pad"
          onChangeText={(text) => setGender(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Button
        containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
        style={styles.facebookText}
        onPress={handleSignUp}
      >
        Sign Up
      </Button>
      <Text
        style={styles.or}
        onPress={() => navigation.navigate("SignInDonor")}
      >
        Already have an account, Sign In here!
      </Text>
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
    marginTop: 10,
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
    backgroundColor: Customization.color.tint,
    borderRadius: Customization.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: Customization.color.white,
  },
});
