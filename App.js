import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./context";
import AppNavigator from "./app/navigation/AppNavigator";
import SplashScreen from "./app/screens/SplashScreen";
import firebase from "firebase";

export default function App() {
  const [isAuth, setIsAuth] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(user);
      } else {
        setIsAuth(null);
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
    }, 3000);
  }, []);
  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <AppNavigator isAuth={isAuth} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
