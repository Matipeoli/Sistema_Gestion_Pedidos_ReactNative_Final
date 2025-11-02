import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Modal, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteTarjeta from '../components/ComponenteTarjeta';
import { styles, colors } from '../styles/StylesApp';

const API_URL = 'http://192.168.0.10:8080'; // cambia a tu IP

type RootStackParamList = {
  LoginScreen: undefined;
  IndexMainUs: undefined;
  IndexHistorial: undefined;
};

interface Pedido {
  id: number;
  menu: {
    titulo: string;
    descripcion: string;
  };
  fechaPedido: string;
  observaciones: string;
}

const IndexHistorial: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [historial, setHistorial] = useState<Pedido[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  // cambiar id por el q corresponda
  const usuarioId = 1;

  // traer historial de pedidos de usuario
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch(`http://${API_URL}:8080/menu/todos`);
        if (!response.ok) throw new Error('Error al obtener pedidos');
        const data = await response.json();
        setHistorial(data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'No se pudo cargar el historial');
      }
    };

    fetchHistorial();
  }, []);

  return (
    <View style={styles.containerWithPadding}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} translucent={false} />
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          i2T<Text style={styles.logoAccent}>ASTE</Text>
        </Text>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>Manuel</Text>
          <Image source={require('../assets/icon.png')} style={styles.avatar} />

          <TouchableOpacity style={styles.menuBtn} onPress={() => setVisible(!visible)}>
            <View style={styles.menuBar} />
            <View style={styles.menuBar} />
            <View style={styles.menuBar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SCROLL HISTORIAL */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {historial.map((item) => (
          <ComponenteTarjeta
            key={item.id}
            title={new Date(item.fechaPedido).toLocaleDateString()}
            description={`${item.menu.titulo} - ${item.menu.descripcion}`}
            observacion={item.observaciones || 'Sin observaciones'}
            onActionPress={() => Alert.alert('Pedido', item.menu.titulo)}
          />
        ))}

        {/* BOTÓN VOLVER */}
        <TouchableOpacity 
          style={styles.volverBtn}
          onPress={() => navigation.navigate('IndexMainUs')}
        >
          <Text style={styles.buttonText}>Volver al Menú Principal</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MENU HAMBURGUESA */}
      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeSidebar}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sidebar}>
              <TouchableOpacity style={styles.closeBtn} onPress={closeSidebar}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.sidebarTitle}>Perfil de Usuario</Text>
              <Text style={styles.textWhite}>Nombre: Juan Pérez</Text>
              <Text style={styles.textWhite}>Email: juan.perez@example.com</Text>

              <TouchableOpacity 
                style={styles.recoverBtn}
                onPress={() => {
                  closeSidebar();
                  Alert.alert('Recuperar Contraseña', 'Funcionalidad en desarrollo');
                }}
              >
                <Text style={styles.recoverText}>Recuperar Contraseña</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutText}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default IndexHistorial;
