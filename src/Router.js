import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Main } from './screens/Main';
import { Favorites } from './screens/Favorites';

import routes from './navigation/routes';

const Stack = createStackNavigator();

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={routes.main} component={Main} />
        <Stack.Screen name={routes.favorites} component={Favorites} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;