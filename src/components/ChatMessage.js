import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChatMessage = ({ message, isUser, isImage, isTyping }) => {
  return (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
      {isImage ? (
        <Image source={{ uri: message }} style={styles.image} />
      ) : (
        <Text style={isTyping ? styles.typingText : styles.messageText}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 16,
  },
  typingText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#999',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default ChatMessage;