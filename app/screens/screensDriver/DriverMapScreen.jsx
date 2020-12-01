import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  StatusBar,
} from "react-native";
import { SearchBar } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function DriverMapScreen() {
  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [search, setSearch] = React.useState("");

  const getCurrentLoc = async () => {
    await Location.requestPermissionsAsync()
      .then(async function ({ status }) {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        await Location.getCurrentPositionAsync({})
          .then(function ({ coords }) {
            if (coords) {
              console.log(
                "🚀 ~ file: DriverMapScreen.jsx ~ line 19 ~ coords",
                coords
              );
              setLatitude(coords.latitude);
              setLongitude(coords.longitude);
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

  React.useEffect(() => {
    getCurrentLoc();
  }, []);

  return (
    <View style={styles.container}>
      {latitude ? (
        <>
          {/* <StatusBar backgroundColor='rgba(1.0, 0, 0, 0.2)' translucent /> */}
          <SearchBar
            placeholder='Type Here...'
            onChangeText={(search) => setSearch(search)}
            value={search}
          />
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              pinColor={"purple"} // any color
              title={"Your Location"}
              description={"you a here"}
            />
          </MapView>
        </>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
});
