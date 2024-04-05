import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  Genderradiobuttoncontiner,
} from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { removeWhitespace } from '../utils';
import { UserContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;
const GUIDE_TEXT = `생일과 성별을 입력해주세요`;

const Signupbirthandgender = ({ navigation }) => {
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const toggleUserState = (condition, value) => {
    updateUserInfo({
      [condition]: [value],
    });
  };

  useEffect(() => {
    setDisabled(!(birth && gender && !errorMessage));
  }, [birth, gender, errorMessage]);

  useEffect(() => {
    let error = '';
    if (!birth) {
      error = '생년월일을 입력해주세요';
    } else if (!gender) {
      error = '성별을 선택해주세요';
    } else {
      error = '';
    }

    setErrorMessage(error);
  }, [birth, gender]);

  const _handleSignupBtnPress = () => {
    toggleUserState('birth', birth);
    toggleUserState('gender', gender);
    navigation.navigate('Signupphysicalinformation');
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <Input
          label="생년월일"
          placeholder="Birth"
          returnKeyType="next"
          value={birth}
          onChangeText={setBirth}
          onBlur={() => setBirth(removeWhitespace(birth))}
          maxLength={8}
        ></Input>
        <Genderradiobuttoncontiner
          gender={gender}
          setGender={setGender}
        ></Genderradiobuttoncontiner>
        <ErrorMessage message={errorMessage}></ErrorMessage>
        <Button
          title="다음"
          onPress={_handleSignupBtnPress}
          disabled={disabled}
        ></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default Signupbirthandgender;
