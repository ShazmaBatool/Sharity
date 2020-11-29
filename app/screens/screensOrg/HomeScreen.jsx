import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text>Screen 1</Text>
          {/* <Image source={require("../../assets/donate.png")} /> */}
        </View>
        <View style={styles.container}>
          <Text>Screen 2</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text>Screen 3</Text>
        </View>
        <View style={styles.container}>
          <Text>Screen 4</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text>Screen 5</Text>
        </View>
        <View style={styles.container}>
          <Text>Screen 6</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    margin: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    margin: 5,
    height: 150,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
  },
});
