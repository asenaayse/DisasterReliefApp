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
    setTransports(transportsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleCompleteClick = async (transportId, donationId, needId) => {
    try {
      await updateDoc(doc(db, 'transports', transportId), { status: 'completed' });
    
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
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

  return (
  <View style={styles.container}>
    <Text style={styles.title}>Completed Transports: {user?.completedTransports}</Text>
    <Text style={styles.subTitle}>In Progress:</Text>
    <FlatList
      data={transports.filter(transport => transport.status !== 'completed')}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Transport ID: {item.id}</Text>
          <Text style={styles.itemDetail}>Status: {item.status}</Text>
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

    <Text style={styles.subTitle}>Completed:</Text>
    <FlatList
      data={transports.filter(transport => transport.status === 'completed')}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Transport ID: {item.id}</Text>
          <Text style={styles.itemDetail}>Status: {item.status}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
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
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
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
