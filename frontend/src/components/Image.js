import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { theme } from '../theme';
import { MaterialIcons } from '@expo/vector-icons';

const Cardcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px 10px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imgBtnBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'photo-camera',
  size: 22,
  color: theme.imgBtnIcon,
}))``;

const Container = styled.View`
  margin-bottom: 30px;
`;
const ProfileImage = styled.Image`
  background-color: ${({ theme }) => theme.imgBackGround};
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const Image = ({ url, showButton, onChangePhoto }) => {
  return (
    <Container>
      <ProfileImage source={uri}></ProfileImage>
    </Container>
  );
};

// Image.defaultProps = {
//   url: 'https://firebasestorage.googleapis.com/v0/b/react-native-chat-e69ee.appspot.com/o/face.png?alt=media',
// };

Image.protoType = {
  url: PropTypes.string,
  showButton: PropTypes.bool,
  onChangePhoto: PropTypes.func,
};

export default Image;
