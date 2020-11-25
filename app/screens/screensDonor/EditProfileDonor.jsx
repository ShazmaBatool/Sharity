import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import firebase from "firebase";
// import admin from "firebase-admin";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import Screen from "../../common/Screen";
import { Customization } from "../../config/Customization";

export default function EditProfileDonor({ navigation }) {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");

  const handleEditPic = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        setPhotoURL(result.uri);
      }
    } catch (error) {
      Alert.alert(error.toString());
    }
  };
  const userInfo = () => {
    const user = firebase.auth().currentUser;
    setDisplayName(user.displayName);
    setPhoneNumber(user.phoneNumber);
    setEmail(user.email);
    setPhotoURL(user.photoURL);
  };
  React.useEffect(() => {
    userInfo();
    return () => {
      null;
    };
  }, []);

  const handleSubmit = () => {
    var user = firebase.auth().currentUser;
    // admin
    //   .auth()
    //   .updateUser(user.uid, {
    //     email: email,
    //     phoneNumber: phoneNumber,
    //     displayName: displayName,
    //     photoURL: photoURL,
    //   })
    //   .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log("Successfully updated user", userRecord.toJSON());
    //   })
    //   .catch((error) => {
    //     console.log("Error updating user:", error);
    //   });
    // user.updatePhoneNumber(phoneNumber);
    user
      .updateProfile({
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      })
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
        <Text size={24} color={Customization.color.tint} onPress={handleSubmit}>
          SAVE
        </Text>
      </View>

      <View style={{ alignSelf: "center", marginTop: 15 }}>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: photoURL
                ? photoURL
                : "https://res.cloudinary.com/wfdns6x2g6/image/upload/v1509007989/user_psolwi.png",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        {/* <View style={styles.active} /> */}
        <View style={styles.add}>
          <Ionicons
            name="ios-add"
            size={40}
            color="#bb2265"
            onPress={handleEditPic}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#01010abf"
          onPress={() => alert("Pressed!")}
        >
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {displayName}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#01010abf"
          onPress={() => alert("Pressed!")}
        >
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            {email}
          </Text>
        </TouchableHighlight>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: 20,
          }}
        >
          <View style={styles.action}>
            <Feather name="phone" color="#bb2265" size={20} />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color="#bb2265" size={20} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="key" color="#bb2265" size={20} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#666666"
              keyboardType="visible-password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="globe" color="#bb2265" size={20} />
            <TextInput
              placeholder="Country"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <Icon name="map-marker-outline" color="#bb2265" size={20} />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={handleSubmit}>
            <Text style={styles.submitButton}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  image: {
    flex: 1,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    overflow: "hidden",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 10,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
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
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
