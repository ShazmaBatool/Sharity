import React from "react";
import { Button, Linking, StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

import { Customization } from "../../config/Customization";

export default function DonorEmailVerification() {
  const [domain, setDomain] = React.useState();
  const getUserEmail = () => {
    const user = firebase.auth().currentUser;
    const emailDomain = user.email;
    var gmailDomain = emailDomain.includes("gmail");
    var yahooDomain = emailDomain.includes("yahoo");
    if (gmailDomain) {
      setDomain("gmail");
    } else if (yahooDomain) {
      setDomain("yahoo");
    }
  };
  const goToEmailLink = () => {
    if (domain === "gmail") {
      Linking.openURL("https://mail.google.com/mail/u/0/#inbox");
    } else if (domain === "yahoo") {
      Linking.openURL("https://login.yahoo.com/");
    }
  };
  React.useEffect(() => {
    getUserEmail();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Verify your email first...!</Text>
      <Button onPress={goToEmailLink} title='go to your email' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: Customization.color.tint,
  },
});
