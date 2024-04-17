import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { BoyImage, GirlImage } from '../../assets/components';
import { Customcardbutton } from './index';

const Cardcontainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px 10px;
`;

const Genderradiobuttoncontiner = ({ gender, setGender }) => {
  return (
    <Cardcontainer>
      <Customcardbutton
        gender={gender}
        onPress={() => setGender('M')}
        url={BoyImage}
        title="남자"
        isFocused={gender === 'M'}
      ></Customcardbutton>
      <Customcardbutton
        gender={gender}
        onPress={() => setGender('F')}
        url={GirlImage}
        title="여자"
        isFocused={gender === 'F'}
      ></Customcardbutton>
    </Cardcontainer>
  );
};

export default Genderradiobuttoncontiner;
