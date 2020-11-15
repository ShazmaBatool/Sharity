import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

export default function DriversDetails({ navigation }) {
  const [driverData, setdriverData] = React.useState([]);
  const database = firebase.database();
  const gettingdriverData = () => {
    database
      .ref("/Drivers/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        console.log(result);
        setdriverData(result);
      });
  };

  React.useEffect(() => {
    gettingdriverData();
    return () => {
      null;
    };
  }, []);
  return (
    <View style={styles.container}>
      {/* <Header name="Donor Details" openDrawer={navigation.openDrawer} /> */}
      <Image
        source={require("../../../assets/donate.png")}
        style={{ width: "80%", height: "30%" }}
        resizeMode="contain"
      />
      <ScrollView>
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
});
// Status of Drivers: Available/ Busy
