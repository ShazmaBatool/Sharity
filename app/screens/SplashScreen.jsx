import React from "react";
import { StyleSheet, View, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
  },
});
