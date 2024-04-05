import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage, Customtext } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';
import { UserContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px 20px;
`;

const GUIDE_TEXT = `이름과 사용할 이메일, 
비밀번호를 입력해주세요`;

const Signupaccount = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);
  const refDidmount = useRef(null);

  const { user, setUser: updateUserInfo } = useContext(UserContext);

  const toggleUserState = (condition, value) => {
    updateUserInfo({
      [condition]: [value],
    });
  };

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [email, name, password, passwordConfirm, errorMessage]);

  useEffect(() => {
    if (refDidmount.current) {
      let error = '';
      if (!name) {
        error = '이름을 입력해주세요';
      } else if (!email) {
        error = '이메일을 입력해주세요';
      } else if (!validateEmail(email)) {
        error = '유효한 이메일이 아닙니다';
      } else if (password.length < 6) {
        error = '비밀번호는 6자리 이상이여야 합니다';
      } else if (password !== passwordConfirm) {
        error = '비밀번호가 일치하지 않습니다';
      } else {
        error = '';
      }
      setErrorMessage(error);
    } else {
      refDidmount.current = true;
    }
  }, [email, name, password, passwordConfirm]);

  const _handleSignupBtnPress = () => {
    toggleUserState('name', name);
    toggleUserState('email', email);
    toggleUserState('password', password);
    navigation.navigate('Signupbirthandgender');
  };

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
      <Container>
        <Customtext text={GUIDE_TEXT}></Customtext>
        <Input
          label="이름"
          placeholder="Name"
          returnKeyType="next"
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => refEmail.current.focus()}
          onBlur={() => setName(name.trim())}
          maxLength={12}
        ></Input>
        <Input
          ref={refEmail}
          label="이메일"
          placeholder="Email"
          returnKeyType="next"
          value={email}
          onChangeText={setEmail}
          onSubmitEditing={() => refPassword.current.focus()}
          onBlur={() => setEmail(removeWhitespace(email))}
        ></Input>
        <Input
          ref={refPassword}
          label="비밀번호"
          placeholder="Password"
          returnKeyType="next"
          value={password}
          onChangeText={setPassword}
          isPassword={true}
          onSubmitEditing={() => refPasswordConfirm.current.focus()}
          onBlur={() => setPassword(removeWhitespace(password))}
        ></Input>
        <Input
          ref={refPasswordConfirm}
          label="비밀번호 확인"
          placeholder="Password Confirm"
          returnKeyType="done"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          isPassword={true}
          onSubmitEditing={_handleSignupBtnPress}
          onBlur={() => setPasswordConfirm(removeWhitespace(passwordConfirm))}
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
export default Signupaccount;
