import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../../context";
export default function SignInScreen({ navigation }) {
  const context = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ margin: 5 }}>LogIn Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => context.signIn()}
        style={{ margin: 5 }}
      />
      <Button
        title="Go to SignUp Screen"
        onPress={() => navigation.navigate("SignUp")}
        style={{ margin: 5 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  button: { marginTop: 10 },
});
