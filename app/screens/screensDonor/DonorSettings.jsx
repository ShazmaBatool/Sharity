import React from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DialogInput from "react-native-dialog-input";
import firebase from "firebase";

import { AuthContext } from "../../../context";
import { Customization } from "../../config/Customization";

export default function DonorSettings({ navigation }) {
  const [displayName, setDisplayName] = React.useState("Julia");
  const [phone, setPhone] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const { signOut } = React.useContext(AuthContext);

  const userInfo = () => {
    const user = firebase.auth().currentUser;
    setDisplayName(user.displayName);
    setPhone(user.phone);
    setPhotoURL(user.photoURL);
  };
  React.useEffect(() => {
    userInfo();
    return () => {
      null;
    };
  });

  const alertDelete = () => {
    Alert.alert(
      "Delete Account",
      "You will not be able to recover it.",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirm",
          onPress: () => deleteUser(),
        },
      ],
      { cancelable: false }
    );
  };
  const deleteUser = () => {
    var user = firebase.auth().currentUser;
    user
      .delete()
      .then(function () {
        navigation.replace("WelcomeDonor");
      })
      .catch(function (error) {
        Alert.alert(error.toString());
      });
  };
  const changeUserPassword = (newPassword) => {
    var user = firebase.auth().currentUser;

    user
      .updatePassword(newPassword)
      .then(function () {
        // Update successful.
        setIsDialogVisible(false);
      })
      .catch(function (error) {
        // An error happened.
        Alert.alert(error.toString());
      });
  };
  React.useEffect(() => {
    userInfo();
    return () => {
      null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: photoURL
                ? photoURL
                : "https://res.cloudinary.com/wfdns6x2g6/image/upload/v1509007989/user_psolwi.png",
            }}
            size={80}
            style={{ backgroundColor: Customization.color.tint }}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {displayName}
            </Title>
            <Caption style={styles.caption}>{phone}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{phone}</Text>
        </View>
        {/* <View style={styles.row}>
          <Icon name='map-marker-radius' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>Punjab</Text>
        </View> */}
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>11</Title>
          <Caption>Donation Successful</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Request Pending</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={() => navigation.navigate("EditProfileDonor")}
        >
          <View style={styles.menuItem}>
            <Icon
              name="account-edit"
              color={Customization.color.tint}
              size={25}
            />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => setIsDialogVisible(true)}>
          <View style={styles.menuItem}>
            <Icon
              name="key-change"
              color={Customization.color.tint}
              size={25}
            />
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={alertDelete}>
          <View style={styles.menuItem}>
            <AntDesign
              name="deleteuser"
              color={Customization.color.tint}
              size={25}
            />
            <Text style={styles.menuItemText}>Delete Account</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => signOut()}>
          <View style={styles.menuItem}>
            <AntDesign
              name="logout"
              color={Customization.color.tint}
              size={25}
            />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
        {isDialogVisible && (
          <DialogInput
            isDialogVisible={isDialogVisible}
            title={"Change Password"}
            message={"Please enter new password"}
            hintInput={"New password"}
            submitInput={(inputText) => {
              changeUserPassword(inputText);
            }}
            closeDialog={() => {
              setIsDialogVisible(false);
            }}
          />
        )}
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
