import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AddDriver from "../../screens/screensOrg/AddDriver";
import DriversDetails from "../../screens/screensOrg/DriversDetails";
import EditProfileOrg from "../../screens/screensOrg/EditProfileOrg";
import Sidebar from "../../common/Sidebar";
import SettingsOrgScreen from "../../screens/screensOrg/SettingsOrgScreen";
import OrgNotifications from "../../screens/screensOrg/OrgNotifications";
import DonationsCount from "../../screens/screensOrg/DonationsCount";
import DonationsDetails from "../../screens/screensOrg/DonationsDetails";

export default function OrgDrawer() {
  const DrawerStack = createDrawerNavigator();
  const [routes] = React.useState([
    {
      name: "Notifications",
      icon: "bell",
    },
    {
      name: "Donation Details",
      icon: "id-card",
    },
    {
      name: "Donation Count",
      icon: "donate",
    },
    {
      name: "Driver Details",
      icon: "id-card",
    },
    {
      name: "Add Driver",
      icon: "user-plus",
    },

    {
      name: "Settings",
      icon: "cog",
    },
  ]);

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

      <DrawerStack.Screen
        name="EditProfile"
        component={EditProfileOrg}
        options={{ headerShown: false }}
      />
      <DrawerStack.Screen name="Settings" component={SettingsOrgScreen} />
    </DrawerStack.Navigator>
  );
}
