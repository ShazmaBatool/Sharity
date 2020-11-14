import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  DrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from "react-navigation-redux-helpers";
import HomeScreen from "../screens/screensOrg";
import SignInScreen from "../screens/screensOrg";
import SignUpScreen from "../screens/screensOrg";
import WelcomeScreen from "../screens/screensOrg";

import { Configuration } from "../Configuration";
import DrawerContainer from "../components/DrawerContainer";

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0,
  },
});

const middleware = createReactNavigationReduxMiddleware(
  "root",
  (state) => state.nav
);

// SignIn stack
const SignInStack = createStackNavigator(
  {
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen },
    Welcome: { screen: WelcomeScreen },
  },
  {
    initialRouteName: "Welcome",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: "#FFFFFF" },
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
  },
  {
    initialRouteName: "Home",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: "#FFFFFF" },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = AppIcon.images.home;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Image
            style={{
              tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey,
            }}
            source={iconName}
          />
        );
      },
    }),
    initialLayout: {
      height: 300,
    },
    tabBarOptions: {
      activeTintColor: AppStyles.color.tint,
      inactiveTintColor: "gray",
      style: {
        height: Configuration.home.tab_bar_height,
      },
    },
  }
);

// drawer stack
const DrawerStack = DrawerNavigator(
  {
    Tab: TabNavigator,
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tab",
    drawerWidth: 200,
    contentComponent: DrawerContainer,
  }
);

// Manifest of possible screens
const RootNavigator = createStackNavigator(
  {
    SignInStack: { screen: SignInStack },
    DrawerStack: { screen: DrawerStack },
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "DrawerStack",
    transitionConfig: noTransitionConfig,
    navigationOptions: ({ navigation }) => ({
      color: "black",
    }),
  }
);

const AppWithNavigationState = reduxifyNavigator(RootNavigator, "root");

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
    fontFamily: AppStyles.fontName.main,
  },
});

export { RootNavigator, AppNavigator, middleware };
