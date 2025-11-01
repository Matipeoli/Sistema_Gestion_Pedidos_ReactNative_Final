import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IndexPedidoAL from './screen/IndexPedidoAL';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from './screen/Registro';
import LoginScreen from './screen/Login';
import IndexMainUs from './screen/IndexMainUs';
import IndexHistorial from './screen/IndexHistorial';
import HistorialAL from './screen/HistorialAL';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="IndexMainUs" component={IndexMainUs} options={{ headerShown: false }} />
        <Stack.Screen name="IndexPedidoAL" component={IndexPedidoAL} options={{ headerShown: false }} />
        <Stack.Screen name="IndexHistorial" component={IndexHistorial} options={{ headerShown: false }} />
        <Stack.Screen name="HistorialAL" component={HistorialAL} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
