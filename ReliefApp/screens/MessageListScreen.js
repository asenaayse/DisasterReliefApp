/*import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';

const MessageListScreen = ({ navigation }) => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchConversations = async () => {
            // Here, we're fetching all conversations for simplicity. Adjust as needed.
            const conversationsSnapshot = await getDocs(collection(db, 'conversations'));
            setConversations(conversationsSnapshot.docs.map(doc => doc.data()));
        };

        fetchConversations();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList 
                data={conversations}
                renderItem={({ item }) => (
                    <Button 
                        title={`Chat with ${item.userEmail}`} 
                        onPress={() => navigation.navigate('Messages', {userEmail: item.userEmail})} 
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});

export default MessageListScreen;
*/


/*
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';

const MessageListScreen = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Fetch messages involving the current user
    const fetchConversations = async () => {
      const userConversationsSnapshot = await getDocs(query(
        collection(db, 'messages'),
        where('from', '==', auth.currentUser.email)
      ));
      
      // Combine with the messages where the current user is the recipient
      const receivedConversationsSnapshot = await getDocs(query(
        collection(db, 'messages'),
        where('to', '==', auth.currentUser.email)
      ));

      const combinedConversations = [
        ...userConversationsSnapshot.docs.map(doc => doc.data()),
        ...receivedConversationsSnapshot.docs.map(doc => doc.data())
      ];
      
      setConversations(combinedConversations);
    };

    fetchConversations();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList 
        data={conversations}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>{item.from === auth.currentUser.email ? "To: " : "From: "}{item.from === auth.currentUser.email ? item.to : item.from}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    messageContainer: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#f2f2f2',
        marginVertical: 4
    },
});

export default MessageListScreen;
*/

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
    // You may need to modify this logic to get the unique list of conversations 
    const messagesSnapshot = await getDocs(collection(db, 'messages'));
    const allMessages = messagesSnapshot.docs.map(doc => doc.data());

    let latestMessagesByUser = {};

    allMessages.forEach(message => {
        let otherUser = message.from === auth.currentUser.email ? message.to : message.from;

        if (!latestMessagesByUser[otherUser] || message.timestamp > latestMessagesByUser[otherUser].timestamp) {
            latestMessagesByUser[otherUser] = message;
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
                        onPress={() => navigation.navigate('Message', { userEmail: item.from === auth.currentUser.email ? item.to : item.from })}
                        style={styles.listItem}
                    >
                        <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/10307/10307911.png'}} style={styles.avatar}/> 
                        <View style={styles.messageInfo}>
                            <Text style={styles.name}>{item.from === auth.currentUser.email ? item.to : item.from}</Text>
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