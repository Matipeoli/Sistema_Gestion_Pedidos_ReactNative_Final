import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

type ComponenteBotonProps = {
  title: string;
  onPress: () => void; 
};

const ComponenteBoton: React.FC<ComponenteBotonProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Button title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default ComponenteBoton;
