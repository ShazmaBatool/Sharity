import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context";

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
