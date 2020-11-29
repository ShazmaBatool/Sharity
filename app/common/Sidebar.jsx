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
import Icon from "react-native-vector-icons/FontAwesome5";
import firebase from "firebase";

import { AuthContext } from "../../context";
import { Customization } from "../config/Customization";

const Sidebar = ({ navigation, routes }) => {
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
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
            "Log out",
            "Do you want to logout?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  return null;
                },
              },
              {
                text: "Confirm",
                onPress: () => signOut(),
              },
            ],
            { cancelable: false }
          )
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
      </TouchableOpacity>
    </View>
  );
};
function Item({ item, navigate }) {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigate(item.name)}>
      <Icon name={item.icon} size={25} color={Customization.color.tint} />
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
