import React from "react";
import { View, Text, Button } from "react-native";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SignUp Screen</Text>
      <Button
        title="Go to SignIn Screen"
        onPress={() => navigation.navigate("SignInScreen")}
      />
    </View>
  );
}
