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

import { Customization } from "../../config/Customization";
import DonorEmailVerification from "./DonorEmailVerification";

import AppPicker from "../../components/AppPicker";

export default function DonorHomeScreen({ navigation }) {
  const [donorLoc, setDonorLoc] = React.useState("");
  const [donorEmail, setDonorEmail] = React.useState("");
  const [orgSelect, setOrgSelect] = React.useState();
  const [amount, setAmount] = React.useState(0);
  const [selectCloth, setSelectCloth] = React.useState("");
  const [clothValue, setClothValue] = React.useState(0);
  const [selectShoes, setSelectShoes] = React.useState("");
  const [shoesValue, setShoesValue] = React.useState(0);
  const [orgList, setOrgList] = React.useState([]);
  const [verifiedEmail, setVerifiedEmail] = React.useState("");
  const [latlng, setLatlng] = React.useState("");
  const [category, setCategory] = React.useState();
  const database = firebase.database();

  const personsList = [
    { label: "Children", value: 1 },
    { label: "Men", value: 2 },
    { label: "Women", value: 3 },
  ];
  const amountList = [
    { label: "100", value: 1 },
    { label: "300", value: 2 },
    { label: "500", value: 3 },
    { label: "1000", value: 4 },
    { label: "2000", value: 5 },
  ];
  const itemsList = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "5", value: 4 },
    { label: "10", value: 5 },
  ];

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
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 10,
          marginRight: 10,
        }}>
        <View>
          <Text style={styles.title}>Organization List</Text>
          <AppPicker
            style={{ backgroundColor: "#fff" }}
            selectedItem={orgSelect}
            onSelectItem={(item) => setOrgSelect(item)}
            items={orgList}
            icon='account-group'
            placeholder='Organizations'
          />
        </View>
        <Text style={styles.title}>Clothes</Text>
        <View style={styles.dropDownContainer}>
          <View style={styles.listView}>
            <AppPicker
              selectedItem={selectCloth}
              onSelectItem={(item) => setSelectCloth(item)}
              items={personsList}
              icon='gender-male-female'
              placeholder='Gender'
            />
          </View>
          <View style={styles.listView}>
            <AppPicker
              selectedItem={clothValue}
              onSelectItem={(item) => setClothValue(item)}
              items={itemsList}
              icon='numeric'
              placeholder='Quantity'
            />
          </View>
        </View>
        <Text style={styles.title}>Shoes</Text>
        <View style={styles.dropDownContainer}>
          <View style={styles.listView}>
            <AppPicker
              selectedItem={selectShoes}
              onSelectItem={(item) => setSelectShoes(item)}
              items={personsList}
              icon='gender-male-female'
              placeholder='Gender'
            />
          </View>
          <View style={styles.listView}>
            <AppPicker
              selectedItem={shoesValue}
              onSelectItem={(item) => setShoesValue(item)}
              items={itemsList}
              icon='numeric'
              placeholder='Quantity'
            />
          </View>
        </View>
        <Text style={styles.title}>Amount</Text>
        <View style={styles.dropDownContainer}>
          <View style={styles.listView}>
            <AppPicker
              selectedItem={amount}
              onSelectItem={(item) => setAmount(item)}
              items={amountList}
              icon='numeric'
              placeholder='Amount in Rs.'
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
    backgroundColor: "#f8f4f4",
  },
  title: {
    fontSize: Customization.fontSize.smallTitle,
    fontWeight: "bold",
    color: Customization.color.tint,
    marginTop: 10,
    textAlign: "center",
  },
  InputContainer: {
    width: Customization.textInputWidth.main,
    marginTop: 15,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  body: {
    height: 42,
    paddingLeft: 2,
    paddingRight: 20,
    color: Customization.color.text,
  },
  listView: { flex: 1, marginRight: 3 },
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
    marginBottom: 40,
  },
  loginContainer: {
    width: Customization.buttonWidth.main,
    backgroundColor: Customization.color.tint,
    borderRadius: Customization.borderRadius.main,
    padding: 9,
    marginTop: 20,
  },
  loginText: {
    color: Customization.color.white,
  },
});
