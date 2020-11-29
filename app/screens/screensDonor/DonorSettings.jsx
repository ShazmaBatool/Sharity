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
<<<<<<< HEAD
import AntDesign from "react-native-vector-icons/AntDesign";
import DialogInput from "react-native-dialog-input";
import firebase from "firebase";

import { AuthContext } from "../../../context";
import { Customization } from "../../config/Customization";

export default function DonorSettings({ navigation }) {
  const [displayName, setDisplayName] = React.useState("Julia");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const { signOut } = React.useContext(AuthContext);

  const userInfo = () => {
    const user = firebase.auth().currentUser;
    setDisplayName(user.displayName);
    setEmail(user.email);
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
=======
import firebase from "firebase";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { AuthContext } from "../../../context";
import { Customization } from "../../config/Customization";

export default function DonorSettings({ navigation }) {
  const [displayName, setDisplayName] = React.useState("Julia");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const { signOut } = React.useContext(AuthContext);

  const userInfo = () => {
    const user = firebase.auth().currentUser;
    setDisplayName(user.displayName);
    setPhoneNumber(user.phoneNumber);
    setEmail(user.email);
    setPhotoURL(user.photoURL);
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
<<<<<<< HEAD
              ]}>
              {displayName}
            </Title>
            <Caption style={styles.caption}>{email}</Caption>
=======
              ]}
            >
              {displayName}
            </Title>
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
<<<<<<< HEAD
          <Icon name='email' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
        </View>
        <View style={styles.row}>
          <Icon name='map-marker-radius' color='#777777' size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>Punjab</Text>
=======
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {phoneNumber}
          </Text>
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
<<<<<<< HEAD
          ]}>
=======
          ]}
        >
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
<<<<<<< HEAD
          onPress={() => navigation.navigate("EditProfileDonor")}>
          <View style={styles.menuItem}>
            <Icon
              name='account-edit'
              color={Customization.color.tint}
              size={25}
            />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => setIsDialogVisible(true)}>
          <View style={styles.menuItem}>
            <Icon
              name='key-change'
              color={Customization.color.tint}
              size={25}
            />
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={alertDelete}>
          <View style={styles.menuItem}>
            <AntDesign
              name='deleteuser'
              color={Customization.color.tint}
              size={25}
            />
=======
          onPress={() => navigation.navigate("EditProfileDonor")}
        >
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#bb2265" size={25} />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("ChangePassword")}>
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#bb2265" size={25} />
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#bb2265" size={25} />
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
            <Text style={styles.menuItemText}>Delete Account</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => signOut()}>
          <View style={styles.menuItem}>
<<<<<<< HEAD
            <AntDesign
              name='logout'
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
=======
            <Icon name="logout" color="#bb2265" size={25} />
            <Text style={styles.menuItemText}>Sign Out</Text>
          </View>
        </TouchableRipple>
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
=======
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
>>>>>>> f21caf030278b14ba3a42a64e74103899aafada0
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
