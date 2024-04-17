import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage } from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { validateEmail, removeWhitespace } from '../utils';
import { UserLoginInfoContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0% 20px;
  padding-top: ${({ insets: { top } }) => top}px;
  padding-bottom: ${({ insets: { bottom } }) => bottom}px;
`;

const Signin = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const refPassword = useRef(null);

  const tokenInfo = useContext(UserLoginInfoContext);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChanege = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : '유효한 이메일이 아닙니다'
    );
  };

  const _handlePasswordChanege = (password) => {
    const changedPassword = removeWhitespace(password);
    setPassword(changedPassword);
  };

  const _handleSigninBtnPress = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('login-token'),
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error('로그인 오류');
      }
      console.log('로그인 성공!!');
      console.log(response);
      console.log(response.body);
      tokenInfo.setuserToken('TmpToken~~~');

      //navigation.navigate('Profile', { user: data.user });
    } catch (error) {
      Alert.alert('로그인 오류', error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      contentContainerStyle={{ flex: 1 }}
    >
      <Container insets={insets}>
        <Input
          label="이메일"
          placeholder="Email"
          returnKeyType="next"
          value={email}
          onChangeText={_handleEmailChanege}
          onSubmitEditing={() => refPassword.current.focus()}
        ></Input>
        <Input
          ref={refPassword}
          label="비밀번호"
          placeholder="Password"
          returnKeyType="done"
          value={password}
          onChangeText={_handlePasswordChanege}
          isPassword={true}
          onSubmitEditing={_handleSigninBtnPress}
        ></Input>
        <ErrorMessage message={errorMessage}></ErrorMessage>
        <Button
          title="로그인"
          onPress={_handleSigninBtnPress}
          disabled={disabled}
        ></Button>
        <Button
          title="또는 회원가입"
          onPress={() => navigation.navigate('Signupaccount')}
          containerStyle={{ marginTop: 0, backgroundColor: 'transparent' }}
          textStyle={{ color: theme.btnTextLink, fontSize: 18 }}
        ></Button>
      </Container>
    </KeyboardAwareScrollView>
  );
};
export default Signin;
