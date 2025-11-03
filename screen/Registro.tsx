import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import ComponenteTexto from '../components/ComponenteTexto';
import ComponenteBoton from '../components/ComponenteBoton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles, colors } from '../styles/StylesApp';
import axios from 'axios';
import { API_BASE } from '../api/menuApi';

type RootStackParamList = {
  LoginScreen: undefined;
};

interface UsuarioRegistro {
  nombre: string;
  email: string;
  contrasenia: string;
  confirmarContrasenia: string;
}

const Registro: React.FC = () => {
  const [usuario, setUsuario] = useState<UsuarioRegistro>({
    nombre: '',
    email: '',
    contrasenia: '',
    confirmarContrasenia: '',
  });

  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    contrasenia: '',
    confirmarContrasenia: '',
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleChange = (campo: keyof UsuarioRegistro, valor: string) => {
    setUsuario({ ...usuario, [campo]: valor });
    if (errores[campo]) setErrores({ ...errores, [campo]: '' });
  };

  const handleRegister = async () => {
    let valid = true;
    const nuevosErrores = { nombre: '', email: '', contrasenia: '', confirmarContrasenia: '' };

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

    if (!usuario.contrasenia) {
      nuevosErrores.contrasenia = 'Ingrese una contraseña';
      valid = false;
    } else if (usuario.contrasenia.length < 6) {
      nuevosErrores.contrasenia = 'Debe tener al menos 6 caracteres';
      valid = false;
    }

    if (!usuario.confirmarContrasenia) {
      nuevosErrores.confirmarContrasenia = 'Confirme su contraseña';
      valid = false;
    } else if (usuario.contrasenia !== usuario.confirmarContrasenia) {
      nuevosErrores.confirmarContrasenia = 'Las contraseñas no coinciden';
      valid = false;
    }

    setErrores(nuevosErrores);
    if (!valid) return;

    try {
      const response = await axios.post(`${API_BASE}/auth/register`, {
        nombre: usuario.nombre,
        email: usuario.email,
        contrasenia: usuario.contrasenia,
      });
    Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
    console.log('Registro:', usuario);
    navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'Hubo un problema al registrar. Intente nuevamente.');
    }
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
            value={usuario.contrasenia}
            onChangeText={(text) => handleChange('contrasenia', text)}
            secureTextEntry
          />
          {errores.contrasenia ? <Text style={styles.textError}>{errores.contrasenia}</Text> : null}

          <ComponenteTexto
            placeholder="Confirmar contraseña"
            value={usuario.confirmarContrasenia}
            onChangeText={(text) => handleChange('confirmarContrasenia', text)}
            secureTextEntry
          />
          {errores.confirmarContrasenia ? <Text style={styles.textError}>{errores.confirmarContrasenia}</Text> : null}

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