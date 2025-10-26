import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screen/Login';
import Registro from './screen/Registro';
import IndexMainUs from './screen/IndexMainUs';
import IndexPedidoAL from './screen/IndexPedidoAL';



const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Registro">
      <Stack.Screen name="Registro" component={Registro}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="IndexMainUs" component={IndexMainUs} />
      <Stack.Screen name="IndexPedidoAL" component={IndexPedidoAL} />
    </Stack.Navigator>
  );
};

export default AppNavigator;