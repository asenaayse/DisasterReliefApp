import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Picker } from '@react-native-picker/picker';

const categories = {
  Medical: ['Painkiller', 'Bandage'],
  Heating: ['Blanket', 'Electric_Heater'],
  Shelter: ['Tent', 'Container'],
  Nutrition: ['Food', 'Water']
};

const RequestedItemsScreen = ({ navigation }) => {
  const [needs, setRequestedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'needs'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequestedItems(items);
    });

    return () => unsubscribe();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory(""); 
  };
  const filteredItems = needs.filter(item => 
    (!selectedCategory || item.category === selectedCategory) &&
    (!selectedSubCategory || item.subCategory === selectedSubCategory)
  );

const renderItem = ({ item }) => (
  <View>
    <View style={styles.itemContainer}>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.subCategory}>{item.subCategory}</Text>
      <Text style={styles.name}>Contact: {item.name}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
     

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Map', { location: item.location })}
        >
          <Text style={styles.buttonText}>Go to Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Personal', {  userEmail: item.name  })}
        >
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

  return (
    <View style={styles.container}>
         <Picker 
        style={styles.pickerStyle}
        selectedValue={selectedCategory}
       onValueChange={(itemValue) => setSelectedCategory(itemValue)}

      >
        <Picker.Item label="Select Category" value="" />
        {Object.keys(categories).map((cat) => <Picker.Item key={cat} label={cat} value={cat} />)}
      </Picker>

      
      <Picker
        style={styles.pickerStyle}
        selectedValue={selectedSubCategory}
        onValueChange={(itemValue) => setSelectedSubCategory(itemValue)}
      >
        <Picker.Item label="Select Sub-Category" value="" />
        {selectedCategory && categories[selectedCategory] && categories[selectedCategory].map((subCat) => 
          <Picker.Item key={subCat} label={subCat} value={subCat} />
        )}
      </Picker>

      

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );

};

export default RequestedItemsScreen;

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pickerStyle: {
    height: 25,
    width: '70%',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 5,
  },
  filterLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    borderRadius: 10,
    padding: 7,
    marginVertical: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3
  },
  category: { 
    fontWeight: 'bold',
    fontSize: 18,
  },
  subCategory: {
    fontSize: 16,
    marginBottom: 3,
  },
  name:{
    marginBottom: 5,
  },
  location: {
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#f84242',
    padding: 7,
    borderRadius: 20,
    marginVertical: 5,
    flex: 1,
    marginRight: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'cover',
  },
};
