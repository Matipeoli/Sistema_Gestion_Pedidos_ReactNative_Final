import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminScreen from './screen/AdminScreen';
import UserScreen from './screen/UserScreen';
import LoginScreen, { RootStackParamList } from './screen/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'Administrador' }} />
      <Stack.Screen name="UserScreen" component={UserScreen} options={{ title: 'Usuario' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
