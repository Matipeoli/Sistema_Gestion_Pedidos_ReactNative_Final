import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles, colors } from '../styles/StylesApp';

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
  const [usuario, setUsuario] = useState<UsuarioRegistro>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleChange = (campo: keyof UsuarioRegistro, valor: string) => {
    setUsuario({ ...usuario, [campo]: valor });
    if (errores[campo]) setErrores({ ...errores, [campo]: '' });
  };

  const handleRegister = () => {
    let valid = true;
    const nuevosErrores = { nombre: '', email: '', password: '', confirmPassword: '' };

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

    Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
    console.log('Registro:', usuario);
    navigation.navigate('LoginScreen');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerCenter}>
        <View style={styles.card}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate en i2TASTE</Text>

          <ComponenteTexto
            placeholder="Nombre completo"
            value={usuario.nombre}
            onChangeText={(text) => handleChange('nombre', text)}
          />
          {errores.nombre ? <Text style={styles.textError}>{errores.nombre}</Text> : null}

          <ComponenteTexto
            placeholder="Email"
            value={usuario.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
          />
          {errores.email ? <Text style={styles.textError}>{errores.email}</Text> : null}

          <ComponenteTexto
            placeholder="Contraseña"
            value={usuario.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
          />
          {errores.password ? <Text style={styles.textError}>{errores.password}</Text> : null}

          <ComponenteTexto
            placeholder="Confirmar contraseña"
            value={usuario.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            secureTextEntry
          />
          {errores.confirmPassword ? <Text style={styles.textError}>{errores.confirmPassword}</Text> : null}

          <ComponenteBoton title="Registrarse" onPress={handleRegister} />

          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Registro;