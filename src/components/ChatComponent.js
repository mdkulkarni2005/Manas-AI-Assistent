import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

const ChatComponent = ({ messages }) => {
  return (
    <View style={styles.container}>
      {messages.map((message, index) => (
        <Card key={index} style={styles.card}>
          {message.type === 'image' ? (
            <Card.Cover source={{ uri: message.uri }} />
          ) : (
            <Paragraph>{message.text}</Paragraph>
          )}
        </Card>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  card: {
    marginVertical: 8,
  },
});

export default ChatComponent;