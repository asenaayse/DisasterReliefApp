import React, { useEffect, useState } from 'react';
import { Button,View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db, auth } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const deviceWidth = Dimensions.get('window').width;

const categories = {
  Medical: ['Painkiller', 'Bandage'],
  Heating: ['Blanket', 'Electric_Heater'],
  Shelter: ['Tent', 'Container'],
  Nutrition: ['Food', 'Water'],
};

const categoryInformation = {
  Medical: {
    Painkiller: {maxAmount: 1, unit: "packet"},
    Bandage: {maxAmount: 2, unit: "rolls"},
  },
  Heating: {
    Blanket: {maxAmount: 3, unit:"blanket(s)"},
    Electric_Heater: {maxAmount: 1, unit:"heater(s)"},
  },
  Shelter: {
    Tent: {maxAmount: 1, unit:"tent(s)"},
    Container: {maxAmount: 1, unit:"container(s)"},
  },
  Nutrition: {
    Food: {maxAmount: 4, unit: "per_person"},
    Water: {maxAmount: 4, unit: "2L_bottle(s)"}
  },
};

const Form = ({ formType , closeModal, auth}) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState(''); 
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
 
  const handleSubmit = async () => {
    
    // fill all fields
    if (!category || !subCategory || !amount || !location) {
      setError('All fields must be filled!');
      return;
    }
    // amount should be an integer
    const parsedAmount = parseInt(amount);

    if (!Number.isInteger(parsedAmount)) {
      setError('Amount must be an integer.');
      return;
    }
    // validate the amount
    const maxAmount = categoryInformation[category][subCategory].maxAmount;
    const unit = categoryInformation[category][subCategory].unit;
  
    if (formType == "needs" && parseInt(amount) > maxAmount) {
      setError(`You can request at most ${maxAmount} ${unit} of ${subCategory}.`);
      return ;
    } else {
      setError('');
    }

    let locationData;
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBjGooTZ-oIqvByiGphFubfMcYNtYpksxY`);
   // const lat = response.data.results[0].geometry.location.lat
   // const lng = response.data.results[0].geometry.location.lng;
   // locationData = lat + ',' + lng + longName ;
      const longName = response.data.results[0].formatted_address;
      locationData = longName;
    } catch (error) {
      console.log(error);
    }
	
	let locationLat;
	try{
	  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBjGooTZ-oIqvByiGphFubfMcYNtYpksxY`);
	  const lat = response.data.results[0].geometry.location.lat;
	  locationLat = lat;
	} catch(error){
		console.log(error);
	}
	let locationLng;
	try{
	  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBjGooTZ-oIqvByiGphFubfMcYNtYpksxY`);
	  const lng = response.data.results[0].geometry.location.lng;
	  locationLng = lng;
	} catch(error){
		console.log(error);
	}
    

   try {
    const docRef = await addDoc(collection(db, formType), {
      name: auth.currentUser?.email, // Include the user's name here
      category: category,
      subCategory: subCategory,
      amount: amount,
      location: locationData,
      expirationDate: expirationDate,
	  locationLat: locationLat,
	  locationLng: locationLng,
    });
      Alert.alert('Success', 'Your request has been submitted!');
      console.log('Document written with ID: ', docRef.id);
      closeModal();
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'There was an error submitting your request.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" :"height"}
      style={styles.container}
    >
    <ScrollView contentContainerStyle={styles.formStyle}>
     {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
     <Text>Category:</Text>
     <Picker
    style={styles.input}
    selectedValue={category}
    onValueChange={(itemValue) => {
      setCategory(itemValue);
      setSubCategory('');
    }}
  >
    <Picker.Item label="Select a category" value="" />
    {Object.keys(categories).map((cat) => (
      <Picker.Item key={cat} label={cat} value={cat} />
    ))}
  </Picker>
  {category && (
    <>
      <Text>Subcategory:</Text>
      <Picker
      style={styles.input}
        selectedValue={subCategory}
        onValueChange={(itemValue) => setSubCategory(itemValue)}
      >
        <Picker.Item label="Select a subcategory" value="" />
        {categories[category].map((sub) => (
          <Picker.Item key={sub} label={sub} value={sub} />
        ))}
      </Picker>
    </>
  )}
  <Text>Amount:</Text>
  <TextInput
  placeholder="Enter amount"
    keyboardType="numeric"
    value={amount}
    onChangeText={setAmount}
    style={styles.input}
  />
  <Text>Location:</Text>
  <TextInput
  placeholder="Enter your location"
  onChangeText={text => setLocation(text)}
  style={styles.input}
/>


  {subCategory === 'Food' && (
    <>
      <Text>Expiration Date (YYYY-MM-DD):</Text>
      <TextInput
        value={expirationDate}
        onChangeText={setExpirationDate}
        style={styles.input}
      />
    </>
  )}
  {subCategory === 'Painkiller' && (
    <>
      <Text>Expiration Date (YYYY-MM-DD):</Text>
      <TextInput
        value={expirationDate}
        onChangeText={setExpirationDate}
        style={styles.input}
      />
    </>    
  )  
  }  
  <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
    <Text style={styles.submitButtonText}>Submit</Text>
  </TouchableOpacity>
  
  <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
    <Text style={styles.closeButtonText}>Close</Text>
  </TouchableOpacity>
  
</ScrollView>
</KeyboardAvoidingView>
);
};

export default Form;

const styles = StyleSheet.create({
container: {
flex: 1,
width: deviceWidth > 800 ? 250 : '160%',
},
formStyle: {
flexGrow: 1,
justifyContent: 'center',
alignItems: 'center',
width: deviceWidth > 800 ? 250 : '100%',

},
input: {
borderWidth: 0.5,
borderColor: '#ccc',
borderRadius: 20,
padding: 7,
marginBottom: 7,
width: deviceWidth > 800 ? 250 : '90%',
padding: 10,
},
picker: {
  width: deviceWidth > 800 ? 250 : '100%',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 20,
  marginBottom: 15,
  
},
submitButton: {
backgroundColor: '#f84242',
padding: 10,
borderRadius: 20,
alignItems: 'center',
marginTop: 15,
borderColor: 'black',
width: deviceWidth > 800 ? 250 : '80%',
},
submitButtonText: {
  color: 'black',
  fontWeight: '700',
  fontSize: 16,
},
closeButton: {
  backgroundColor: '#f84242',
  padding: 10,
  borderRadius: 20,
  alignItems: 'center',
  marginTop: 15,
  borderColor: 'black',
  width: deviceWidth > 800 ? 250 : '80%',
},
closeButtonText: {
color: 'black',
fontWeight: '700',
fontSize: 16,
},
});

