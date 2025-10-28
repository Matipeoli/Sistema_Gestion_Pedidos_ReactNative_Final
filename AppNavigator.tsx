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
      <Stack.Screen name="Registro" component={Registro}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="IndexMainUs" component={IndexMainUs} />
      <Stack.Screen name="IndexPedidoAL" component={IndexPedidoAL} />
      <Stack.Screen name="IndexHistorial" component={IndexHistorial} />
      <Stack.Screen name="HistorialAL" component={HistorialAL} />
    </Stack.Navigator>
  );
};

export default AppNavigator;