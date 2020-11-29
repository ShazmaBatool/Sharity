import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
<<<<<<< HEAD

=======
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
import AddDriver from "../../screens/screensOrg/AddDriver";
import DonationsDetails from "../../screens/screensOrg/DonationsDetails";
import DonationsCount from "../../screens/screensOrg/DonationsCount";
import DriversDetails from "../../screens/screensOrg/DriversDetails";
import EditProfileOrg from "../../screens/screensOrg/EditProfileOrg";
import OrgNotifications from "../../screens/screensOrg/OrgNotifications";
import Sidebar from "../../common/Sidebar";
import SettingsOrgScreen from "../../screens/screensOrg/SettingsOrgScreen";
<<<<<<< HEAD
import HomeScreen from "../../screens/screensOrg/HomeScreen";
=======
import OrgNotifications from "../../screens/screensOrg/OrgNotifications";
import DonationsCount from "../../screens/screensOrg/DonationsCount";
import DonationsDetails from "../../screens/screensOrg/DonationsDetails";
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0

export default function OrgDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
<<<<<<< HEAD
=======
      name: "Notifications",
      icon: "bell",
    },
    {
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
      name: "Donation Details",
      icon: "id-card",
    },
    {
      name: "Donation Count",
      icon: "donate",
<<<<<<< HEAD
=======
    },
    {
      name: "Driver Details",
      icon: "id-card",
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
    },
    {
      name: "Add Driver",
      icon: "user-plus",
<<<<<<< HEAD
    },
    {
      name: "Driver Details",
      icon: "motorcycle",
    },
    {
      name: "Notifications",
      icon: "bell",
=======
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
    },

    {
      name: "Settings",
      icon: "cog",
    },
  ]);
<<<<<<< HEAD
  return (
    <DrawerStack.Navigator
      overlayColor='#01010abf'
      initialRouteName='Donation Details'
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}>
      <DrawerStack.Screen name='Donation Details' component={HomeScreen} />
      <DrawerStack.Screen name='Donation Count' component={DonationsCount} />
      <DrawerStack.Screen name='Driver Details' component={DriversDetails} />
      <DrawerStack.Screen name='Add Driver' component={AddDriver} />
      <DrawerStack.Screen name='Notifications' component={OrgNotifications} />
=======

  return (
    <DrawerStack.Navigator
      overlayColor="#01010abf"
      initialRouteName="Driver Details"
      drawerContent={(props) => <Sidebar {...props} routes={routes} />}
    >
      <DrawerStack.Screen name="OrgHomeScreen" component={DonationsCount} />
      <DrawerStack.Screen name="Notifications" component={OrgNotifications} />
      <DrawerStack.Screen
        name="Donation Details"
        component={DonationsDetails}
      />
      <DrawerStack.Screen name="Donation Count" component={DonationsCount} />
      <DrawerStack.Screen name="Driver Details" component={DriversDetails} />
      <DrawerStack.Screen name="Add Driver" component={AddDriver} />

>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
      <DrawerStack.Screen
        name="EditProfile"
        component={EditProfileOrg}
        options={{ headerShown: false }}
      />
      <DrawerStack.Screen name="Settings" component={SettingsOrgScreen} />
    </DrawerStack.Navigator>
  );
}
