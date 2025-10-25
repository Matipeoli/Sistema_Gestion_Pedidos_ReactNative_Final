import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  AdminScreen: undefined;
  UserScreen: undefined;
};

const Registro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    let valid = true;
// Validacion del registro(email y contraseña)
    if (!email) {
      setEmailError('Ingrese un email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Email inválido');
      valid = false;
    } else setEmailError('');

    if (!password) {
      setPasswordError('Ingrese contraseña');
      valid = false;
    } 

    if (!valid) return;
//hardcodeo de roles admin y user
    const rol = email === 'admin@ejemplo.com' ? 'admin' : 'user';
    if (rol === 'admin') navigation.navigate('AdminScreen');
    else navigation.navigate('UserScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>i2TASTE</Text>

        <ComponenteTexto
          placeholder="Usuario"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

    <View style={styles.rowContainer}>
      <View style={styles.inputHalf}>
        <ComponenteTexto
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        </View>

        <View style={styles.inputHalf}>
        <ComponenteTexto
          placeholder="Apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        </View>
    </View >
        <ComponenteTexto
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <ComponenteBoton title="Registrarte" onPress={handleLogin} />

        <TouchableOpacity onPress={() => console.log('Ir al login')}>
          <Text style={styles.link}>¿Ya tenes cuenta? Ingresa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000000ff',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0fbd0f',
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    color: '#ff4d4d',
    marginBottom: 8,
    marginLeft: 12,
  },
  link: {
    color: '#0fbd0f',
    textAlign: 'center',
    marginTop: 15,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  inputHalf: {
    flex: 1, 
  },
});

export default Registro;
