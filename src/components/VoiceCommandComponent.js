import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Voice from '@react-native-voice/voice';
import { IconButton } from 'react-native-paper';

const VoiceCommandComponent = ({ onCommand }) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setModalVisible(true);
  };

  const onSpeechEnd = () => {
    setModalVisible(false);
  };

  const onSpeechResults = (result) => {
    setModalVisible(false);
    onCommand(result.value[0]);
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

  return (
    <View style={styles.container}>
      <IconButton icon="microphone" size={24} onPress={startListening} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
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

export default VoiceCommandComponent;