import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminScreen from './screen/AdminScreen';
import UserScreen from './screen/UserScreen';
import LoginScreen from './screen/Login';
import RegisterScreen from './screen/RegisterScreen';
import IndexMainUs from './screen/IndexMainUs'; // ← AGREGAR

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="RegisterScreen" 
        component={RegisterScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="IndexMainUs" 
        component={IndexMainUs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AdminScreen" 
        component={AdminScreen} 
        options={{ title: 'Administrador' }} 
      />
      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{ title: 'Usuario' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;