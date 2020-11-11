import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* this <NavigationContainer> is built-in component or class and we just have to call it. */}
      {/* As it is in curly brackets {} so is this a class? just like we write {component} */}
      <AppNavigator />
    </NavigationContainer>
  );
}
