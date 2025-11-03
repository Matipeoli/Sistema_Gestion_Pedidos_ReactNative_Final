import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles, colors } from '../styles/StylesApp';
import axios from 'axios';
import { API_BASE } from '../api/menuApi';
import AsyncStorage from '@react-native-async-storage/async-storage';


type RootStackParamList = {
  Registro: undefined;
  IndexMainUs: undefined; 
  IndexPedidoAL: undefined;
};

interface UsuarioRegistro {
  nombre: string;
  email: string;
  contrasenia: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [usuario, setUsuario] = useState<UsuarioRegistro>({
    nombre: '',
    email: '',
    contrasenia: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (text: string) => {
    setUsuario({ ...usuario, email: text });
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setUsuario({ ...usuario, contrasenia: text });
    if (passwordError) setPasswordError('');
  };

  const handleLogin = async() => {
    let valid = true;

    if (!usuario.email) {
      setEmailError('Ingrese un email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      setEmailError('Email inválido');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!usuario.contrasenia) {
      setPasswordError('Ingrese contraseña');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

     try {
      const response = await axios.post(`${API_BASE}/auth/login`, usuario);
      //aca va lo de JWT
      //const token = response.data.token;
      await AsyncStorage.setItem('usuarioNombre', response.data.nombre);
      await AsyncStorage.setItem('usuarioId', response.data.id.toString());
      Alert.alert('Login exitoso', 'Bienvenido!');
      if (usuario.email === 'admin@ejemplo.com') {
        navigation.navigate('IndexPedidoAL');
      } else {
        navigation.navigate('IndexMainUs');
      }
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', error.response?.data || 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.containerCenter}>
      <View style={styles.card}>
        <Text style={styles.title}>i2TASTE</Text>

        <ComponenteTexto
          placeholder="Email"
          value={usuario.email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.textError}>{emailError}</Text> : null}

        <ComponenteTexto
          placeholder="Contraseña"
          value={usuario.contrasenia}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.textError}>{passwordError}</Text> : null}

        <ComponenteBoton title="Ingresar" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>

        <View style={styles.loginTestInfo}>
          <Text style={styles.loginTestText}>Usuarios de prueba:</Text>
          <Text style={styles.loginTestText}>Admin: admin@ejemplo.com</Text>
          <Text style={styles.loginTestText}>Usuario: cualquier@email.com</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;