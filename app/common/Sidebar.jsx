import React from "react";
import {
  Alert,
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
import Icon from "react-native-vector-icons/FontAwesome5";
import firebase from "firebase";

import { AuthContext } from "../../context";
import { Customization } from "../config/Customization";

const Sidebar = ({ navigation, routes }) => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
=======
import Icons from "react-native-vector-icons/FontAwesome";
import { Customization } from "../config/Customization";

import { AuthContext } from "../../context";
import firebase from "firebase";

const Sidebar = ({ navigation, routes }) => {
  const [displayName, setDisplayName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const userInfo = () => {
    const user = firebase.auth().currentUser;
    setDisplayName(user.displayName);
    setPhoneNumber(user.phoneNumber);
    setPhotoURL(user.photoURL);
  };
  React.useEffect(() => {
    userInfo();
    return () => {
      null;
    };
  });

  //  const [routes] = React.useState([
  //   {
  //     name: "Driver Details",
  //     icon: "ios-document",
  //   },
  //   {
  //     name: "Add Driver",
  //     icon: "md-add-circle",
  //   },

  //   {
  //     name: "Settings",
  //     icon: "ios-settings",
  //   },
  // ]);
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
  const { signOut } = React.useContext(AuthContext);

  const userInfo = () => {
    const user = firebase.auth().currentUser;
    setDisplayName(user.displayName);
    setEmail(user.email);
    setPhotoURL(user.photoURL);
  };
  React.useEffect(() => {
    userInfo();
    return () => {
      null;
    };
  });
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
<<<<<<< HEAD
=======
      </Text>
      <Text style={{ color: "gray", marginBottom: 10 }}>
        {phoneNumber ? phoneNumber : ""}
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
      </Text>
      <Text style={{ color: "gray", marginBottom: 10 }}>{email}</Text>
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
                onPress: () => signOut(),
              },
            ],
            { cancelable: false }
          )
<<<<<<< HEAD
        }>
        <View style={styles.listItem}>
          <Icon
            name='sign-out-alt'
            size={25}
            color={Customization.color.tint}
          />
          <Text style={{ margin: 16, fontWeight: "bold", color: "#000" }}>
            Logout
          </Text>
        </View>
=======
        }
      >
        <Text style={{ margin: 16, fontWeight: "bold", color: "#000" }}>
          Sign Out
        </Text>
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
      </TouchableOpacity>
    </View>
  );
};
function Item({ item, navigate }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
<<<<<<< HEAD
      onPress={() => navigate(item.name)}>
      <Icon name={item.icon} size={25} color={Customization.color.tint} />
=======
      onPress={() => navigate(item.name)}
    >
      <Icons name={item.icon} size={32} color={Customization.color.tint} />
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
