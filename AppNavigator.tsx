import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/Login';
import Registro from './screen/Registro';
import IndexMainUs from './screen/IndexMainUs';
import IndexPedidoAL from './screen/IndexPedidoAL';
import IndexHistorial from './screen/IndexHistoial';
import HistorialAL from './screen/HistorialAL';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Registro">
      <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="IndexMainUs" component={IndexMainUs} options={{ headerShown: false }}  />
      <Stack.Screen name="IndexPedidoAL" component={IndexPedidoAL} options={{ headerShown: false }}  />
      <Stack.Screen name="IndexHistorial" component={IndexHistorial} options={{ headerShown: false }}  />
      <Stack.Screen name="HistorialAL" component={HistorialAL} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
};

export default AppNavigator;