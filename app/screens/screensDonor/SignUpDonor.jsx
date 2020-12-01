import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Button from "react-native-button";
import firebase from "firebase";
import RadioForm from "react-native-simple-radio-button";

import { Customization } from "../../config/Customization";

export default function SignUpDonor({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [genderValue, setGenderValue] = React.useState(0);
  const [error, setError] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const database = firebase.database();
  var radio_props = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ];

  const handleSignUp = async () => {
    if (!error.fullName && !error.phone && !error.email && !error.password) {
      let gender = "";
      if (genderValue == 0) {
        gender = "Male";
      } else {
        gender = "Female";
      }
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(function (userData) {
            if (userData)
              userData.user
                .sendEmailVerification()
                .then(function () {
                  // Email sent.
                  Alert.alert("Please verify your email first.");
                })
                .catch(function (error) {
                  // An error happened.
                });
            database.ref("Users/" + "Donor").push({
              donorName: fullName,
              donorContactInfo: phone,
              donorEmail: email,
              donorPassword: password,
              donorGender: gender,
            });
          });
      } catch (error) {
        Alert.alert(error.toString());
      }
    } else {
      Alert.alert("Please fill all the required fields.");
    }
  };

  const validateUserName = (text) => {
    var letters = /^[A-Za-z\s]+$/;
    if (text === "") {
      setError({ fullName: "Name is required." });
    } else if (text.length < 3) {
      setError({ fullName: "Name must be greater than 3 characters." });
    } else if (text.length > 35) {
      setError({ fullName: "Name must be less than 35 characters." });
    } else if (!letters.test(text)) {
      setError({ fullName: "Input must contains alphabets only." });
    } else {
      setError({ fullName: "" });
      setFullName(text);
    }
    setFullName(text);
  };
  const validatePhone = (text) => {
    if (text === "") {
      setError({ phone: "Phone number is required." });
    } else if (text.length < 11) {
      setError({ phone: "Phone must be 11 digits." });
    } else if (text.length > 11) {
      setError({ phone: "Phone must be 11 digits." });
    } else if (text.length === 11) {
      setError({ phone: "" });
      setPhone(text);
    }
    setPhone(text);
  };
  const validateEmail = (text) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (text === "") {
      setError({ email: "Email is required." });
    } else if (!pattern.test(text)) {
      setError({ email: "Please enter valid email address." });
    } else {
      setError({ email: "" });
      setEmail(text);
    }
    setEmail(text);
  };
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
    <KeyboardAvoidingView style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Full Name"
          value={fullName}
          keyboardType="default"
          onChangeText={(text) => validateUserName(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.fullName}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Phone Number"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={(text) => validatePhone(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.phone}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail Address"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => validateEmail(text)}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <Text style={styles.error}>{error.email}</Text>
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
          buttonColor={Customization.color.tint}
          initial={0}
          formHorizontal
          animation
          labelStyle={{ fontSize: 20, marginRight: 10 }}
          selectedButtonColor={Customization.color.tint}
          onPress={(value) => {
            setGenderValue(value);
          }}
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
    </KeyboardAvoidingView>
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
