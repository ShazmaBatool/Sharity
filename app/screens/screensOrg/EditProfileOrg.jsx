import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Screen from "../../common/Screen";

export default function EditProfileOrg({ navigation }) {
  const [imageUri, setImageUri] = React.useState("");
  const handleEditPic = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) setImageUri(result.uri);
    } catch (error) {
      console.log("handleEditPic -> error", error);
    }
  };
  const user = async () =>
    await firebase.auth().onAuthStateChanged(function (user) {
      console.log("EditProfileOrg -> user", user);
    });
  React.useEffect(() => user());

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

      <View style={{ alignSelf: "center", marginTop: 15 }}>
        <View style={styles.profileImage}>
          <Image
            source={{
              uri: imageUri
                ? imageUri
                : "https://res.cloudinary.com/wfdns6x2g6/image/upload/v1509007989/user_psolwi.png",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.add}>
          <Ionicons
            name="ios-add"
            size={40}
            color="#DFD8C8"
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
            Julie
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#01010abf"
          onPress={() => alert("Pressed!")}
        >
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Julie@gmail.com
          </Text>
        </TouchableHighlight>
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
    backgroundColor: "#FF6347",
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
