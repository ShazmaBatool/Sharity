import React from "react";
import { View, Text, Button } from "react-native";

export default function SignUpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SignUp Screen</Text>
      <Button
        title="Go to Login Screen"
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </View>
  );
}

// import React from "react";
// import { View, Text, Button } from "react-native";

// export default function SignUpScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>SignUp Screen</Text>
//       <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
//     </View>
//   );
// }
