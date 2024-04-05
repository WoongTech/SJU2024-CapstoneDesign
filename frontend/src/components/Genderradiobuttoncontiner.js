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
        onPress={() => setGender('남자')}
        url={BoyImage}
        title="남자"
        isFocused={gender === '남자'}
      ></Customcardbutton>
      <Customcardbutton
        gender={gender}
        onPress={() => setGender('여자')}
        url={GirlImage}
        title="여자"
        isFocused={gender === '여자'}
      ></Customcardbutton>
    </Cardcontainer>
  );
};

export default Genderradiobuttoncontiner;
