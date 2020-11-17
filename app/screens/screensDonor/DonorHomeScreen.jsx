import React from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default function DonorHomeScreen() {
  const [driverData, setDriverData] = React.useState([]);

  const database = firebase.database();
  const gettingDriverData = () => {
    database
      .ref("/Drivers/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        console.log("result", result);
        // setDriverData(result);
      });
  };
  React.useEffect(() => {
    gettingDriverData();
    return () => {
      null;
    };
  }, []);
  return (
    <View>
      <Text>Welcome Donor </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
