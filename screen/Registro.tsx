import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  LoginScreen: undefined;
};

interface UsuarioRegistro {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registro: React.FC = () => {
  //un solo objeto usuario (igual que en LoginScreen)
  const [usuario, setUsuario] = useState<UsuarioRegistro>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // errores por campo
  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //handlers dinámicos
  const handleChange = (campo: keyof UsuarioRegistro, valor: string) => {
    setUsuario({ ...usuario, [campo]: valor });
    if (errores[campo]) setErrores({ ...errores, [campo]: '' });
  };

  const handleRegister = () => {
    let valid = true;
    const nuevosErrores = { nombre: '', email: '', password: '', confirmPassword: '' };

    // Validaciones
    if (!usuario.nombre) {
      nuevosErrores.nombre = 'Ingrese un nombre';
      valid = false;
    } else if (usuario.nombre.length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
      valid = false;
    }

    if (!usuario.email) {
      nuevosErrores.email = 'Ingrese un email';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
      nuevosErrores.email = 'Email inválido';
      valid = false;
    }

    if (!usuario.password) {
      nuevosErrores.password = 'Ingrese una contraseña';
      valid = false;
    } else if (usuario.password.length < 6) {
      nuevosErrores.password = 'Debe tener al menos 6 caracteres';
      valid = false;
    }

    if (!usuario.confirmPassword) {
      nuevosErrores.confirmPassword = 'Confirme su contraseña';
      valid = false;
    } else if (usuario.password !== usuario.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden';
      valid = false;
    }

    setErrores(nuevosErrores);
    if (!valid) return;

    // registro exitoso (por ahora sin backend)
    Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
    console.log('Registro:', usuario);
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
            value={usuario.nombre}
            onChangeText={(text) => handleChange('nombre', text)}
          />
          {errores.nombre ? <Text style={styles.error}>{errores.nombre}</Text> : null}

          <ComponenteTexto
            placeholder="Email"
            value={usuario.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
          />
          {errores.email ? <Text style={styles.error}>{errores.email}</Text> : null}

          <ComponenteTexto
            placeholder="Contraseña"
            value={usuario.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
          />
          {errores.password ? <Text style={styles.error}>{errores.password}</Text> : null}

          <ComponenteTexto
            placeholder="Confirmar contraseña"
            value={usuario.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry
          />
          {errores.confirmPassword ? <Text style={styles.error}>{errores.confirmPassword}</Text> : null}

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
  scrollContainer: { flexGrow: 1 },
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
