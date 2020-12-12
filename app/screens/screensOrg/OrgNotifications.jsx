import React from "react";
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
  const [donorLat, setDonorLat] = React.useState("");
  const [donorLong, setDonorLong] = React.useState("");
  const [donorEmail, setDonorEmail] = React.useState("");
  const [donateArray, setDonateArray] = React.useState([]);
  const [driversArray, setDriversArray] = React.useState([]);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [dialogAssign, setDialogAssign] = React.useState(false);
  const database = firebase.database();

  const gettingNotifications = () => {
    var organizationName = SyncStorage.get("@organizationName");
    database
      .ref("NewRequest/Donor")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        var filterOrg = result.filter(
          (el) => el.organizationName === organizationName
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

  React.useEffect(() => {
    let isMounted = true;
    gettingNotifications();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDetails = (donate) => {
    setDialogVisible(true);
    setDonorEmail(donate.donorEmail);
    setDonorLat(donate.donateLatlng.latitude);
    setDonorLong(donate.donateLatlng.longitude);
  };

  const handleAssign = (donate) => {
    navigation.navigate("Driver Details", { donate });
    // setDialogAssign(true);
    // setDonorEmail(donate.donorEmail);
    // setDonorLat(donate.donateLatlng.latitude);
    // setDonorLong(donate.donateLatlng.longitude);
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
                  status='warning'
                  value={
                    <Text
                      style={{
                        color: "#fff",
                        paddingLeft: 5,
                        paddingRight: 5,
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
                  onPress={() => handleDetails(donate)}>
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
              <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Donor Details</Dialog.Title>
                <Dialog.Description>
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
                </Dialog.Description>
                <Dialog.Button
                  label='Cancel'
                  onPress={() => setDialogVisible(false)}
                />
              </Dialog.Container>
              <Dialog.Container visible={dialogAssign}>
                <Dialog.Title>Driver Details</Dialog.Title>
                <Dialog.Description>
                  {driversArray.map((driver) => (
                    <Text key={driver}>Email: {driver.driverName}</Text>
                  ))}
                </Dialog.Description>
                <Dialog.Button
                  label='Cancel'
                  onPress={() => setDialogAssign(false)}
                />
              </Dialog.Container>
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
