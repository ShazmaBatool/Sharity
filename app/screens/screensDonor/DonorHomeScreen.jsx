import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
// import firebase from "firebase";
import { Customization } from "../../config/Customization";
import Button from "react-native-button";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Feather";

export default function DonorHomeScreen() {
  const [donorLoc, setDonorLoc] = React.useState("");
  const [country, setCountry] = React.useState(["Pakistan"]);
  const [amount, setAmount] = React.useState();
  // const [donationType, setDonationType] = React.useState("");

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
      <view>
        <Text style={styles.title}>Donation Type</Text>
        <DropDownPicker
          items={[
            {
              label: "CHILDREN",
              value: "children",
              icon: () => <Icon name="FontAwesome" size={18} color="#900" />,
              hidden: true,
            },
            {
              label: "MEN",
              value: "men",
              icon: () => <Icon name="Entypo" size={18} color="#900" />,
            },
            {
              label: "WOMEN",
              value: "women",
              icon: () => <Icon name="Ionicons" size={18} color="#900" />,
            },
          ]}
          defaultValue="Clothes"
          containerStyle={{ height: 40, width: 150 }}
          style={styles.dropDown}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) =>
            setState({
              organization: item.value,
            })
          }
        />
        <DropDownPicker
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
              icon: () => <Icon name="" size={18} color="#900" />,
            },
            {
              label: "WOMEN",
              value: "women",
              icon: () => <Icon name="" size={18} color="#900" />,
            },
          ]}
          defaultValue="Shoes"
          containerStyle={{ height: 40, width: 150 }}
          style={styles.dropDown}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) =>
            setState({
              organization: item.value,
            })
          }
        />
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Enter amount"
            onChangeText={(text) => setAmount(text)}
            value={amount}
            placeholderTextColor={Customization.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
      </view>

      <View>
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
    // borderWidth: 1,
    borderStyle: "solid",
    borderColor: Customization.color.grey,
    borderRadius: Customization.borderRadius.main,
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: Customization.color.text,
  },
  dropDown: {
    backgroundColor: "#fafafa",
    flex: 1,
    width: 150,
  },
});
