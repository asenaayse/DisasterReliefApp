import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

const MessageListScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    const currentUserEmail = auth.currentUser.email;

    const q = query(
      collection(db, 'messages'),
      where('to', '==', currentUserEmail)
    );

    const messagesSnapshot = await getDocs(q);
    const receivedMessages = messagesSnapshot.docs.map(doc => doc.data());

    let latestMessagesByUser = {};

    receivedMessages.forEach(message => {
      if (!latestMessagesByUser[message.from] || message.timestamp > latestMessagesByUser[message.from].timestamp) {
        latestMessagesByUser[message.from] = message;
      }
    });

    setConversations(Object.values(latestMessagesByUser));
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={conversations}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('Message', { userEmail: item.from })}
            style={styles.listItem}
          >
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/10307/10307911.png'}} style={styles.avatar}/> 
            <View style={styles.messageInfo}>
              <Text style={styles.name}>{item.from}</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.messageSnippet}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  messageInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  messageSnippet: {
    color: 'grey',
  },
});

export default MessageListScreen;
