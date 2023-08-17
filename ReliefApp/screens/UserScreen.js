import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc, Timestamp, increment, arrayUnion  } from 'firebase/firestore';
import { auth, db } from '../firebase';

const UserScreen = () => {
  const [transports, setTransports] = useState([]);
  const [user, setUser] = useState(null);
  
  const fetchTransports = async () => {
    const userId = auth.currentUser?.email;
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    setUser(userSnapshot.data());

    const q = query(
      collection(db, 'transports'),
      where('volunteerId', '==', userId)
    );

    const transportsSnapshot = await getDocs(q);
    const transportData = [];

    for(let transportDoc of transportsSnapshot.docs) {
      const transport = transportDoc.data();
      const donationDocRef = doc(db, 'donations', transport.donationId);
      const donationDoc = await getDoc(donationDocRef);

      let donationSubCategory, donationLocation, donationAmount = null;

      if (donationDoc.exists && donationDoc.data()) {
        donationSubCategory = donationDoc.data().subCategory;
        donationLocation = donationDoc.data().location;
        donationAmount = donationDoc.data().amount;
      } else {
        console.log(`Donation with ID: ${transport.donationId} does not exist or data is undefined`);
      }

      const needDocRef = doc(db, 'needs', transport.needId);
      const needDoc = await getDoc(needDocRef);

      let needSubCategory, needLocation, needAmount = null;

      if (needDoc.exists && needDoc.data()) {
        needSubCategory = needDoc.data().subCategory;
        needLocation = needDoc.data().location;
        needAmount = needDoc.data().amount;
      } else {
        console.log(`Need with ID: ${transport.needId} does not exist or data is undefined`);
      }

      transportData.push({
        id: transportDoc.id,
        ...transport,
        donationSubCategory, 
        donationLocation,
        donationAmount,
        needSubCategory,
        needLocation,
        needAmount
      });
    }

    setTransports(transportData);
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleCompleteClick = async (transportId, donationId, needId) => {
    try {
      await updateDoc(doc(db, 'transports', transportId), { status: 'completed' });
      
      const userDocRef = doc(db, 'users', auth.currentUser.email);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
          await updateDoc(userDocRef, { 
              completedTransports: increment(1), 
              transportHistory: arrayUnion({
                  transportId,
                  donationId,
                  needId,
                  completedAt: Timestamp.now(),
              })
          });
      } else {
          console.log('User document does not exist!');
      }

      await deleteDoc(doc(db, 'donations', donationId));
      await deleteDoc(doc(db, 'needs', needId));
      fetchTransports();
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const inProgressTransports = transports.filter(transport => transport.status !== 'completed');
  const completedTransports = transports.filter(transport => transport.status === 'completed');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Transports {user?.completedTransports}</Text>
      <Text style={styles.title}>Completed Transports: {user?.completedTransports}</Text>
      <Text style={styles.subTitle}>In Progress:</Text>
      {inProgressTransports.length > 0 ? (
      <FlatList
        data={inProgressTransports}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.donationAmount} {item.donationSubCategory}</Text>
            <Text style={styles.itemDetail}>Status: {item.status}</Text>
            <Text style={styles.itemDetail}>From: {item.donationLocation}</Text>
            <Text style={styles.itemDetail}>To: {item.needLocation}</Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleCompleteClick(item.id, item.donationId, item.needId)}
            >
              <Text style={styles.buttonText}>Mark as Completed</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      ) : (
        <Text>No active transports.</Text>
      )}

      <Text style={styles.subTitle}>Completed:</Text>
      {completedTransports.length > 0 ? (
      <FlatList
      data={completedTransports}
      renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Transport ID: {item.id}</Text>
            <Text style={styles.itemDetail}>Status: {item.status}</Text>
            <Text style={styles.itemDetail}>Status: {item.donationLocation}</Text>

          </View>
        )}
        keyExtractor={item => item.id}
      />
      ) : (
        <Text>No completed transports.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 20,
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    width: '80%',
    width: '70%',
    justifyContent: 'center', 
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 16,
    marginBottom: 3,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  buttonContainer: {
    backgroundColor: '#f84242',
    padding: 10,
    marginVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserScreen;
