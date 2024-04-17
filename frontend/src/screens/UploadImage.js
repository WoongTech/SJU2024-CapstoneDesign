import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ErrorMessage, Customtext, TakePhoto, Button } from '../components';
import { Image, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;
const GUIDE_TEXT = '사진 선택';

const UploadImage = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [takePhotoModal, SetTakePhotoModal] = useState(false);

  useEffect(() => {
    setDisabled(images.length === 0 || !!errorMessage);
  }, [images, errorMessage]);

  useEffect(() => {
    setErrorMessage(images.length === 0 ? '사진을 선택해주세요' : '');
  }, [images]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets) {
      setImages((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  return takePhotoModal ? (
    <TakePhoto checkModal={SetTakePhotoModal} setImages={setImages} />
  ) : (
    <Container>
      <Customtext text={GUIDE_TEXT} />
      <ScrollView horizontal>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} />
        ))}
      </ScrollView>
      <Button title="갤러리에서 사진 선택" onPress={pickImage} />
      <Button
        title="카메라로 사진 촬영"
        onPress={() => SetTakePhotoModal(true)}
      />
      <ErrorMessage message={errorMessage} />
      <Button
        title="업로드"
        onPress={() => console.log('Uploading images', images)}
        disabled={disabled}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
  },
});

export default UploadImage;
