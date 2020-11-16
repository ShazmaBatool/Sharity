import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Customization } from "../../config/Customization";
import Header from "../../common/Header";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    alignItems: "center",
    flex: 1,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: "#FFC107",
    height: 190,
    marginTop: 20,
    padding: 10,
    width: 280,
  },
  detailsText: {
    margin: 5,
  },
});
