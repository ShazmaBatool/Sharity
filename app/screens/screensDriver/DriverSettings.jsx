import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import firebase from "firebase";
import SyncStorage from "sync-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../../../context";
import { Customization } from "../../config/Customization";

export default function DriverSettings({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const { signOut } = useContext(AuthContext);

  const userInfo = () => {
    const user = firebase.auth().currentUser;
    console.log(
      "🚀 ~ file: DriverSettings.jsx ~ line 26 ~ userInfo ~ user",
      user.phoneNumber
    );
    const database = firebase.database();
    database
      .ref("Users/Driver")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        // var phoneNumber = SyncStorage.get("@driverPhone");
        var newArr = result.filter(
          (obj) => obj.driverContactInfo === user.phoneNumber
        );
        setDisplayName(newArr[0].driverName);
        setPhone(newArr[0].driverContactInfo);
        setVehicleNum(newArr[0].driverVehicleInfo);
      })
      .catch(function (error) {
        Alert.alert(error.toString());
      });
  };
  useEffect(() => {
    userInfo();
    return () => {
      null;
    };
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri:
                "https://res.cloudinary.com/wfdns6x2g6/image/upload/v1509007989/user_psolwi.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              {displayName}
            </Title>
            <Caption style={styles.caption}>{phone}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name='map-marker-radius' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Rawalpindi, Pakistan
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name='phone' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name='motorbike' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{vehicleNum}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}>
          <Title>11</Title>
          <Caption>Donation Successful</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Request Pending</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate("EditProfile")}>
          <View style={styles.menuItem}>
            <Icon
              name='account-edit'
              color={Customization.color.tint}
              size={25}
            />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => signOut()}>
          <View style={styles.menuItem}>
            <Icon name='logout' color={Customization.color.tint} size={25} />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
