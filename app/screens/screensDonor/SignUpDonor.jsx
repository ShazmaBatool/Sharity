import React from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import Button from "react-native-button";
import firebase from "firebase";
import RadioForm from "react-native-simple-radio-button";

import { Customization } from "../../config/Customization";

export default function SignUpDonor({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  // const [email, setemail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [error, setError] = React.useState({
    fullName: "",
    phone: "",
    // email: "",
    password: "",
  });

  const database = firebase.database();
  var radio_props = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];
  const handleSignUp = async () => {
    if (!error.fullName && !error.phone && !error.password) {
      let genderValue = "";
      if (gender == 0) {
        genderValue = "Male";
      } else {
        genderValue = "Female";
      }
      try {
        await firebase
          .auth()
          .createUserWithphoneAndPassword(phone, password)
          .then(function (user) {
            if (user)
              database.ref("Users/" + "Donor").push({
                donorName: fullName,
                donorContactInfo: phone,
                // donoremail: email,
                donorPassword: password,
                donorGender: genderValue,
              });
          });
      } catch (error) {
        Alert.alert(error.toString());
      }
    } else {
      Alert.alert("Please enter the correct data.");
    }
  };
  const validateFullName = (text) => {
    if (text === "") {
      setError({ fullName: "Name is required." });
    } else if (text.length < 3) {
      setError({ fullName: "Name must be greater than 3 characters." });
    } else if (text.length > 10) {
      setError({ fullName: "Name must be less than 10 characters." });
    } else if (text.match(/^[A-Za-z]+$/)) {
      Alert.alert("Please input alphabet characters only.");
      // valid integer (positive or negative)
    } else {
      setError({ fullName: "" });
      setFullName(text);
    }
    setFullName(text);
  };
  const validatePhone = (text) => {
    if (text === "") {
      setError({ phone: "Phone number is required." });
    } else if (text.length !== 11) {
      setError({ phone: "Phone must be 11 digits." });
    } else if (/^\d{10}$/) {
      setError({ phone: "Phone must be 11 digits." });
    } else {
      setError({ phone: "" });
      setPhone(text);
    }
    setPhone(text);
  };
  // const validateemail = (text) => {
  //   var pattern = new RegExp(
  //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+))|("[\w-\s]+")([\w-]+(?:\.[\w-]+)))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  //   );
  //   if (text === "") {
  //     setError({ email: "email is required." });
  //   } else {
  //     setError({ email: "" });
  //     setemail(text);
  //   }
  //   setemail(text);
  // };
  const validatePassword = (text) => {
    if (text === "") {
      setError({ password: "Password is required." });
    } else if (text.length < 6) {
      setError({ password: "Password must be greater than 6 characters." });
    } else {
      setError({ password: "" });
      setPassword(text);
    }
    setPassword(text);
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
          onChangeText={(text) => validateFullName(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.fullName}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Phone Number e.g. 03xxxxxxxxx"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={(text) => validatePhone(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.phone}</Text>
      {/* <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail Address"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => validateemail(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.email}</Text> */}
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          keyboardType="default"
          onChangeText={(text) => validatePassword(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.password}</Text>
      <View style={styles.RadioContainer}>
        <RadioForm
          radio_props={radio_props}
          formHorizontal
          animation
          buttonColor={Customization.color.tint}
          labelStyle={{ fontSize: 20, marginRight: 10 }}
          selectedButtonColor={Customization.color.tint}
          initial={0}
          onPress={(value) => setGender(value)}
        />
      </View>
      <Button
        containerStyle={[styles.facebookContainer, { marginTop: 20 }]}
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
  RadioContainer: {
    width: Customization.textInputWidth.main,
    marginTop: 30,
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
  error: {
    marginRight: "auto",
    marginLeft: 70,
    color: Customization.color.errorText,
  },
});
