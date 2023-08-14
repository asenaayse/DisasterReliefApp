import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native"; // import the hook

const MapScreen = () => {
  const [donations, setAvailableItems] = useState([]);
  const [needs, setRequestedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [travelRoute, setTravelRoute] = useState(null);
  const [destination, setDestination] = useState("");
  const [start, setStart] = useState("");
  const navigation = useNavigation(); // define the hook
  const routeLimit = React.useRef(0);

  useEffect(() => {
    const fetchItems = async () => {
      // Fetch available items
      const donationsSnapshot = await getDocs(collection(db, "donations"));
      const donationsData = donationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableItems(donationsData);

      // Fetch requested items
      const needsSnapshot = await getDocs(collection(db, "needs"));
      const needsData = needsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequestedItems(needsData);
    };

    fetchItems();
  }, []);

  const directionsCallback = (travelRoute) => {
    if (travelRoute !== null) {
      if (travelRoute.status === "OK" && routeLimit.current === 0) {
        routeLimit.current++;
        setTravelRoute(travelRoute);
      }
    }
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.044404,
    lng: 29.036189,
  };

  const handleButtonClick = () => {
    // navigate to 'DetailScreen' with the selected item as a parameter
    navigation.navigate("Profile", { item: selectedItem });
  };
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD7cc54lrevO7ObNjdDovzlSuPqlP-JJ-c"
      libraries={["geometry", "drawing", "places"]}
    >
      <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
        {donations.map((item) => (
          <Marker
            key={item.id}
            position={{ lat: item.locationLat, lng: item.locationLng }}
            icon={
              item.subCategory === "Electric_Heater"
                ? { url: require("../assets/MapIcons/heater_donation.svg") }
                : item.subCategory === "Blanket"
                ? { url: require("../assets/MapIcons/blanket_donation.svg") }
                : item.subCategory === "Painkiller"
                ? { url: require("../assets/MapIcons/painkiller_donation.svg") }
                : item.subCategory === "Bandage"
                ? { url: require("../assets/MapIcons/bandaid_donation.svg") }
                : item.subCategory === "Tent"
                ? { url: require("../assets/MapIcons/tent_donation.svg") }
                : item.subCategory === "Container"
                ? { url: require("../assets/MapIcons/container_donation.svg") }
                : item.subCategory === "Food"
                ? { url: require("../assets/MapIcons/food_donation.svg") }
                : item.subCategory === "Water"
                ? { url: require("../assets/MapIcons/water_donation.svg") }
                : {
                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  }
            }
            //icon={{url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}}
            onClick={() => {
              setSelectedItem(item);
            }}
          />
        ))}

        {needs.map((item) => (
          <Marker
            key={item.id}
            position={{ lat: item.locationLat, lng: item.locationLng }}
            icon={
              item.subCategory === "Electric_Heater"
                ? { url: require("../assets/MapIcons/heater_need.svg") }
                : item.subCategory === "Blanket"
                ? { url: require("../assets/MapIcons/blanket_need.svg") }
                : item.subCategory === "Painkiller"
                ? { url: require("../assets/MapIcons/painkiller_need.svg") }
                : item.subCategory === "Bandage"
                ? { url: require("../assets/MapIcons/bandaid_need.svg") }
                : item.subCategory === "Tent"
                ? { url: require("../assets/MapIcons/tent_need.svg") }
                : item.subCategory === "Container"
                ? { url: require("../assets/MapIcons/container_need.svg") }
                : item.subCategory === "Food"
                ? { url: require("../assets/MapIcons/food_need.svg") }
                : item.subCategory === "Water"
                ? { url: require("../assets/MapIcons/water_need.svg") }
                : {
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }
            }
            //icon={{url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}}
            onClick={() => {
              setSelectedItem(item);
            }}
          />
        ))}

        {selectedItem && (
          <InfoWindow
            position={{
              lat: selectedItem.locationLat,
              lng: selectedItem.locationLng,
            }}
            onCloseClick={() => {
              setSelectedItem(null);
            }}
          >
            <div>
              <h2>{"Contact: " + selectedItem.name}</h2>
              <p>
                {selectedItem.category +
                  " - " +
                  selectedItem.amount +
                  " " +
                  selectedItem.subCategory}
              </p>
              <button
                onClick={() =>
                  navigation.navigate("Personal", {
                    userEmail: selectedItem.name,
                  })
                }
              >
                Go to Profile
              </button>
              <button
                onClick={() => {
                  setStart(
                    "" +
                      selectedItem.locationLat +
                      "," +
                      selectedItem.locationLng
                  );
                  routeLimit.current = 0;
                }}
              >
                {" "}
                Set as start point
              </button>
              <button
                onClick={() => {
                  setDestination(
                    "" +
                      selectedItem.locationLat +
                      "," +
                      selectedItem.locationLng
                  );
                  routeLimit.current = 0;
                }}
              >
                {" "}
                Set as destination
              </button>
            </div>
          </InfoWindow>
        )}

        {destination !== "" && start !== "" && (
          <DirectionsService
            options={{
              origin: start,
              destination: destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
              drivingOptions: {
                departureTime: new Date(),
              },
            }}
            callback={directionsCallback}
          />
        )}

        {travelRoute !== null && (
          <DirectionsRenderer
            options={{
              directions: travelRoute,
              suppressMarkers: true,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapScreen;
