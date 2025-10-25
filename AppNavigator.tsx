import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminScreen from './screen/AdminScreen';
import UserScreen from './screen/UserScreen';
import LoginScreen from './screen/Login';
import type { RootStackParamList } from './screen/Login';
import Registro from './screen/Registro';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Registro">
      <Stack.Screen name="Registro" component={Registro}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="AdminScreen" component={AdminScreen} />
      <Stack.Screen name="UserScreen" component={UserScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
