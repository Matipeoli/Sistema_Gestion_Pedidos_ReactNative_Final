import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import ComponenteTarjeta from '../components/ComponenteTarjeta';
import { styles, colors } from '../styles/StylesApp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_BASE } from '../api/menuApi';

const api = axios.create({ baseURL: API_BASE });
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



type RootStackParamList = {
  LoginScreen: undefined;
  IndexMainUs: undefined;
  IndexHistorial: undefined;
};

interface MenuOption {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
}

const IndexMainUs: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [menus, setMenus] = useState<MenuOption[]>([]);
  const [pedidosRealizados, setPedidosRealizados] = useState<string[]>([]); 
  const [usuarioId, setUsuarioId] = useState<number>(1); 
  const [nombreUsuario, setNombreUsuario] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // carga menus al iniciar
  useEffect(() => {
    obtenerMenus();
    //carga el nombre del usuario
    const cargarNombre = async () => {
    const nombre = await AsyncStorage.getItem('usuarioNombre');
    if (nombre) setNombreUsuario(nombre);
  };
    cargarNombre();
  }, []);

  // obtiene todos los menus
  const obtenerMenus = async () => {
    try {
      const res = await api.get(`/menu/todos`);
      const data = res.data.map((m: any) => ({
        id: m.id.toString(),
        nombre: m.titulo,
        descripcion: m.descripcion,
        imagen: m.img,
      }));
      setMenus(data);
    } catch (error) {
      console.error('Error al obtener menús:', error);
      Alert.alert('Error', 'No se pudieron cargar los menús.');
    }
  };

  // guarda nuevo pedido
  const hacerPedido = async (menuId: string) => {
    if (pedidosRealizados.includes(menuId)) {
      Alert.alert('Pedido ya realizado', 'Ya hiciste este pedido.');
      return;
    }

    try {
      await api.post(`/pedidos/save`, {
        usuarioId: usuarioId,
        menuId: parseInt(menuId),
        fechaPedido: new Date().toISOString().split('T')[0],
      });

      // marcamos como realizado localmente
      setPedidosRealizados([...pedidosRealizados, menuId]);
      Alert.alert('Pedido realizado', 'Tu pedido fue enviado con éxito.');
    } catch (error) {
      console.error('Error al hacer el pedido:', error);
      Alert.alert('Error', 'No se pudo realizar el pedido.');
    }
  };

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const isPedidoRealizado = (menuId: string) => pedidosRealizados.includes(menuId);

  return (
    <View style={styles.containerWithPadding}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} translucent={false} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          i2T<Text style={styles.logoAccent}>ASTE</Text>
        </Text>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>Usuario</Text>
          <Image source={require('../assets/icon.png')} style={styles.avatar} />

          <TouchableOpacity style={styles.menuBtn} onPress={() => setVisible(!visible)}>
            <View style={styles.menuBar} />
            <View style={styles.menuBar} />
            <View style={styles.menuBar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* MENÚS DISPONIBLES */}
      <ScrollView contentContainerStyle={styles.scrollContainerSingle}>
        <Text style={styles.sectionTitleCenter}>Menús Disponibles</Text>

        <View style={styles.cardsGrid}>
          {menus.map((menu) => (
            <ComponenteTarjeta
              key={menu.id}
              title={menu.nombre}
              description={menu.descripcion}
              image={menu.imagen}
              actionLabel={isPedidoRealizado(menu.id) ? '✓ Pedido Realizado' : 'Hacer Pedido'}
              onActionPress={() => hacerPedido(menu.id)}
              style={isPedidoRealizado(menu.id) ? styles.cardSelected : undefined}
            />
          ))}
        </View>
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
              <Text style={styles.textWhite}>Nombre: {nombreUsuario}</Text>
              <Text style={styles.textWhite}>Email: usuario@ejemplo.com</Text>

              <TouchableOpacity
                style={styles.historyBtn}
                onPress={() => {
                  closeSidebar();
                  navigation.navigate('IndexHistorial');
                }}
              >
                <Text style={styles.historyText}>Ver Historial</Text>
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

export default IndexMainUs;
