import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";

import { Countries } from "../../config/Countries";
import firebaseConfig from "../../../Firebase";

export default Register = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCountries, setDataCountries] = useState(Countries);
  const [codeCountry, setCodeCountry] = useState("+92");
  const [placeholder, setPlaceholder] = useState("333 111 1111");
  const [verifyError, setVerifyError] = React.useState();
  const [verifyInProgress, setVerifyInProgress] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const recaptchaVerifier = React.useRef(null);
  let textInput = useRef(null);

  // const signUpWithEmail = (email, password) => {
  //   try {
  //     firebase.auth().createUserWithEmailAndPassword(email, password);
  //   } catch (error) {
  //     console.log("signUpWithEmail -> error", error);
  //   }
  // };

  const onShowHideModal = () => {
    setModalVisible(!modalVisible);
  };

  const onPressContinue = async () => {
    const phone = codeCountry + phoneNumber;
    if (phone) {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      try {
        setVerificationId("");
        const verificationId = await phoneProvider.verifyPhoneNumber(
          phone,
          recaptchaVerifier.current
        );
        setVerifyError(false);
        setVerifyInProgress(false);
        setVerificationId(verificationId);
        // verificationCodeTextInput.current?.focus();
        navigation.navigate("InputOTP", {
          verificationId: verificationId,
        });
      } catch (err) {
        setVerifyError(err);
        setVerifyInProgress(false);
      }
    }
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  const filterCountries = (value) => {
    if (value) {
      const countryData = dataCountries.filter(
        (obj) => obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1
      );
      setDataCountries(countryData);
    } else {
      setDataCountries(Countries);
    }
  };
  const onCountryChange = (item) => {
    setCodeCountry(item.dialCode);
    setPlaceholder(item.mask);
    onShowHideModal();
  };

  const renderModal = () => {
    return (
      <Modal animationType='slide' transparent={false} visible={modalVisible}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder='filter'
                focusable={true}
                style={styles.filterInputStyle}
              />
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={styles.countryModalStyle}>
                    <View style={styles.modalItemContainer}>
                      <Text style={styles.modalItemName}>{item.en}</Text>
                      <Text style={styles.modalItemCode}>{item.dialCode}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={onShowHideModal}
            style={styles.closeButtonStyle}>
            <Text style={styles.closeTextStyle}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={"padding"}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTitle}>
          {"Please input your mobile phone number"}
        </Text>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <View style={styles.containerInput}>
          <TouchableOpacity onPress={onShowHideModal}>
            <View style={styles.openDialogView}>
              <Text>{codeCountry + " |"}</Text>
            </View>
          </TouchableOpacity>
          {renderModal()}
          <TextInput
            ref={(input) => (textInput = input)}
            style={styles.phoneInput}
            placeholder={placeholder}
            editable={!verificationId}
            keyboardType='numeric'
            value={phoneNumber}
            onChangeText={(number) => setPhoneNumber(number)}
            secureTextEntry={false}
            onFocus={() => setFocusInput(true)}
            onBlur={() => setFocusInput(false)}
            autoFocus={focusInput}
          />
        </View>
        <View style={styles.viewButton}>
          <TouchableOpacity onPress={onPressContinue}>
            <View
              style={[
                styles.btnContinue,
                {
                  backgroundColor:
                    phoneNumber.length === 10 ? "#244DB7" : "grey",
                },
              ]}>
              <Text style={{ color: "#fff", alignItems: "center" }}>
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {verifyError && (
          <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
        )}
        {verifyInProgress && <ActivityIndicator style={styles.loader} />}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#244DB7",
  },
  openDialogView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneInput: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },
  viewButton: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 50,
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#244DB7",
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: "white",
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  countryModalStyle: {
    flex: 1,
    borderColor: "black",
    borderTopWidth: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: "row",
  },
  modalItemName: {
    flex: 1,
    fontSize: 16,
  },
  modalItemCode: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonStyle: {
    padding: 12,
    alignItems: "center",
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  loader: {
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
});
