import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { IconButton } from 'react-native-paper';

const CameraComponent = ({ onCapture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onCapture(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} />
      <IconButton icon="camera" size={24} onPress={handleCapture} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  camera: {
    height: 200,
    width: '100%',
  },
});

export default CameraComponent;