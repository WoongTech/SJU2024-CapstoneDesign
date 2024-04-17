import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { KoreanFood, WesternFood } from '../../assets/components';
import { Customcardbutton } from './index';

const Cardcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  margin-bottom: 10px;
`;

const FoodRadiobuttonContainer = ({ foodType, setFoodType }) => {
  return (
    <Cardcontainer>
      <Customcardbutton
        onPress={() => setFoodType('한식')}
        url={KoreanFood}
        title="한식"
        isFocused={foodType === '한식'}
      ></Customcardbutton>
      <Customcardbutton
        onPress={() => setFoodType('세계음식')}
        url={WesternFood}
        title="세계음식"
        isFocused={foodType === '세계음식'}
      ></Customcardbutton>
    </Cardcontainer>
  );
};

export default FoodRadiobuttonContainer;
