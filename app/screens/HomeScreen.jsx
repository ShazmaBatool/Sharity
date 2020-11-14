import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import { AuthContext } from "../../context";
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";

export default function HomeScreen(props) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details Screen"
        onPress={() => props.navigation.navigate("DetailsScreen")}
      />
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
}
