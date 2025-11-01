import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import IndexPedidoAL from './screen/IndexPedidoAL';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="IndexPedidoAL" 
          component={IndexPedidoAL} 
          options={{ headerShown: false }} 
        />
    </NavigationContainer>
  );
};

export default App;
