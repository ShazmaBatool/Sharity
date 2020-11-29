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
// import firebase from "firebase";
import Button from "react-native-button";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import firebase from "firebase";

import { Customization } from "../../config/Customization";

export default function DonorHomeScreen() {
  const [donorLoc, setDonorLoc] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [selectCloth, setSelectCloth] = React.useState("");
  const [clothValue, setClothValue] = React.useState("");
  const [selectShoes, setSelectShoes] = React.useState("");
  const [shoesValue, setShoesValue] = React.useState("");
  const [orgList, setOrgList] = React.useState([]);

  const SendRequest = () => {
    console.log("SendRequest");
    console.log("Cloth", selectCloth);
    console.log("Shoes", selectShoes);
    console.log("Amount", amount);
    Alert.alert("Request send successful");
  };

  const getCurrentLoc = async () => {
    await Location.requestPermissionsAsync()
      .then(async function ({ status }) {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        await Location.getCurrentPositionAsync({})
          .then(async function ({ location }) {
            if (location) {
              const loc = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              };
              await Location.reverseGeocodeAsync(loc).then(function ({
                result,
              }) {
                setDonorLoc(`${result[0].street}, ${result[0].city}`);
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
  };
  const getOrgList = () => {
    const database = firebase.database();
    console.log(
      "🚀 ~ file: DonorHomeScreen.jsx ~ line 68 ~ getOrgList ~ database"
    );
    database
      .ref("/Users/")
      .once("value")
      .then(function (snapshot) {
        var result = Object.values(snapshot.val());
        console.log(
          "🚀 ~ file: DonorHomeScreen.jsx ~ line 51 ~ result",
          result
        );
        // setDriverData(result);
      });
  };
  React.useEffect(() => {
    getCurrentLoc();
    // getOrgList();
    return () => {
      null;
    };
  });
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
      <View style={{ zIndex: Platform.OS === "ios" ? 40 : 60 }}>
        <Text style={styles.title}>Organization</Text>
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
              hidden: true,
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
          placeholder='select organization'
          containerStyle={{ height: 40, width: 200 }}
          style={{ width: 200 }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setSelectCloth(item.value)}
        />
      </View>
      <View style={{ zIndex: Platform.OS === "ios" ? 30 : 40 }}>
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
                hidden: true,
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
            containerStyle={{ height: 40 }}
            style={styles.dropDown}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => setClothValue(item.value)}
          />
        </View>
      </View>
      <View style={{ zIndex: Platform.OS === "ios" ? 20 : 30 }}>
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
      <View style={{ zIndex: Platform.OS === "ios" ? 10 : 20 }}>
        <Text style={styles.title}>Amount</Text>
        <View style={{ alignItems: "center" }}>
          <DropDownPicker
            items={[
              {
                label: "100",
                value: "100",
                icon: () => (
                  <FontAwesome
                    name='money'
                    size={18}
                    color={Customization.color.tint}
                  />
                ),
              },
              {
                label: "200",
                value: "200",
                icon: () => (
                  <FontAwesome
                    name='money'
                    size={18}
                    color={Customization.color.tint}
                  />
                ),
              },
              {
                label: "500",
                value: "500",
                icon: () => (
                  <FontAwesome
                    name='money'
                    size={18}
                    color={Customization.color.tint}
                  />
                ),
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
    fontSize: Customization.fontSize.title,
    fontWeight: "bold",
    color: Customization.color.tint,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 5,
    // marginLeft: 20,
    // marginRight: 20,
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
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: Customization.color.white,
  },
});
