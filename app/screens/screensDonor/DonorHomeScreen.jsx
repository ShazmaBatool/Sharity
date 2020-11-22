import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from "react-native";
// import firebase from "firebase";
import { Customization } from "../../config/Customization";
import Button from "react-native-button";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";

export default function DonorHomeScreen() {
  const [donorLoc, setDonorLoc] = React.useState("");
  // const [country, setCountry] = React.useState(["Pakistan"]);
  const [amount, setAmount] = React.useState(null);
  // const [donationType, setDonationType] = React.useState("");

  const SendRequest = () => {
    console.log(SendRequest);
  };
  const getCurrentLoc = async () => {
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
  };
  React.useEffect(() => {
    getCurrentLoc();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <Image
          source={require("../../assets/pin.png")}
          style={{ width: 30, height: 30, marginTop: 6, marginLeft: 7 }}
        />
        <TextInput
          style={styles.body}
          placeholder="Enter your location"
          onChangeText={(text) => setDonorLoc(text)}
          value={donorLoc}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <View>
        <Text style={styles.title}>Clothes</Text>
        <View style={styles.dropDownContainer}>
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
                icon: () => (
                  <FontAwesome name="female" size={18} color="#900" />
                ),
              },
            ]}
            defaultValue=""
            containerStyle={{ height: 40, width: 150 }}
            style={styles.dropDown}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            zIndex={30}
            // onChangeItem={(item) =>
            //   setState({
            //     organization: item.value,
            //   })
            // }
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
            defaultValue=""
            containerStyle={{ height: 40, width: 150 }}
            style={styles.dropDown}
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
        <Text style={styles.title}>Shoes</Text>
        <View style={styles.dropDownContainer}>
          <DropDownPicker
            items={[
              {
                label: "CHILDREN",
                value: "children",
              },
              {
                label: "MEN",
                value: "men",
                // icon: () => <Icon name="" size={18} color="#900" />,
              },
              {
                label: "WOMEN",
                value: "women",
                // icon: () => <Icon name="" size={18} color="#900" />,
              },
            ]}
            defaultValue=""
            containerStyle={{ height: 40, width: 150 }}
            style={styles.dropDown}
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

          <DropDownPicker
            items={[
              {
                label: "1",
                value: "children",
                // icon: () => <Icon name="" size={18} color="#900" />,
                hidden: true,
              },
              {
                label: "2",
                value: "men",
                // icon: () => <Icon name="" size={18} color="#900" />,
              },
              {
                label: "3",
                value: "women",
                // icon: () => <Icon name="" size={18} color="#900" />,
              },
            ]}
            defaultValue=""
            containerStyle={{ height: 40, width: 150 }}
            style={styles.dropDown}
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
        <Text style={styles.title}>Amount</Text>
        <View style={{ alignItems: "center", marginLeft: 10 }}>
          <DropDownPicker
            items={[
              {
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
              },
            ]}
            defaultValue=""
            containerStyle={{ height: 40, width: 150 }}
            style={styles.dropDown}
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
      </View>

      <View style={styles.requestButton}>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          color={Customization.color.tint}
          onPress={SendRequest}
        >
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
    // justifyContent: "center",
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
    width: Customization.textInputWidth.main,
    marginTop: 30,
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  body: {
    height: 42,
    paddingLeft: 20,
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
