import React, { useState, useEffect } from "react";
import { Dimensions, Image, View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Badge,
  Icon,
  withBadge,
  Text,
  Card,
  Divider,
} from "react-native-elements";
import Button from "react-native-button";
import Dialog from "react-native-dialog";
import firebase from "firebase";
import SyncStorage from "sync-storage";
import MapView, { Marker, Polyline } from "react-native-maps";

import { Customization } from "../../config/Customization";

export default function OrgNotifications({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [donorLat, setDonorLat] = useState(33.6);
  const [donorLong, setDonorLong] = useState(73.0);
  const [donorEmail, setDonorEmail] = useState("");
  const [donateArray, setDonateArray] = useState([]);
  const [driversArray, setDriversArray] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogAssign, setDialogAssign] = useState(false);
  const database = firebase.database();

  const gettingNotifications = () => {
    const user = firebase.auth().currentUser;
    database
      .ref("Users/Organization")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        var newArr = result.filter((obj) => obj.OrgEmail === user.email);
        setDisplayName(newArr[0].OrgName);
      });
    database
      .ref("NewRequest/Donor")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        var filterOrg = result.filter(
          (el) => el.organizationName === displayName
        );
        setDonateArray(filterOrg);
      })
      .catch(function (error) {
        Alert.alert(error.toString());
      });
    database
      .ref("/Users/Driver/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        setDriversArray(result);
      });
  };

  useEffect(() => {
    gettingNotifications();
  });

  const handleDetails = (donate) => {
    setDialogVisible(true);
    setDonorEmail(donate.donorEmail);
    setDonorLat(parseInt(donate.donateLatlng.latitude));
    setDonorLong(parseInt(donate.donateLatlng.longitude));
  };

  const handleAssign = (donate) => {
    navigation.navigate("Driver Details", { donate });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 7 }}>
        {donateArray &&
          donateArray.map((donate, index) => (
            <Card containerStyle={styles.card} key={index}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                {/* <Text style={styles.notes}>{donate.donorEmail}</Text> */}
                <Badge
                  containerStyle={{
                    position: "absolute",
                    top: -4,
                    right: -4,
                  }}
                  style={styles.request}
                  status='primary'
                  value={
                    <Text
                      style={{
                        color: "#fff",
                        paddingLeft: 6,
                        paddingRight: 6,
                      }}>
                      {donate.requestStatus}
                    </Text>
                  }
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={
                    donate.donateClothes !== ""
                      ? require("../../assets/clothes2.png")
                      : donate.donateShoes !== ""
                      ? require("../../assets/high-heel.png")
                      : donate.donateMoney !== "" &&
                        require("../../assets/wallet.png")
                  }
                />
                <Text style={styles.time}>
                  {donate.donateClothes !== ""
                    ? "Clothes"
                    : donate.donateShoes !== ""
                    ? "Shoes"
                    : donate.donateMoney !== "" && "Amount"}
                </Text>
                <Text style={styles.amount}>
                  {donate.amountOfClothes !== 0
                    ? donate.amountOfClothes
                    : donate.amountOfShoes !== 0
                    ? donate.amountOfShoes
                    : donate.donateMoney !== 0 && donate.donateMoney}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                }}>
                {!donate.donateMoney && (
                  <>
                    <Text style={styles.notes}>Gender</Text>
                    <Text style={styles.notes}>{donate.donateClothes}</Text>
                  </>
                )}
              </View>
              <Divider
                style={{ backgroundColor: "#dfe6e9", marginVertical: 20 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <Button
                  containerStyle={styles.loginContainer}
                  style={styles.loginText}
                  color={Customization.color.tint}
                  onPress={() =>
                    navigation.navigate("Donation Details", { donate })
                  }>
                  Details
                </Button>
                <Button
                  containerStyle={styles.loginContainer}
                  style={styles.loginText}
                  color={Customization.color.tint}
                  onPress={() => handleAssign(donate)}>
                  Assign Job
                </Button>
              </View>
              {/* <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Donor Details</Dialog.Title>
                <Dialog.Description>Email: </Dialog.Description>
                <View
                    style={{
                      justifyContent: "center",
                      width: 250,
                      height: 250,
                    }}>
                    <Text>Email: {donorEmail}</Text>
                    <MapView
                      style={styles.mapStyle}
                      region={{
                        latitude: donorLat,
                        longitude: donorLong,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.005,
                      }}
                      showsUserLocation
                      followUserLocation
                      zoomEnabled>
                      <Marker
                        coordinate={{
                          latitude: donorLat,
                          longitude: donorLong,
                        }}
                        title='Starting location'
                      />
                    </MapView>
                  </View>
                <Dialog.Button
                  label='Cancel'
                  onPress={() => setDialogVisible(false)}
                />
              </Dialog.Container> */}
            </Card>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  card: {
    backgroundColor: "rgba(56, 172, 236, 1)",
    borderWidth: 0,
    borderRadius: 20,
  },
  time: {
    fontSize: 38,
    color: "#fff",
  },
  amount: {
    fontSize: 25,
    color: "#fff",
  },
  notes: {
    fontSize: 18,
    color: "#fff",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  request: {
    fontSize: 10,
    color: "#fff",
    marginBottom: 10,
  },
  loginContainer: {
    width: Customization.buttonWidth.middle,
    backgroundColor: Customization.color.tint,
    borderRadius: Customization.borderRadius.main,
    padding: 5,
  },
  loginText: {
    color: Customization.color.white,
  },
  mapStyle: {
    flex: 1,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
