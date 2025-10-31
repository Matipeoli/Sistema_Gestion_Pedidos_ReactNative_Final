import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles, colors } from '../styles/StylesApp';

type RootStackParamList = {
  Registro: undefined;
  IndexMainUs: undefined; 
  IndexPedidoAL: undefined;
};

interface UsuarioRegistro {
  nombre: string;
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [usuario, setUsuario] = useState<UsuarioRegistro>({
    nombre: '',
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (text: string) => {
    setUsuario({ ...usuario, email: text });
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setUsuario({ ...usuario, password: text });
    if (passwordError) setPasswordError('');
  };

  const handleLogin = () => {
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

    if (!usuario.password) {
      setPasswordError('Ingrese contraseña');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    if (usuario.email === 'admin@ejemplo.com') {
      navigation.navigate('IndexPedidoAL');
    } else {
      navigation.navigate('IndexMainUs');
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
          value={usuario.password}
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