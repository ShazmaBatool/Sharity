import React, { useContext } from "react";
import {
  Alert,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import Icons from "react-native-vector-icons/FontAwesome5";
import SyncStorage from "sync-storage";

import { AuthContext } from "../../context";
import { Customization } from "../config/Customization";
import { cos } from "react-native-reanimated";

const Sidebar = ({ navigation, routes }) => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const database = firebase.database();
  const { signOut } = useContext(AuthContext);

  const userInfo = () => {
    const user = firebase.auth().currentUser;
    // database = firebase.database();
    database
      .ref("UserType")
      .once("value")
      .then(function (snapshot) {
        var result = snapshot.val();
        if (result.userType === "org") {
          database
            .ref("Users/Organization")
            .once("value")
            .then(function (snapshot) {
              var result = Object.values(snapshot.val());
              var newArr = result.filter((obj) => obj.OrgEmail === user.email);
              SyncStorage.set("@organizationName", newArr[0].OrgName);
              setDisplayName(newArr[0].OrgName);
              setPhotoURL(user.photoURL);
              setEmail(user.email);
            });
        } else if (result.userType === "driver") {
          // setDisplayName(user.displayName);
          setPhotoURL(user.photoURL);
          setPhoneNumber(user.phoneNumber);
          database
            .ref("Users/Driver")
            .once("value")
            .then(function (snapshot) {
              var result = Object.values(snapshot.val());
              // var phoneNumber = SyncStorage.get("@driverPhone");
              var newArr = result.filter(
                (obj) => obj.driverContactInfo === phoneNumber
              );
              setDisplayName(newArr[0].driverName);
            });
        } else {
          setDisplayName(user.displayName);
          setPhotoURL(user.photoURL);
          setEmail(user.email);
        }
      });
  };
  React.useEffect(() => {
    userInfo();
    return () => {
      null;
    };
  });
  const leaveTheApp = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: photoURL
            ? photoURL
            : "https://res.cloudinary.com/wfdns6x2g6/image/upload/v1509007989/user_psolwi.png",
        }}
        style={styles.profileImg}
      />
      <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
        {displayName}
      </Text>
      <Text style={{ color: "gray", marginBottom: 10 }}>
        {email ? email : phoneNumber}
      </Text>
      <View style={styles.sidebarDivider}></View>
      <FlatList
        style={{ width: "100%", marginLeft: 30 }}
        data={routes}
        renderItem={({ item }) => (
          <Item item={item} navigate={navigation.navigate} />
        )}
        keyExtractor={(item) => item.name}
      />
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "Sign out",
            "Do you want to sign out?",
            [
              {
                text: "No",
                onPress: () => {
                  return null;
                },
              },
              {
                text: "Yes",
                onPress: () => {
                  leaveTheApp();
                },
              },
            ],
            { cancelable: false }
          )
        }>
        <Text style={{ margin: 16, fontWeight: "bold", color: "#000" }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};
function Item({ item, navigate }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigate(item.name)}>
      <Icons name={item.icon} size={32} color={Customization.color.tint} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
    flex: 1,
  },
  listItem: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20,
  },
  sidebarDivider: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
});

export default Sidebar;
