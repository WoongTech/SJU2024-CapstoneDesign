import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage, Customtext } from '../components';
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

const Signupphysicalinformation = ({ navigation }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const refWeight = useRef(null);
  const refDidmount = useRef(null);

  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const GUIDE_TEXT = `${user.name}님의 
신체정보를 알려주세요`;

  const toggleUserState = (condition, value) => {
    updateUserInfo({
      [condition]: [value],
    });
  };

  useEffect(() => {
    setDisabled(!(height && weight && !errorMessage));
  }, [height && weight && errorMessage]);

  useEffect(() => {
    if (refDidmount.current) {
      let error = '';
      if (!height) {
        error = '키를 입력해주세요';
      } else if (!weight) {
        error = '몸무게를 입력해주세요';
      } else {
        error = '';
      }
      setErrorMessage(error);
    } else {
      refDidmount.current = true;
    }
  }, [height, weight]);

  const _handleSignupBtnPress = () => {
    toggleUserState('height', height);
    toggleUserState('weight', weight);
    navigation.navigate('Signupphysicalcharacteristics');
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <Input
          label="키"
          placeholder="Height"
          returnKeyType="next"
          value={height}
          onChangeText={setHeight}
          onSubmitEditing={() => refWeight.current.focus()}
          onBlur={() => setHeight(removeWhitespace(height))}
          maxLength={12}
        ></Input>
        <Input
          ref={refWeight}
          label="몸무게"
          placeholder="Weight"
          returnKeyType="next"
          value={weight}
          onChangeText={setWeight}
          onSubmitEditing={_handleSignupBtnPress}
          onBlur={() => setWeight(removeWhitespace(weight))}
        ></Input>
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
export default Signupphysicalinformation;
