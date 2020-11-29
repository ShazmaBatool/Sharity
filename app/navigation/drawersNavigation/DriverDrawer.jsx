import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SyncStorage from "sync-storage";

<<<<<<< HEAD
import Sidebar from "../../common/Sidebar";
import DriverMapScreen from "../../screens/screensDriver/DriverMapScreen";
=======
import DriverHomeScreen from "../../screens/screensDriver/DriverHomeScreen";
import Sidebar from "../../common/Sidebar";
import DriverNotifications from "../../screens/screensDriver/DriverNotifications";
import TripsDetails from "../../screens/screensDriver/TripsDetails";
import DriverSettings from "../../screens/screensDriver/DriverSettings";
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0

export default function DriverDrawer() {
  const [routes] = React.useState([
    {
      name: "Driver Details",
      icon: "ios-document",
    },
    {
      name: "Add Driver",
      icon: "md-add-circle",
    },
    {
      name: "Settings",
      icon: "ios-settings",
    },
  ]);
  const email = SyncStorage.get("@userEmail");
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
      name: "Notifications",
      icon: "bell",
    },
    {
      name: "Home",
      icon: "bell",
    },
    {
      name: "Trips Details",
      icon: "id-card",
    },

    {
      name: "Settings",
      icon: "cog",
    },
  ]);

  return (
    <DrawerStack.Navigator
<<<<<<< HEAD
      overlayColor='#01010abf'
      initialRouteName='MapScreen'
      headerMode='none'
      drawerContent={(props) => (
        <Sidebar {...props} routes={routes} email={email} />
      )}>
      <DrawerStack.Screen name='MapScreen' component={DriverMapScreen} />
=======
      overlayColor="#01010abf"
      initialRouteName="Home"
      headerMode="none"
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}
    >
      <DrawerStack.Screen name="Home" component={DriverHomeScreen} />
      <DrawerStack.Screen
        name="Driver Notifications"
        component={DriverNotifications}
      />

      <DrawerStack.Screen name="Trips Details" component={TripsDetails} />
      <DrawerStack.Screen name="Settings" component={DriverSettings} />
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
    </DrawerStack.Navigator>
  );
}
