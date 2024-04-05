import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  Physicalcharacteristicsgroup,
} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace } from '../utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const GUIDE_TEXT = `가지고 있는 
건강고민을 선택해주세요`;

const Signupphysicalcharacteristics = ({ navigation }) => {
  const _handleSignupBtnPress = () => {
    navigation.navigate('Signupdiseases');
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <Physicalcharacteristicsgroup></Physicalcharacteristicsgroup>
        <Button title="다음" onPress={_handleSignupBtnPress}></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default Signupphysicalcharacteristics;
