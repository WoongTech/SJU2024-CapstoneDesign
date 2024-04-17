import React from 'react';
import styled from 'styled-components/native';
import { Octicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const Container = styled.View`
  width: 90%;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #bfbfbf;
  padding: 10px 15px;
  border-radius: 10px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
`;
const Title = styled.Text`
  font-size: ${Platform.OS == 'android' ? '16px' : '20px'};
  font-weight: 600;
  margin-left: 10px;
  color: ${(props) => props.color};
`;
const FoodType = styled.Text`
  margin-left: 20px;
  font-size: ${Platform.OS == 'android' ? '15px' : '18px'};
  font-weight: 600;
  padding: ${Platform.OS == 'android' ? '3px' : '7px'};
`;
const CalorieContainer = styled.View`
  align-items: flex-end;
`;
const Calorie = styled.Text`
  padding-right: 20px;
  font-size: ${Platform.OS == 'android' ? '15px' : '18px'};
  font-weight: 600;
`;

const MealTypeListItem = ({
  title,
  foodtype = '기록이 없습니다 사진을 찍어 추가하세요',
  calorie = '',
  color,
}) => {
  return (
    <Container>
      <TitleContainer>
        <Octicons name="dot" size={24} color={color} />
        <Title color={color}>{title}</Title>
      </TitleContainer>
      <FoodType>{foodtype}</FoodType>
      <CalorieContainer>
        <Calorie>
          {calorie} {calorie != 0 && 'Kcal'}
        </Calorie>
      </CalorieContainer>
    </Container>
  );
};

export default MealTypeListItem;
