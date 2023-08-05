/*import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';  

const ChatScreen = ({ route }) => {
  const { userEmail } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const authInstance = getAuth();  

  useEffect(() => {
    // Fetch messages between current user and userEmail
    // For simplicity, this example fetches all messages without pagination
    const fetchMessages = async () => {
      const messagesSnapshot = await getDocs(query(
        collection(db, 'messages'),
        where('from', '==', authInstance.currentUser.email),
        where('to', '==', userEmail),
        orderBy('timestamp', 'asc')
      ));
      setMessages(messagesSnapshot.docs.map(doc => doc.data()));
    };

    fetchMessages();
  }, [userEmail]);

  const sendMessage = async () => {
    await addDoc(collection(db, 'messages'), {
      from: authInstance.currentUser.email,
      to: userEmail,
      message: newMessage,
      timestamp: Date.now(),
      read: false
    });
    setNewMessage(''); 
  };

  return (
    <View style={styles.container}>
            <FlatList 
                data={messages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text>{item.message}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.messageInput}
                    value={newMessage} 
                    onChangeText={setNewMessage} 
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    messageInput: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginRight: 10
    }
});

export default ChatScreen;
*/

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';

const ChatScreen = ({ route }) => {
  const { userEmail } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, [userEmail]);

  const fetchMessages = async () => {
    const messagesSnapshot = await getDocs(query(
      collection(db, 'messages'),
      where('from', 'in', [auth.currentUser.email, userEmail]),
      where('to', 'in', [auth.currentUser.email, userEmail]),
      orderBy('timestamp', 'asc')
    ));
    setMessages(messagesSnapshot.docs.map(doc => doc.data()));
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, 'messages'), {
      from: auth.currentUser.email,
      to: userEmail,
      message: newMessage,
      timestamp: Date.now(),
      read: false
    });
    setNewMessage('');
    fetchMessages();
  };

  const renderMessageItem = ({ item }) => (
    <View style={[
      styles.messageContainer, 
      item.from === auth.currentUser.email ? styles.outgoingMessage : styles.incomingMessage
    ]}>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.messageInput}
          value={newMessage} 
          onChangeText={setNewMessage} 
          placeholder="Type a message..."
        />
        <TouchableOpacity
          style={styles.button}
          onPress={sendMessage}
          >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#e6e6e6', 
  },
  messageContainer: {
    padding: 15,
    borderRadius: 25,
    marginVertical: 4,
    width: '70%',
    alignSelf: 'flex-end',
  },
  outgoingMessage: {
    backgroundColor: '#DCF8C7',  
    marginRight: 10,
  },
  incomingMessage: {
    backgroundColor: '#FFFFFF',  
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageInput: {
    flex: 3,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#f84242',
    padding: 15,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    alignItems: 'center',
    width: '10%',

  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    
  },
});

export default ChatScreen;
