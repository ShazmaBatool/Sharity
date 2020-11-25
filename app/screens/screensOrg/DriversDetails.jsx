import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import firebase from "firebase";

export default function DriversDetails({ navigation }) {
  const [driverData, setDriverData] = React.useState([]);
  const database = firebase.database();
  const gettingDriverData = () => {
    database
      .ref("/Drivers/")
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
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/donate.png")}
        style={{ width: "80%", height: "30%" }}
        resizeMode="contain"
      />
      <ScrollView style={styles.scrollView}>
        {driverData.map((driver) => (
          <View style={styles.detailsContainer} key={driver.driverName}>
            <Text style={styles.detailsText}>
              Driver Name: {driver.driverName}
            </Text>
            <Text style={styles.detailsText}>
              Driver Contact Info: {driver.driverContactInfo}
            </Text>
            <Text style={styles.detailsText}>
              Driver VehicleID: {driver.driverVehicleInfo}
            </Text>
            <Button
              containerStyle={styles.loginContainer}
              style={styles.loginText}
              onPress={onPressAddDriver}
            >
              Assign Task
            </Button>
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
    height: 130,
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
});
// Status of Drivers: Available/ Busy
