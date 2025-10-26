import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginScreen: undefined;
};

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [nombreError, setNombreError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleNombreChange = (text: string) => {
    setNombre(text);
    if (nombreError) setNombreError('');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (confirmPasswordError) setConfirmPasswordError('');
  };

  const handleRegister = () => {
    let valid = true;

    // Validación del nombre
    if (!nombre) {
      setNombreError('Ingrese un nombre');
      valid = false;
    } else if (nombre.length < 3) {
      setNombreError('El nombre debe tener al menos 3 caracteres');
      valid = false;
    } else {
      setNombreError('');
    }

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
      setPasswordError('Ingrese una contraseña');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Validación de confirmación de contraseña
    if (!confirmPassword) {
      setConfirmPasswordError('Confirme su contraseña');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Las contraseñas no coinciden');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;

    
    // Por ahora, solo navegamos de vuelta al login
    console.log('Registro exitoso:', { nombre, email, password });
    alert('¡Registro exitoso! Ahora puedes iniciar sesión');
    navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate en i2TASTE</Text>

          <ComponenteTexto
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={handleNombreChange}
          />
          {nombreError ? <Text style={styles.error}>{nombreError}</Text> : null}

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

          <ComponenteTexto
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry
          />
          {confirmPasswordError ? <Text style={styles.error}>{confirmPasswordError}</Text> : null}

          <ComponenteBoton title="Registrarse" onPress={handleRegister} />

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
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
    fontSize: 14,
  },
});

export default Registro;