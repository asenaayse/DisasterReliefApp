import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../firebase';
import { addDoc, collection } from "firebase/firestore";

const categories = {
  medical: ['painkiller', 'bandage'],
  heating: ['blanket', 'electric_heater'],
  shelter: ['tent', 'container'],
  nutrition: ['food', 'water'],
};

const Form = ({ formType , closeModal}) => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmit = async () => {
    try {
        const docRef = await addDoc(collection(db, formType), {
        category,
        subCategory,
        amount,
        location,
        expirationDate,
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
    <View>
      <Text>Category:</Text>
      <Picker
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
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>

    
    </View>




  )
}

export default Form;

const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      width: '100%',
    },
    submitButton: {
      backgroundColor: '#FFD600',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 15,
      borderColor: 'black',
    },
    submitButtonText: {
      color: 'black',
      fontWeight: '700',
      fontSize: 16,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
        borderColor: 'black',
      },
      closeButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      
  });
  
