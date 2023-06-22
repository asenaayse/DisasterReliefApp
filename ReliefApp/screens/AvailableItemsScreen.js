import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const AvailableItemsScreen = ({ navigation }) => {
  const [donations, setAvailableItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'donations'), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailableItems(items);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
<TouchableOpacity onPress={() => navigation.navigate('Map', { location: item.location })}>

      <View style={styles.itemContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.subCategory}>{item.subCategory}</Text>
        <Text style={styles.location}>Location: {item.location}</Text>
        <Text style={styles.name}>Contact: {item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={donations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default AvailableItemsScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
  category: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subCategory: {
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    fontStyle: 'italic',
  },
};
