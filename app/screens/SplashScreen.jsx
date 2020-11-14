import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ff5a66" />
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
  spinner: {
    marginTop: 200,
  },
});
