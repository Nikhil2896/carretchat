import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Name from '../screens/Name';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import { Routes } from '../constants/Constants';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.Name}>
        <Stack.Screen
          name={Routes.Name}
          component={Name}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Home}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={Routes.Chat}
          component={Chat}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
