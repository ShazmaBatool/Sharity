import React from "react";
import { Alert, StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import axios from "axios";

export default function DriverMapScreen() {
  const [latitude, setLatitude] = React.useState(33.6);
  const [longitude, setLongitude] = React.useState(73.0);
  const [search, setSearch] = React.useState("");
  const [markers, setMarkers] = React.useState([]);
  const [category, setCategory] = React.useState("mypat");
  const [lat, setLat] = React.useState(33.7);
  const [long, setLong] = React.useState(73.0);
  const [routeForMap, setRouteForMap] = React.useState([]);
  const [summary, setSummary] = React.useState();
  // const GOOGLE_MAPS_APIKEY = "AIzaSyCBQ4IiB4i3USwpYwN03O7YjeOy8dJFqzc";
  const GOOGLE_MAPS_APIKEY = "AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8";
  const YOUR_API_KEY = "UGsHAH9dlC3hI6bmfxjHN_DcMt-u84Z8gLhFOkyMw7U";
  const PUT_YOUR_APP_CODE_HERE = "rcz6ByZuZUl54OHikIm0";

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
    // _getRoute();
    if (category === "mypath") {
      getCurrentLoc();
    } else {
      getCoordinates();
    }
  }, []);

  const getCoordinates = () => {
    getCurrentLoc();
    _getRoute();
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
  const _getRoute = () => {
    let from_lat = parseFloat(latitude);
    let from_long = parseFloat(longitude);
    let to_lat = parseFloat(lat);
    let to_long = parseFloat(long);
    // we will save all Polyline coordinates in this array
    let route_coordinates = [];
    axios
      .get(
        `https://route.ls.hereapi.com/routing/7.2/calculateroute.json?apikey=${YOUR_API_KEY}&waypoint0=geo!${latitude},${longitude}&waypoint1=geo!${lat},${long}&mode=fastest;car;traffic:disabled&legAttributes=shape`
      )
      .then((res) => {
        // here we are getting all route coordinates from API response
        res.data.response.route[0].leg[0].shape.map((m) => {
          let latlong = m.split(",");
          let latitude = parseFloat(latlong[0]);
          let longitude = parseFloat(latlong[1]);
          route_coordinates.push({ latitude: latitude, longitude: longitude });
        });
        var summary = res.data.response.route[0].summary;
        setRouteForMap(route_coordinates);
        setSummary(summary);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      {latitude ? (
        <>
          {/* <SearchBar
            placeholder='Type Here...'
            onChangeText={(search) => setSearch(search)}
            value={search}
          /> */}
          {/* <MapView
            style={styles.mapStyle}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
            zoomEnabled={true}
            // onUserLocationChange={(event) => console.log(event.nativeEvent)}
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
          </MapView> */}
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}>
            <Polyline
              coordinates={routeForMap}
              strokeWidth={2}
              strokeColors={["red", "black"]}
              // geodesic={true}
            />
            <Marker
              coordinate={{
                latitude: lat,
                longitude: long,
              }}
              title='Starting location'
            />
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              title='Finishlocation'
            />
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
