import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  Image,
} from "react-native";
import Form from "./Form";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons"; // https://icons.expo.fyi/
import { Button, Header, Icon, Card, Divider } from "react-native-elements";

const deviceWidth = Dimensions.get("screen").width;

const HomeScreenUI = ({ auth, clickSignOut, navigation }) => {
  const [formType, setFormType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Header
        centerComponent={{
          text: `Welcome, ${auth.currentUser?.email}`,
          style: { color: "#fff" },
        }}
        rightComponent={{
          icon: "logout",
          color: "#fff",
          onPress: clickSignOut,
        }}
        containerStyle={{ backgroundColor: "#f84242" }}
      />

      <View style={styles.container}>
        <FontAwesome5 name="hands-helping" size={100} color="#f84242" />
        {/* First row */}

        <Text style={styles.explanationText}>
          Welcome to ReliefApp, where we ease disaster relief coordination by
          connecting people seeking assistance with those offering aid.
          {"\n"}You can request or donate essentials like food, water, shelter,
          and medical aid.
          {"\n"}You can also see them on the map, and find a route to the
          nearest donor / person in need.
        </Text>

        <View style={styles.buttonRow}>
          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("User");
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/user_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setFormType("needs");
                setIsModalVisible(true);
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/request_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Make a Request</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setFormType("donations");
                setIsModalVisible(true);
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/donation_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Make a Donation</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Mark");
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/map_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Go to Map</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second row */}
        <View style={styles.buttonRow}>
          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Requested Items");
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/request_list_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Requested Items</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Available Items");
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/donation_list_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Available Items</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("Distributor");
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/courier_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Volunteer Couriers</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.miniContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("MessageList");
              }}
            >
              <Image
                source={require("../../assets/HomeIcons/chat_icon_white.png")}
                style={styles.iconImage}
              />
              <Text style={styles.buttonText}>Conversations</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <FontAwesome5 name="times" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Form
                formType={formType}
                closeModal={() => setIsModalVisible(false)}
                auth={auth}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
export default HomeScreenUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginTop: 15,
  },
  miniContainer: {
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f84242",
    width: "60%",
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
    marginTop: 10,
    borderColor: "black",
    width: deviceWidth > 800 ? 250 : "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  explanationText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  signOutButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: deviceWidth > 800 ? 250 : "60%",
  },
  signOutButtonText: {
    textDecorationLine: "underline",
    color: "black",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: deviceWidth * 0.5,
    height: "60%",
    width: "20%"
  },
  modalHeader: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 60,
    height: 80,
  },
});
