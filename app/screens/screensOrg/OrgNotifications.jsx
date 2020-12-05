import React from "react";
import { Image, View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Badge,
  Icon,
  withBadge,
  Text,
  Card,
  Divider,
} from "react-native-elements";
import firebase from "firebase";

export default function OrgNotifications() {
  const [donateType, setDonateType] = React.useState();
  const [donateAmount, setDonateAmount] = React.useState();
  const [donateGender, setDonateGender] = React.useState();
  const [donateArray, setDonateArray] = React.useState([]);
  const database = firebase.database();

  const gettingNotifications = () => {
    database
      .ref("/NewRequest/Donor/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        setDonateArray(result);
      })
      .catch(function (error) {
        console.log(
          "🚀 ~ file: DonorNotifications.jsx ~ line 22 ~ error",
          error
        );
      });
  };
  React.useEffect(() => {
    gettingNotifications();
    return () => {
      null;
    };
  });
  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 7 }}>
        {donateArray.map((donate, index) => (
          <Card containerStyle={styles.card} key={index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Text style={styles.notes}>{donate.organizationName}</Text>
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
                    style={{ color: "#fff", paddingLeft: 5, paddingRight: 5 }}>
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

            <Divider
              style={{ backgroundColor: "#dfe6e9", marginVertical: 20 }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.notes}>Gender</Text>
              <Text style={styles.notes}>{donate.donateClothes}</Text>
            </View>
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
});
