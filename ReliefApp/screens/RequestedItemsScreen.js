import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import ModalDropdown from 'react-native-modal-dropdown';

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
    <ModalDropdown
          options={Object.keys(categories)}
          defaultValue={selectedCategory || "Select a category"}
          onSelect={(index, value) => handleCategoryChange(value)}
          textStyle={styles.textStyle}
          dropdownStyle={styles.dropdownStyle}
          containerStyle={styles.pickerStyle}

          />
        <ModalDropdown
          options={selectedCategory ? categories[selectedCategory] : []}
          defaultValue={selectedSubCategory || "Select a sub-category"}
          onSelect={(index, value) => setSelectedSubCategory(value)}
          textStyle={styles.textStyle}
          dropdownStyle={styles.dropdownStyle}
          containerStyle={styles.pickerStyle}

          />
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
    height: 50,
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginVertical: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

},
textStyle: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    padding: 5,
    
},
dropdownStyle: {
    padding: 20,
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginTop: -5,
    shadowColor: "black",
    shadowOffset: {
        width: 2,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
  filterLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
    justifyContent: 'center',
    alignItems: 'center',
    width: '110%',
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  itemContainer: {
    borderRadius: 10,
    padding: 7,
    marginVertical: 5,
    width: '90%',
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
