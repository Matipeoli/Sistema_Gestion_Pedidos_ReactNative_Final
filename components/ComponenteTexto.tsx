import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Text } from 'react-native';

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
  const [isFocused, setIsFocused] = useState(false);
  const showLabel = isFocused || value.length > 0;

  return (
    <View style={styles.container}>
      {showLabel && (
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {placeholder}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={!showLabel ? placeholder : ''}
        placeholderTextColor="#666"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || 'default'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 12,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: -8,
    left: 12,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#666',
    zIndex: 1,
  },
  labelFocused: {
    color: '#0fbd0f',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
    color: '#fff',
    paddingHorizontal: 10,
    backgroundColor: '#2a2a2a',
  },
  inputFocused: {
    borderColor: '#0fbd0f',
  },
});

export default ComponenteTexto;