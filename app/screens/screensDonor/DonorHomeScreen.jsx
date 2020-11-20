import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
// import firebase from "firebase";
import Button from "react-native-button";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";
import * as Location from "expo-location";

import { Customization } from "../../config/Customization";

export default function DonorHomeScreen() {
  const [donorLoc, setDonorLoc] = React.useState("");
  const SendRequest = () => {
    console.log("SendRequest");
  };
  const getCurrentPos = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      const loc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      const res = await Location.reverseGeocodeAsync(loc);
      setDonorLoc(`${res[0].street}, ${res[0].city}`);
    }
  };

  React.useEffect(() => {
    getCurrentPos();
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   console.log(
    //     "navigator.geolocation.getCurrentPosition -> position",
    //     position
    //   );
    // });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <Image
          source={require("../../assets/location.png")}
          style={{ width: 30, height: 30, marginTop: 6, marginLeft: 7 }}
        />
        <TextInput
          style={styles.body}
          placeholder='Your current location..'
          onChangeText={(text) => setDonorLoc(text)}
          value={donorLoc}
          placeholderTextColor={Customization.color.grey}
          inlineImageLeft='ic_menu_black_24dp'
          inlineImagePadding={2}
          underlineColorAndroid='transparent'
        />
      </View>

      <Text style={styles.title}>Donation Type</Text>
      <DropDownPicker
        items={[
          {
            label: "USA",
            value: "usa",
            icon: () => <Icon name='flag' size={18} color='#900' />,
            hidden: true,
          },
          {
            label: "UK",
            value: "uk",
            icon: () => <Icon name='flag' size={18} color='#900' />,
          },
          {
            label: "France",
            value: "france",
            icon: () => <Icon name='flag' size={18} color='#900' />,
          },
        ]}
        defaultValue=''
        containerStyle={{ height: 40, width: 150 }}
        style={styles.dropdown}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(item) => console.log(item.label, item.value)}
      />
      <View style={styles.requestButton}>
        <Button color={Customization.color.tint} onPress={SendRequest}>
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
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  InputContainer: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginTop: 30,
    width: Customization.textInputWidth.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: Customization.color.text,
  },
  dropdown: {
    backgroundColor: "#fafafa",
  },
  requestButton: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  // clothesContainer: {
  //   width: Customization.buttonWidth.main,
  //   backgroundColor: Customization.color.tint,
  //   borderRadius: Customization.borderRadius.main,
  //   padding: 10,
  //   marginTop: 30,
  // },
  // clothesText: {
  //   color: Customization.color.white,
  // },
  // moneyContainer: {
  //   width: Customization.buttonWidth.main,
  //   backgroundColor: Customization.color.white,
  //   borderRadius: Customization.borderRadius.main,
  //   padding: 8,
  //   borderWidth: 1,
  //   borderColor: Customization.color.tint,
  //   marginTop: 15,
  // },
  // moneyText: {
  //   color: Customization.color.tint,
  // },
});
