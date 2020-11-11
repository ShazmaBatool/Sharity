import React from "react";
import { View, Text, Button } from "react-native";

export default function SignInScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>SignIn Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <Button
        title="SignUp Screen"
        onPress={() => navigation.navigate("SignUp")}
      />
    </View>
  );
}

// import React from "react";
// import { View, Text, Button } from "react-native";

// export default function LoginScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Login Screen</Text>
//       <Button
//         title="Go to User Screen"
//         onPress={() => navigation.navigate("User")}
//       />
//     </View>
//   );
// }
