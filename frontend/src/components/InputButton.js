import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  width: 300px;
  background-color: ${({ theme }) => theme.inputBackground};
  padding: 15px 20px;
  margin-bottom: 5px;
  border: 1px solid
    ${({ theme, isFocused }) => (isFocused ? theme.text : theme.inputBorder)};
  border-radius: 10px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

const InputButton = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row' }}
      disabled={disabled}
    >
      <Container style={containerStyle} disabled={disabled}>
        <Title style={textStyle}>
          {title == '' ? '날짜를 선택해 주세요' : title}
        </Title>
      </Container>
    </TouchableOpacity>
  );
};

InputButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  disabled: PropTypes.bool,
};

export default InputButton;
