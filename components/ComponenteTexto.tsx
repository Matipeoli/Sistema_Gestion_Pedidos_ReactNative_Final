import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

// usamos esto para los campos de texto reutilizables
type ComponenteTextoProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
};

const ComponenteTexto: React.FC<ComponenteTextoProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType || 'default'}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    color: '#666',
    paddingHorizontal: 10,
  },
});

export default ComponenteTexto;
