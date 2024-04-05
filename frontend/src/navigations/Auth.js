import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Signin,
  Signupaccount,
  Signupbirthandgender,
  Signupphysicalinformation,
  Signupphysicalcharacteristics,
  Signupdiseases,
} from '../screens';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const Auth = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: theme.background },
      }}
    >
      {/* <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          title: '로그인',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
          },
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTintColor: theme.text,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Signupaccount"
        component={Signupaccount}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
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
      <Stack.Screen
        name="Signupbirthandgender"
        component={Signupbirthandgender}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
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
      <Stack.Screen
        name="Signupphysicalinformation"
        component={Signupphysicalinformation}
        options={{
          title: '회원가입',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
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
      ></Stack.Screen> */}
      <Stack.Screen
        name="Signupphysicalcharacteristics"
        component={Signupphysicalcharacteristics}
        options={{
          title: '회원가입',
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
      <Stack.Screen
        name="Signupdiseases"
        component={Signupdiseases}
        options={{
          title: '회원가입',
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

export default Auth;
