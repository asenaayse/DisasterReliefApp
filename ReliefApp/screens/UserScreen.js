/*import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc,Timestamp, increment, arrayUnion  } from 'firebase/firestore';
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
      where('volunteerId', '==', userId),
      where('status', '!=', 'completed') 
    );

    const transportsSnapshot = await getDocs(q);
    setTransports(transportsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleCompleteClick = async (transportId, donationId, needId) => {
    await updateDoc(doc(db, 'transports', transportId), { status: 'completed' });
    await updateDoc(doc(db, 'users', auth.currentUser.uid), { 
      completedTransports: increment(1),  
      transportHistory: arrayUnion({
        transportId,
        donationId,
        needId,
        completedAt: Timestamp.now(),
      })
    });
    try {
        await deleteDoc(doc(db, 'donations', donationId));
        console.log(`Deleted donation with ID: ${donationId}`);
        await deleteDoc(doc(db, 'needs', needId));
        console.log(`Deleted need with ID: ${needId}`);
        fetchTransports();
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
  };

  return (
  <View style={styles.container}>
    <Text style={styles.title}>Completed Transports: {user?.completedTransports}</Text>
    
    // In Progress Transports 
    <Text style={styles.subTitle}>In Progress:</Text>
    {(() => {
      const inProgressTransports = transports.filter(transport => transport.status !== 'completed');
      return (
        <FlatList
          data={inProgressTransports}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Transport ID: {item.id}</Text>
              <Text style={styles.itemDetail}>Status: {item.status}</Text>
<View style={styles.buttonWrapper}>
		<TouchableOpacity
    		style={styles.buttonContainer}
    		onPress={() => handleCompleteClick(item.id, item.donationId, item.needId)}
  		>
    		<Text style={styles.buttonText}>Mark as Completed</Text>
  		</TouchableOpacity>
</View>
             </View>
          )}
          keyExtractor={item => item.id}
        />
      );
    })()}

    //Completed Transports 
    <Text style={styles.subTitle}>Completed:</Text>
    {(() => {
      const completedTransports = transports.filter(transport => transport.status === 'completed');
      return (
        <FlatList
          data={completedTransports}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Transport ID: {item.id}</Text>
              <Text style={styles.itemDetail}>Status: {item.status}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      );
    })()}

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
    width: '60%',
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
    width: '50%',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default UserScreen;
*/

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc,Timestamp, increment, arrayUnion  } from 'firebase/firestore';
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
      where('volunteerId', '==', userId),
      
    );

    const transportsSnapshot = await getDocs(q);
    const transportData = [];

    for(let transportDoc of transportsSnapshot.docs) {
      const transport = transportDoc.data();
      const donationDoc = await getDoc(doc(db, 'donations', transport.donationId));
          if (!donationDoc.exists) {
            console.warn(`Donation with ID: ${transport.donationId} does not exist`);
            continue;
          }

      const needDoc = await getDoc(doc(db, 'needs', transport.needId));
          if (!needDoc.exists) {
            console.warn(`Need with ID: ${transport.needId} does not exist`);
            continue;
          }

      transportData.push({
        id: transportDoc.id,
        ...transport,
        donationSubCategory: donationDoc.data().subCategory,
        donationLocation: donationDoc.data().location,
        donationAmount: donationDoc.data().amount,
        needLocation: needDoc.data().location,
        
      });
      
    }
  
    setTransports(transportData);
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleCompleteClick = async (transportId, donationId, needId) => {
    try {
      console.log('Updating transport document');
      await updateDoc(doc(db, 'transports', transportId), { status: 'completed' });
      console.log('Updating user document');
      
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        
        completedTransports: increment(1),
        transportHistory: arrayUnion({
          transportId,
          donationId,
          needId,
          completedAt: Timestamp.now(),
        })
      });
      console.log('Deleting donation document');
      await deleteDoc(doc(db, 'donations', donationId));
      console.log(`Deleted donation with ID: ${donationId}`);
      console.log('Deleting need document');
      await deleteDoc(doc(db, 'needs', needId));
      console.log(`Deleted need with ID: ${needId}`);
      fetchTransports();
    } catch (error) {
      console.error("Error updating or deleting document: ", error);
    }
  };

  return (
  <View style={styles.container}>
    <Text style={styles.title}>Completed Transports: {user?.completedTransports}</Text>
    
    {/* In Progress Transports */}
    <Text style={styles.subTitle}>In Progress:</Text>
    {(() => {
        const inProgressTransports = transports.filter(transport => transport.status !== 'completed');
    return inProgressTransports.length > 0 ? (
        <FlatList
          data={inProgressTransports}
          renderItem={({ item }) => (
        <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Transport Status: {item.status}</Text>
              <Text style={styles.itemDetail}>{item.donationAmount} {item.donationSubCategory}</Text>
              <Text style={styles.itemDetail}>From: {item.donationLocation} </Text>
              <Text style={styles.itemDetail}>To: {item.needLocation}</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => handleCompleteClick(item.id, item.donationId, item.needId)}
              >
                <Text style={styles.buttonText}>Mark as Completed</Text>
              </TouchableOpacity>
            </View>
        </View>
          )}
          keyExtractor={item => item.id}
        />
  ):
       (<Text>There is no active transport</Text>);
    })()}

    {/* Completed Transports */}
    <Text style={styles.subTitle}>Completed:</Text>
{(() => {
  const completedTransports = transports.filter(transport => transport.status === 'completed');
  return completedTransports.length > 0 ? (
        <FlatList
          data={completedTransports}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemTitle}>Transport ID: {item.id}</Text>
              <Text style={styles.itemDetail}>Status: {item.status}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
    />
  ) : (
    <Text>There is no completed transport</Text>
  );
})()}

  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: '400',

  },
subTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 10,
},
 buttonContainer: {
    width: '50%',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default UserScreen;
