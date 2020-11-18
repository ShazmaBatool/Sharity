import React, { Component } from "react";
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

import { AuthContext } from "../../context";

const Sidebar = ({ navigation, routes, email }) => {
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
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            "https://res.cloudinary.com/wfdns6x2g6/image/upload/v1509007989/user_psolwi.png",
        }}
        style={styles.profileImg}
      />
      <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>
        Janna Doe
      </Text>
      <Text style={{ color: "gray", marginBottom: 10 }}>
        {email ? email : "janna@doe.com"}
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
        <Text style={{ margin: 16, fontWeight: "bold", color: "#000" }}>
          Logout
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
      <Ionicons name={item.icon} size={32} />
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
