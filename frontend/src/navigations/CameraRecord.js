import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RecordChooseFood, UploadImage } from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const CameraRecord = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen
        name="RecordChooseFood"
        component={RecordChooseFood}
        options={{
          title: '기록',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold ',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="UploadImage"
        component={UploadImage}
        options={{
          title: '사진',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold ',
            fontSize: 28,
          },
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
          headerLeft: ({ onPress, tintColor }) => (
            <MaterialIcons
              name="keyboard-arrow-left"
              size={38}
              color={tintColor}
              onPress={onPress}
            ></MaterialIcons>
          ),
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default CameraRecord;
