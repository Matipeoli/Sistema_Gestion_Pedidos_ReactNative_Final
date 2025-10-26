import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Registro: undefined;
  IndexMainUs: undefined; 
  IndexPedidoAL: undefined;
};

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const handleLogin = () => {
    let valid = true;

    // Validación del email
    if (!email) {
      setEmailError('Ingrese un email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Email inválido');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validación de la contraseña
    if (!password) {
      setPasswordError('Ingrese contraseña');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    // LÓGICA HARDCODEADA DE ROLES
    // Admin: admin@ejemplo.com / Cualquier contraseña
    // Usuario normal: cualquier otro email válido
    
    if (email === 'admin@ejemplo.com') {
      navigation.navigate('IndexPedidoAL');
    } else {
      // TODOS LOS USUARIOS NORMALES VAN AL MAIN
      navigation.navigate('IndexMainUs');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>i2TASTE</Text>

        <ComponenteTexto
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <ComponenteTexto
          placeholder="Contraseña"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <ComponenteBoton title="Ingresar" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>

        {/* AYUDA VISUAL PARA TESTING */}
        <View style={styles.testInfo}>
          <Text style={styles.testText}>Usuarios de prueba:</Text>
          <Text style={styles.testText}>Admin: admin@ejemplo.com</Text>
          <Text style={styles.testText}>Usuario: cualquier@email.com</Text>
        </View>
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
    shadowColor: '#000000',
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
    fontSize: 12,
  },
  link: {
    color: '#0fbd0f',
    textAlign: 'center',
    marginTop: 15,
  },
  testInfo: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0fbd0f',
  },
  testText: {
    color: '#999',
    fontSize: 12,
    marginVertical: 2,
  },
});

export default LoginScreen;