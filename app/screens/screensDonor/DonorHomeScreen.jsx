import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
// import firebase from "firebase";
import { Customization } from "../../config/Customization";
import Button from "react-native-button";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

export default function DonorHomeScreen() {
  const [donorLoc, setDonorLoc] = React.useState([]);
  const [country, setCountry] = React.useState(["Pakistan"]);
  const [value, setValue] = React.useState("pakistan");
  const [items, setItems] = React.useState([
    {
      label: "CHILDREN",
      value: "children",
      icon: () => <Icon name="" size={18} color="#900" />,
      hidden: true,
    },
    {
      label: "MEN",
      value: "men",
      icon: () => <Icon name="flag" size={18} color="#900" />,
    },
    {
      label: "WOMEN",
      value: "women",
      icon: () => <Icon name="flag" size={18} color="#900" />,
    },
    {
      label: "MISC",
      value: "misc",
      icon: () => <Icon name="flag" size={18} color="#900" />,
    },
  ]);
  let controller;

  const SendRequest = () => {
    console.log(SendRequest);
  };

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Enter your location"
          onChangeText={(text) => setDonorLoc(text)}
          value={donorLoc}
          placeholderTextColor={Customization.color.grey}
          underlineColorAndroid="transparent"
        />
      </View>
      <DropDownPicker
        items={items}
        controller={(instance) => (controller = instance)}
        onChangeList={(items, callback) => {
          new Promise((resolve, reject) => resolve(setItems(items)))
            .then(() => callback())
            .catch(() => {});
        }}
        defaultValue={value}
        onChangeItem={(item) => setValue(item.value)}
      />
      <Text style={styles.title}>Donation Type</Text>
      {/* <DropDownPicker
        items={[
          {
            label: "CHILDREN",
            value: "children",
            icon: () => <Icon name="" size={18} color="#900" />,
            hidden: true,
          },
          {
            label: "MEN",
            value: "men",
            icon: () => <Icon name="flag" size={18} color="#900" />,
          },
          {
            label: "WOMEN",
            value: "women",
            icon: () => <Icon name="flag" size={18} color="#900" />,
          },
          {
            label: "MISC",
            value: "misc",
            icon: () => <Icon name="flag" size={18} color="#900" />,
          },
        ]}
        defaultValue={state.organization}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: "#fafafa" }}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={{ backgroundColor: "#fafafa" }}
        onChangeItem={(item) =>
          setState({
            organization: item.value,
          })
        }
      /> */}
      {/* <Button
    containerStyle={styles.clothesContainer}
    style={styles.clothesText}
    onPress={() => props.navigation.navigate("")}
  >
    Clothes
  </Button>
  <Button
    containerStyle={styles.moneyContainer}
    style={styles.moneyText}
    onPress={() => props.navigation.navigate("")}
  >
    Money
 </Button> */}
      <View style={styles.buttonContainer}>
        <Button
          title="Send Request"
          color={Customization.color.tint}
          onPress={SendRequest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
