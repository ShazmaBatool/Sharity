import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  Platform,
} from "react-native";
import firebase from "firebase";
import Button from "react-native-button";
import * as Location from "expo-location";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Constants from "expo-constants";

import { Customization } from "../../config/Customization";
import DonorEmailVerification from "./DonorEmailVerification";
import { cos } from "react-native-reanimated";

export default function DonorHomeScreen({ navigation }) {
  const [donorLoc, setDonorLoc] = React.useState("");
  const [donorEmail, setDonorEmail] = React.useState("");
  const [orgSelect, setOrgSelect] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [selectCloth, setSelectCloth] = React.useState("");
  const [clothValue, setClothValue] = React.useState(0);
  const [selectShoes, setSelectShoes] = React.useState("");
  const [shoesValue, setShoesValue] = React.useState(0);
  const [orgList, setOrgList] = React.useState([]);
  const [verifiedEmail, setVerifiedEmail] = React.useState("");
  const [latlng, setLatlng] = React.useState("");
  const database = firebase.database();

  const SendRequest = () => {
    database.ref("NewRequest/Donor").push({
      organizationName: orgSelect,
      donorEmail: donorEmail,
      donateClothes: selectCloth,
      amountOfClothes: clothValue,
      donateShoes: selectShoes,
      amountOfShoes: shoesValue,
      donateMoney: amount,
      donateLatlng: latlng,
      requestStatus: "Pending",
    });
  };

  const getCurrentLoc = async () => {
    const user = firebase.auth().currentUser;
    if (user.emailVerified == true) {
      setVerifiedEmail(true);
      setDonorEmail(user.email);
      await Location.requestPermissionsAsync()
        .then(async function ({ status }) {
          if (status !== "granted") {
            setErrorMsg("Permission to access location was denied");
          }
          await Location.getCurrentPositionAsync({})
            .then(async function ({ coords }) {
              if (coords) {
                const loc = {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                };
                setLatlng(loc);
                await Location.reverseGeocodeAsync(loc)
                  .then(function (obj) {
                    setDonorLoc(`${obj[0].street}, ${obj[0].city}`);
                  })
                  .catch(function (error) {
                    Alert.alert(error.toString());
                  });
              }
            })
            .catch(function (error) {
              Alert.alert(error.toString());
            });
        })
        .catch(function (error) {
          Alert.alert(error.toString());
        });
    } else {
      // Alert.alert("Please verify your email first.");
    }
  };

  const getOrganizationList = () => {
    database
      .ref("/Users/Organization/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        var arr = [];
        for (var i = 0; i < result.length; i++) {
          arr.push({ value: result[i].OrgName, label: result[i].OrgName });
        }
        setOrgList(arr);
      });
  };
  React.useEffect(() => {
    getCurrentLoc();
    getOrganizationList();
    return () => {
      null;
    };
  }, []);

  if (!verifiedEmail) {
    return <DonorEmailVerification />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <Image
          source={require("../../assets/pin.png")}
          style={{ width: 30, height: 30, marginTop: 6 }}
        />
        <TextInput
          style={styles.body}
          placeholder='Your current location..'
          onChangeText={(text) => setDonorLoc(text)}
          value={donorLoc}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid='transparent'
        />
      </View>
      <View style={{ marginTop: 10, zIndex: Platform.OS === "ios" ? 80 : 80 }}>
        <View
          style={{
            zIndex: Platform.OS === "ios" ? 60 : 60,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={styles.title}>Organization List</Text>
          <DropDownPicker
            items={orgList}
            containerStyle={{ height: 40, width: 200 }}
            style={{ backgroundColor: "#fafafa", width: 200 }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => setOrgSelect(item.value)}
          />
        </View>
        <View style={{ zIndex: Platform.OS === "ios" ? 40 : 40 }}>
          <Text style={styles.title}>Clothes</Text>
          <View style={styles.dropDownContainer}>
            <DropDownPicker
              items={[
                {
                  label: "CHILDREN",
                  value: "children",
                  icon: () => (
                    <FontAwesome
                      name='child'
                      size={18}
                      color={Customization.color.tint}
                    />
                  ),
                },
                {
                  label: "MEN",
                  value: "men",
                  icon: () => (
                    <AntDesign
                      name='man'
                      size={18}
                      color={Customization.color.tint}
                    />
                  ),
                },
                {
                  label: "WOMEN",
                  value: "women",
                  icon: () => (
                    <AntDesign
                      name='woman'
                      size={18}
                      color={Customization.color.tint}
                    />
                  ),
                },
              ]}
              defaultValue=''
              placeholder='select gender'
              containerStyle={{ height: 40, width: 150 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setSelectCloth(item.value)}
            />
            <DropDownPicker
              items={[
                {
                  label: "1",
                  value: "1",
                },
                {
                  label: "2",
                  value: "2",
                },
                {
                  label: "3",
                  value: "3",
                },
              ]}
              defaultValue=''
              placeholder='select quantity'
              containerStyle={{ height: 40, width: 150 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setClothValue(item.value)}
            />
          </View>
        </View>
        <View style={{ zIndex: Platform.OS === "ios" ? 30 : 30 }}>
          <Text style={styles.title}>Shoes</Text>
          <View style={styles.dropDownContainer}>
            <DropDownPicker
              items={[
                {
                  label: "CHILDREN",
                  value: "children",
                  icon: () => (
                    <FontAwesome
                      name='child'
                      size={18}
                      color={Customization.color.tint}
                    />
                  ),
                },
                {
                  label: "MEN",
                  value: "men",
                  icon: () => (
                    <AntDesign
                      name='man'
                      size={18}
                      color={Customization.color.tint}
                    />
                  ),
                },
                {
                  label: "WOMEN",
                  value: "women",
                  icon: () => (
                    <AntDesign
                      name='woman'
                      size={18}
                      color={Customization.color.tint}
                    />
                  ),
                },
              ]}
              defaultValue=''
              placeholder='select gender'
              containerStyle={{ height: 40, width: 150 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setSelectShoes(item.value)}
            />

            <DropDownPicker
              items={[
                {
                  label: "1",
                  value: "1",
                },
                {
                  label: "2",
                  value: "2",
                },
                {
                  label: "3",
                  value: "3",
                },
              ]}
              defaultValue=''
              placeholder='select quantity'
              containerStyle={{ height: 40, width: 150 }}
              style={styles.dropDown}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setShoesValue(item.value)}
            />
          </View>
        </View>
        <View style={{ zIndex: Platform.OS === "ios" ? 20 : 20 }}>
          <Text style={styles.title}>Amount</Text>
          <View style={{ alignItems: "center" }}>
            <DropDownPicker
              items={[
                {
                  label: "200",
                  value: "200",
                },
                {
                  label: "400",
                  value: "400",
                },
                {
                  label: "600",
                  value: "600",
                },
              ]}
              defaultValue=''
              placeholder='select an amount'
              containerStyle={{ height: 40, width: 170 }}
              style={{ backgroundColor: "#fafafa", width: 170 }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={(item) => setAmount(item.value)}
            />
          </View>
        </View>
      </View>
      <View style={styles.requestButton}>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          color={Customization.color.tint}
          onPress={SendRequest}>
          Send Request
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: Customization.fontSize.smallTitle,
    fontWeight: "bold",
    color: Customization.color.tint,
    marginTop: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  InputContainer: {
    width: Customization.textInputWidth.main,
    marginTop: 30,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  body: {
    height: 42,
    paddingLeft: 2,
    paddingRight: 20,
    color: Customization.color.text,
  },
  dropDown: {
    backgroundColor: "#fafafa",
    width: 150,
  },
  dropDownContainer: {
    flexDirection: "row",
  },
  organizationContainer: {
    flexDirection: "row",
  },
  requestButton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
  },
  loginContainer: {
    width: Customization.buttonWidth.main,
    backgroundColor: Customization.color.tint,
    borderRadius: Customization.borderRadius.main,
    padding: 15,
    marginTop: 30,
  },
  loginText: {
    color: Customization.color.white,
  },
});
