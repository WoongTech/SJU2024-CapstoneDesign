import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import {
  Button,
  Input,
  ErrorMessage,
  Customtext,
  FoodCalender,
  MealTypeListItem,
} from '../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding-top: 20px;
`;

const Calander = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const _handleSigninBtnPress = () => {
    //navigation.navigate('Profile', { user });
    // try {
    //   const user = await signin({ email, password });
    //   navigation.navigate('Profile', { user });
    // } catch (e) {
    //   Alert.alert('로그인 오류', e.message);
    // }
  };

  return (
    <Container insets={insets}>
      <FoodCalender></FoodCalender>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <MealTypeListItem
          title="아침"
          foodtype="빵, 샐러드"
          calorie="430"
          color={theme.breakfast}
        ></MealTypeListItem>
        <MealTypeListItem
          title="점심"
          foodtype="밥, 미역국"
          calorie="612"
          color={theme.lunch}
        ></MealTypeListItem>
        <MealTypeListItem title="저녁" color={theme.dinner}></MealTypeListItem>
        <MealTypeListItem
          title="간식"
          foodtype="과자"
          calorie="330"
          color={theme.snack}
        ></MealTypeListItem>
      </ScrollView>
    </Container>
  );
};
export default Calander;
