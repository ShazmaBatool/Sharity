import React from "react";
import { Alert, StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

export default function DriverMapScreen() {
  const [latitude, setLatitude] = React.useState(33.639267);
  const [longitude, setLongitude] = React.useState(73.087999);
  const [search, setSearch] = React.useState("");
  const [markers, setMarkers] = React.useState([]);
  const [category, setCategory] = React.useState("mypat");
  const [lat, setLat] = React.useState(33.720001);
  const [long, setLong] = React.useState(73.059998);
  const GOOGLE_MAPS_APIKEY = "AIzaSyCBQ4IiB4i3USwpYwN03O7YjeOy8dJFqzc";

  const getCurrentLoc = async () => {
    await Location.requestPermissionsAsync()
      .then(async function ({ status }) {
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        await Location.getCurrentPositionAsync({})
          .then(function ({ coords }) {
            if (coords) {
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
    if (category === "mypath") {
      getCurrentLoc();
    } else {
      getCoordinates();
    }
  }, []);

  const getCoordinates = () => {
    getCurrentLoc();
    var marker = [
      {
        title: "My Location",
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
      },
      {
        title: "Target Location",

        coordinates: {
          latitude: 33.720001,
          longitude: 73.059998,
        },
      },
    ];
    setMarkers(marker);
  };
  return (
    <View style={styles.container}>
      {latitude ? (
        <>
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
            showsUserLocation={true}
            zoomEnabled={true}
            onUserLocationChange={(event) => console.log(event.nativeEvent)}
            followUserLocation={true}>
            <MapViewDirections
              origin={{ latitude: 33.639267, longitude: 73.087999 }}
              destination={{ latitude: 33.720001, longitude: 73.059998 }}
              strokeColor='black'
              strokeWidth={3}
              apikey={GOOGLE_MAPS_APIKEY}
            />
            {markers.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.coordinates.latitude,
                    longitude: marker.coordinates.longitude,
                  }}
                  draggable
                  title={marker.title}
                />
              );
            })}
          </MapView>
        </>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Loading map...</Text>
        </View>
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
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
});
