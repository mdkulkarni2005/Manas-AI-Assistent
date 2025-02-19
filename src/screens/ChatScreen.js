import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  Modal,
} from 'react-native';
import { IconButton, ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatMessage from '../components/ChatMessage';
import { initializeGeminiAI } from '../config/gemini';
import Voice from '@react-native-voice/voice';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (result) => {
    setInputText(result.value[0]);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      setModalVisible(true);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setModalVisible(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMessages([...messages, { text: result.uri, isUser: true, isImage: true }]);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

    setIsLoading(true);
    try {
      const genAI = initializeGeminiAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const result = await model.generateContent(userMessage);
      const response = result.response;
      const aiMessage = await response.text();

      setMessages(prev => [...prev, { text: aiMessage, isUser: false }]);
      
      // Save chat history
      await AsyncStorage.setItem('chatHistory', JSON.stringify([
        ...messages,
        { text: userMessage, isUser: true },
        { text: aiMessage, isUser: false }
      ]));
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isUser: false 
      }]);
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isUser={message.isUser}
            isImage={message.isImage}
          />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage}>
          <IconButton icon="camera" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={startListening}>
          <IconButton icon="microphone" size={24} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          multiline
        />
        <IconButton
          icon="send"
          size={24}
          disabled={isLoading || !inputText.trim()}
          onPress={sendMessage}
        />
      </View>
      {isLoading && <ActivityIndicator animating={true} style={styles.loading} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Listening...</Text>
          <TouchableOpacity onPress={stopListening}>
            <IconButton icon="stop-circle" size={50} />
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    maxHeight: 100,
  },
  loading: {
    position: 'absolute',
    bottom: 60,
    left: '50%',
    transform: [{ translateX: -12 }],
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
});

export default ChatScreen;