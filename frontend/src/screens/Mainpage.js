import React, { useContext, useState, useRef, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import {
  CalanderBar,
  DoughnutGraph,
  LineChart,
  HealthScore,
  Feedback,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { UserLoginInfoContext } from '../contexts';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const GraphContainer = styled.View`
  flex-direction: row;

  margin-bottom: ${Platform.OS === 'android' ? '15px' : '30px'};
`;

const LineGraphContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
`;

const Mainpage = ({ navigation }) => {
  const tokenInfo = useContext(UserLoginInfoContext);
  const theme = useContext(ThemeContext);
  const _handleSigninBtnPress = () => {
    //navigation.navigate('Profile', { user });
    // try {
    //   const user = await signin({ email, password });
    //   navigation.navigate('Profile', { user });
    // } catch (e) {
    //   Alert.alert('로그인 오류', e.message);
    // }
  };

  useEffect(() => {
    console.log(tokenInfo.userToken);
  }, [tokenInfo.userToken]);

  return (
    <Container>
      <CalanderBar></CalanderBar>
      <HealthScore></HealthScore>
      <GraphContainer>
        <DoughnutGraph></DoughnutGraph>
        <LineGraphContainer>
          <LineChart
            title="단백질"
            value={60}
            total={100}
            color={theme.chartcolor1}
          ></LineChart>
          <LineChart
            title="탄수화물"
            value={300}
            total={590}
            color={theme.chartcolor2}
          ></LineChart>
          <LineChart
            title="지방"
            value={200}
            total={80}
            color={theme.chartcolor3}
          ></LineChart>
        </LineGraphContainer>
        <LineGraphContainer></LineGraphContainer>
      </GraphContainer>

      <Feedback></Feedback>
    </Container>
  );
};
export default Mainpage;
