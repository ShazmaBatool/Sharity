import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase";

import { AuthContext } from "./context";
import AppNavigator from "./app/navigation/AppNavigator";
import SplashScreen from "./app/screens/SplashScreen";

export default function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(user);
      } else {
        setIsAuth(false);
      }
    });
  };
  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsAuth("SignIn");
      },
      signUp: () => {
        setIsAuth("SignUp");
      },
      signOut: () => {
        setIsAuth(null);
      },
    };
  }, []);
  React.useEffect(() => {
    authListener();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <StatusBar barStyle='light-content' />
      <NavigationContainer>
        <AppNavigator isAuth={isAuth} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
