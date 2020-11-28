import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text>Add Driver</Text>
        </View>
        <View style={styles.container}>
          <Text>Driver Details</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text>Home Screen of organization</Text>
        </View>
        <View style={styles.container}>
          <Text>Home Screen of organization</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    flex: 1,
    margin: 5,
    height: 150,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
  },
  mainContainer: {
    flexDirection: "row",
    margin: 15,
  },
});
