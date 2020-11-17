import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase";

import DonorDrawer from "../navigation/drawersNavigation/DonorDrawer";
import DriverDrawer from "../navigation/drawersNavigation/DriverDrawer";
import OrgDrawer from "../navigation/drawersNavigation/OrgDrawer";
import { Customization } from "../config/Customization";

export default function HomeNavigation() {
  const [isUser, setIsUser] = React.useState("org");
  const [isLoading, setIsLoading] = React.useState(true);
  const RootStack = createStackNavigator();
  const database = firebase.database();

  const gettingCurrentUser = async () => {
    try {
      await database
        .ref("/UserType/")
        .once("value")
        .then(function (snapshot) {
          var result = snapshot.val();
          setIsUser(result.userType);
        });
    } catch (error) {
      console.log("gettingCurrentUser -> error", error);
    }
  };
  React.useEffect(() => {
    gettingCurrentUser();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });
  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size='large'
        color={Customization.color.tint}
      />
    );
  }
  return (
    <RootStack.Navigator>
      {isUser === "org" ? (
        <RootStack.Screen
          name='OrgDrawer'
          component={OrgDrawer}
          options={{ headerShown: false }}
        />
      ) : isUser === "donor" ? (
        <RootStack.Screen
          name='DonorDrawer'
          component={DonorDrawer}
          options={{ headerShown: false }}
        />
      ) : (
        isUser === "driver" && (
          <RootStack.Screen
            name='DriverDrawer'
            component={DriverDrawer}
            options={{ headerShown: false }}
          />
        )
      )}
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
