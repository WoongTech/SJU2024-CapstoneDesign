import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import Main from './Main';
import { UserLoginInfoContext } from '../contexts';
import { useContext } from 'react';

const Navigations = () => {
  const tokenInfo = useContext(UserLoginInfoContext);
  return (
    <NavigationContainer>
      {tokenInfo.userToken == null ? <Auth></Auth> : <Main></Main>}
    </NavigationContainer>
  );
};
export default Navigations;
