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

//interfaz para el usuario
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

  //mensajes de error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //actualizar estado del usuario
  const handleEmailChange = (text: string) => {
    setUsuario({ ...usuario, email: text });
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string) => {
    setUsuario({ ...usuario, password: text });
    if (passwordError) setPasswordError('');
  };

  //validacion y navegaciion
  const handleLogin = () => {
    let valid = true;

    //validacion del email
    if (!usuario.email) {
      setEmailError('Ingrese un email');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      setEmailError('Email inválido');
      valid = false;
    } else {
      setEmailError('');
    }

    //validacion de contraseña
    if (!usuario.password) {
      setPasswordError('Ingrese contraseña');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    // HARDCODEO LOGICAL PARA NAVEGACION
    if (usuario.email === 'admin@ejemplo.com') {
      navigation.navigate('IndexPedidoAL');
    } else {
      navigation.navigate('IndexMainUs');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>i2TASTE</Text>

        <ComponenteTexto
          placeholder="Email"
          value={usuario.email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <ComponenteTexto
          placeholder="Contraseña"
          value={usuario.password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

        <ComponenteBoton title="Ingresar" onPress={handleLogin} />

        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>

        {/* Ayuda visual para testing */}
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
    shadowColor: '#000',
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