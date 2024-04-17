import React, { useContext, useState, useRef, useEffect } from 'react';
import { ThemeContext } from 'styled-components/native';
import styled from 'styled-components/native';
import { Button, Input, ErrorMessage, Customtext } from '.';
import { Calendar } from 'react-native-calendars';

const Container = styled.View`
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const FoodCalender = () => {
  const theme = useContext(ThemeContext);

  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  });

  const breakfast = {
    key: 'breakfast',
    color: theme.breakfast,
  };
  const lunch = { key: 'lunch', color: theme.lunch };
  const dinner = { key: 'dinner', color: theme.dinner };
  const snack = { key: 'snack', color: theme.snack };

  const markedDates = {
    '2024-04-16': { dots: [breakfast, lunch, snack] },
    '2024-04-17': { dots: [breakfast, lunch, dinner, snack], disabled: true },
    '2024-04-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
    '2024-04-19': { disabled: true, disableTouchEvent: true },

    [selectedDay]: {
      selected: true,
      selectedColor: theme.selectedColor,
    },
  };

  return (
    <Container>
      <Calendar
        style={{
          width: 300,
        }}
        onDayPress={(day) => {
          console.log('selected day', day);
          setSelectedDay(() => day.dateString);
        }}
        markingType={'multi-dot'}
        markedDates={markedDates}
      />
    </Container>
  );
};

export default FoodCalender;
