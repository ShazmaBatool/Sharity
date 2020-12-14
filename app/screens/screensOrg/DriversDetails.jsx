import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import firebase from "firebase";
import Button from "react-native-button";
import Icon from "react-native-vector-icons/FontAwesome5";

import { Customization } from "../../config/Customization";

export default function DriversDetails({ navigation, route }) {
  const [driverData, setDriverData] = React.useState([]);
  const database = firebase.database();
  const gettingDriverData = () => {
    database
      .ref("/Users/Driver/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        setDriverData(result);
      });
  };

  React.useEffect(() => {
    gettingDriverData();
    return () => {
      null;
    };
  });
  const handleAssign = (driver) => {
    let donorEmail = route.params.donate.donorEmail;
    let donorOrg = route.params.donate.organizationName;
    let donateClothes = route.params.donate.donateClothes;
    let donateShoes = route.params.donate.donateShoes;
    let donateMoney = route.params.donate.donateMoney;
    database
      .ref("/NewRequest/Donor/")
      .once("value")
      .then(function (snapshot) {
        var status = "";
        snapshot.forEach((el) => {
          if (
            el.val().donorEmail === donorEmail &&
            el.val().organizationName === donorOrg &&
            el.val().donateClothes === donateClothes &&
            el.val().donateShoes === donateShoes &&
            el.val().donateMoney === donateMoney
          ) {
            status = el.key;
          }
          database
            .ref("NewRequest/Donor/" + status)
            .update({ requestStatus: "Ready to pickup" });
          database
            .ref("NewRequest/Driver")
            .push(route.params.donate)
            .then(function (response) {
              if (response)
                Alert.alert("Your Request has been sent to driver.");
            })
            .catch(function (error) {
              Alert.alert(error.toString());
            });
        });
      });
  };

  const handleDelete = (driver) => {
    database
      .ref("Users/Driver")
      .once("value")
      .then(function (snapshot) {
        var status = "";
        snapshot.forEach((el) => {
          if (el.val().driverContactInfo === driver) {
            status = el.key;
          }
        });
        database.ref("Users/Driver/" + status).remove();
        gettingDriverData();
        Alert.alert("Driver removed Successfully.");

        // return findDriver;
      });
    // userRef.remove();
  };

  const alertDelete = (driver) => {
    Alert.alert(
      "Delete Driver",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => handleDelete(driver),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/donate.png")}
        style={{ width: "80%", height: "30%" }}
        resizeMode='contain'
      />
      <ScrollView style={styles.scrollView}>
        {driverData.map((driver) => (
          <View style={styles.detailsContainer} key={driver.driverName}>
            <View style={styles.rightContainer}>
              <Icon
                name='trash-alt'
                size={24}
                color={Customization.color.tint}
                onPress={() => alertDelete(driver.driverContactInfo)}
              />
            </View>
            <Text style={styles.detailsText}>
              Driver Name: {driver.driverName}
            </Text>
            <Text style={styles.detailsText}>
              Driver Contact Info: {driver.driverContactInfo}
            </Text>
            <Text style={styles.detailsText}>
              Driver VehicleID: {driver.driverVehicleInfo}
            </Text>
            <View style={styles.rightContainer}>
              <Button
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={() => handleAssign(driver.driverContactInfo)}>
                Assign Task
              </Button>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
    alignItems: "center",
    flex: 1,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: "#FFC107",
    height: 160,
    marginTop: 20,
    padding: 10,
    width: 280,
  },
  detailsText: {
    margin: 5,
  },
  scrollView: {
    marginBottom: 15,
  },
  rightContainer: {
    flexDirection: "row-reverse",
    marginRight: 0,
    // marginHorizontal: 16,
  },

  loginContainer: {
    width: "35%",
    backgroundColor: Customization.color.tint,
    borderRadius: Customization.borderRadius.main,
  },
  loginText: {
    color: Customization.color.white,
    fontSize: 13,
  },
});
// Status of Drivers: Available/ Busy
