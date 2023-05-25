import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";

const deviceWidth = Dimensions.get('window').width;

const categories = {
  medical: ['painkiller', 'bandage'],
  heating: ['blanket', 'electric_heater'],
  shelter: ['tent', 'container'],
  nutrition: ['food', 'water'],
};

const categoryInformation = {
  medical: {
    painkiller: {maxAmount: 1, unit: "packet"},
    bandage: {maxAmount: 2, unit: "rolls"},
  },
  heating: {
    blanket: {maxAmount: 3, unit:"blanket(s)"},
    electric_heater: {maxAmount: 1, unit:"heater(s)"},
  },
  shelter: {
    tent: {maxAmount: 1, unit:"tent(s)"},
    container: {maxAmount: 1, unit:"container(s)"},
  },
  nutrition: {
    food: {maxAmount: 4, unit: "per_person"},
    water: {maxAmount: 4, unit: "2L_bottle(s)"}
  },
};

const Form = ({ formType , closeModal}) => {
  let formFormtype = formType;
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState(''); 
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');


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
  
    if (formFormtype == "needs" && parseInt(amount) > maxAmount) {
      setError(`You can request at most ${maxAmount} ${unit} of ${subCategory}.`);
      return ;
    } else {
      setError('');
    }
    

    // use local variables so that we can get the most recent value
    let formCategory = category;
    let formSubCategory = subCategory;
    let formAmount = amount;
    let formLocation = location;
    let formExpirationDate = expirationDate;

    try {
        const docRef = await addDoc(collection(db, formType), {
        formCategory,
        formSubCategory,
        formAmount,
        formLocation,
        formExpirationDate,
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
    keyboardType="numeric"
    value={amount}
    onChangeText={setAmount}
    style={styles.input}
  />
  <Text>Location:</Text>
  <TextInput value={location} onChangeText={setLocation} style={styles.input} />
  {category === 'nutrition' && (
    <>
      <Text>Expiration Date (YYYY-MM-DD):</Text>
      <TextInput
        value={expirationDate}
        onChangeText={setExpirationDate}
        style={styles.input}
      />
    </>
  )}
  {subCategory === 'painkiller' && (
    <>
      <Text>Expiration Date (YYYY-MM-DD):</Text>
      <TextInput
        value={expirationDate}
        onChangeText={setExpirationDate}
        style={styles.input}
      />
    </>
  )}
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
width: 200,
},
formStyle: {
flexGrow: 1,
justifyContent: 'center',
alignItems: 'center',
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,
marginBottom: 15,
width: deviceWidth > 800 ? 250 : '80%',
},
picker: {
  width: deviceWidth > 800 ? 250 : '80%',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  marginBottom: 15,
},
submitButton: {
backgroundColor: '#f84242',
padding: 10,
borderRadius: 5,
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
  borderRadius: 5,
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

/*import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Form from './Form'
import React, {useState} from 'react'


const HomeScreenUI = ({auth, clickSignOut}) => {
  
  const [formType, setFormType] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Text>Welcome {auth.currentUser?.email} </Text>

      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          setFormType('needs');
          setIsModalVisible(true);
        }}
        
      >
        <Text style = {styles.buttonText}>I need something...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.button}
        onPress={() => {
          setFormType('donations');
          setIsModalVisible(true);
        }}
      >
        <Text style = {styles.buttonText}>I want to donate something...</Text>
      </TouchableOpacity>
      
     
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Form formType={formType} closeModal={() => setIsModalVisible(false)} />
      </Modal>




      <TouchableOpacity
        style = {styles.signOutButton}
        onPress = {clickSignOut}
      >
        <Text style = {styles.signOutButtonText}>Sign out</Text>

      </TouchableOpacity>
      
    </View>
  )
}

export default HomeScreenUI

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#FFD600',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    borderColor: 'black'
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
  },
  signOutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  signOutButtonText: {
    textDecorationLine: 'underline',
    color: 'black', 
  },

}) */ 

