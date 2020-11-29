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
<<<<<<< HEAD
// import firebase from "firebase";
import Button from "react-native-button";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
=======
import firebase from "firebase";
import { Customization } from "../../config/Customization";
import Button from "react-native-button";
import DropDownPicker from "react-native-dropdown-picker";
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import firebase from "firebase";

import { Customization } from "../../config/Customization";

export default function DonorHomeScreen() {
  const [donorLoc, setDonorLoc] = React.useState("");
<<<<<<< HEAD
  const [amount, setAmount] = React.useState("");
  const [selectCloth, setSelectCloth] = React.useState("");
  const [clothValue, setClothValue] = React.useState("");
  const [selectShoes, setSelectShoes] = React.useState("");
  const [shoesValue, setShoesValue] = React.useState("");
  const [orgList, setOrgList] = React.useState([]);
=======
  // const [country, setCountry] = React.useState(["Pakistan"]);
  const [amount, setAmount] = React.useState(null);
  // const [donationType, setDonationType] = React.useState("");
  const [verifiedEmail, setVerifiedEmail] = React.useState(false);
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0

  const SendRequest = () => {
    console.log("SendRequest");
    console.log("Cloth", selectCloth);
    console.log("Shoes", selectShoes);
    console.log("Amount", amount);
    Alert.alert("Request send successful");
  };
<<<<<<< HEAD

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
=======
  const getCurrentLoc = async () => {
    const user = firebase.auth().currentUser;
    console.log(user.emailVerified);
    if (user.emailVerified == true) {
      setVerifiedEmail(true);
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location) {
        const loc = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        const result = await Location.reverseGeocodeAsync(loc);
        setDonorLoc(`${result[0].street}, ${result[0].city}`);
      }
    } else {
      Alert.alert("Please verify your email first.");
    }
  };
  React.useEffect(() => {
    getCurrentLoc();
  });
  if (!verifiedEmail) {
    return (
      <View>
        <Text> Verify your email first. </Text>
      </View>
    );
  }
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
<<<<<<< HEAD
=======
      <View style={{ zIndex: Platform.OS === "ios" ? 40 : 60 }}>
        <Text style={styles.title}>Organization List</Text>

        <DropDownPicker
          items={[
            {
              label: "CHILDREN",
              value: "children",
              icon: () => <FontAwesome name="child" size={18} color="#900" />,
              hidden: true,
            },
            {
              label: "MEN",
              value: "men",
              icon: () => <FontAwesome name="male" size={18} color="#900" />,
            },
            {
              label: "WOMEN",
              value: "women",
              icon: () => <FontAwesome name="female" size={18} color="#900" />,
            },
          ]}
          defaultValue=""
          placeholder="Select Organization"
          containerStyle={{ height: 40, width: 200 }}
          style={{ width: 200 }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}

          // onChangeItem={(item) =>
          //   setState({
          //     organization: item.value,
          //   })
          // }
        />
      </View>

>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
      <View style={{ zIndex: Platform.OS === "ios" ? 30 : 40 }}>
        <Text style={styles.title}>Clothes</Text>
        <View style={styles.dropDownContainer}>
          <DropDownPicker
            items={[
              {
                label: "CHILDREN",
                value: "children",
<<<<<<< HEAD
                icon: () => (
                  <FontAwesome
                    name='child'
                    size={18}
                    color={Customization.color.tint}
                  />
                ),
=======
                icon: () => <FontAwesome name="child" size={18} color="#900" />,
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
                hidden: true,
              },
              {
                label: "MEN",
                value: "men",
<<<<<<< HEAD
                icon: () => (
                  <AntDesign
                    name='man'
                    size={18}
                    color={Customization.color.tint}
                  />
                ),
=======
                icon: () => <FontAwesome name="male" size={18} color="#900" />,
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
              },
              {
                label: "WOMEN",
                value: "women",
                icon: () => (
<<<<<<< HEAD
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
=======
                  <FontAwesome name="female" size={18} color="#900" />
                ),
              },
            ]}
            defaultValue=""
            containerStyle={{ height: 40, width: 150 }}
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
            style={styles.dropDown}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
<<<<<<< HEAD
            onChangeItem={(item) => setSelectCloth(item.value)}
=======
            zIndex={30}
            // onChangeItem={(item) =>
            //   setState({
            //     organization: item.value,
            //   })
            // }
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
<<<<<<< HEAD
            defaultValue=''
            placeholder='select quantity'
            containerStyle={{ height: 40 }}
=======
            defaultValue=""
            containerStyle={{ height: 40, width: 150 }}
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
<<<<<<< HEAD
                icon: () => (
                  <FontAwesome
                    name='child'
                    size={18}
                    color={Customization.color.tint}
                  />
                ),
=======
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
<<<<<<< HEAD
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
=======
                label: "200",
                value: "200",
                // icon: () => <Icon name="" size={18} color="#900" />,
                hidden: true,
              },
              {
                label: "400",
                value: "400",
                // icon: () => <Icon name="" size={18} color="#900" />,
              },
              {
                label: "600",
                value: "600",
                // icon: () => <Icon name="" size={18} color="#900" />,
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
<<<<<<< HEAD
    marginBottom: 5,
    // marginLeft: 20,
    // marginRight: 20,
=======
    marginBottom: 20,
    // marginLeft: 20,
    // marginRight: 20, For Center
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
