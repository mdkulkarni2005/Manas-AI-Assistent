import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { IconButton } from 'react-native-paper';

const ImageUploadComponent = ({ onUpload }) => {
  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onUpload(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <IconButton icon="image" size={24} onPress={handleImageUpload} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});

export default ImageUploadComponent;