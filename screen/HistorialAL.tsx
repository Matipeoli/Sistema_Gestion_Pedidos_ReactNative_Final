import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import ComponenteBoton from '../components/ComponenteBoton';
import { styles, colors } from '../styles/StylesApp';

const API_URL = 'http://192.168.0.10:8080'; // cambia a tu IP

type RootStackParamList = {
  IndexPedidoAL: undefined;
  LoginScreen: undefined;
};

interface DetallePedido {
  nombreUsuario: string;
  email: string;
  observacion: string;
  fecha: string;
}

interface Pedido {
  id: string;
  nombre: string;
  observaciones: string;
  cantidad: number;
  detalles?: DetallePedido[];
}

const HistorialAL: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [detalleVisible, setDetalleVisible] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  // carga todos los pedidos al iniciar
  useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = async () => {
    try {
      const res = await axios.get(`${API_URL}/pedido`);
      setPedidos(res.data);
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      Alert.alert('Error', 'No se pudieron cargar los pedidos.');
    }
  };

  const abrirDetalle = async (pedido: Pedido) => {
    try {
      const res = await axios.get(`${API_URL}/pedidos/detalle/${pedido.id}`);
      setPedidoSeleccionado({ ...pedido, detalles: res.data });
      setDetalleVisible(true);
    } catch (error) {
      console.error('Error al obtener detalles:', error);
      Alert.alert('Error', 'No se pudieron cargar los detalles del pedido.');
    }
  };

  const fechaActual = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
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

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.background, alignItems: 'center', paddingVertical: 20 }}>
        <View style={styles.cardWhite}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>PEDIDOS</Text>
            <Text style={styles.tableDate}>{fechaActual}</Text>
          </View>

          {/* ENCABEZADOS DE COLUMNAS */}
          <View style={styles.rowHeader}>
            <Text style={[styles.cell, styles.cellHeader, styles.colNombre]}>Nombre</Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colObservaciones]}>Observaciones</Text>
            <Text style={[styles.cell, styles.cellHeader, styles.colCantidad]}>Cantidad</Text>
          </View>

          {/* FILAS DE PEDIDOS */}
          {pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.row}>
              <Text style={[styles.cell, styles.colNombre]}>{pedido.nombre}</Text>
              <View style={styles.colObservaciones}>
                <TouchableOpacity
                  style={styles.detalleBtn}
                  onPress={() => abrirDetalle(pedido)}
                >
                  <Text style={styles.detalleBtnText}>👁️ Ver Observaciones</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.cell, styles.colCantidad]}>{pedido.cantidad}</Text>
            </View>
          ))}

          <ComponenteBoton
            title="Actualizar"
            onPress={obtenerPedidos}
          />
        </View>
      </ScrollView>

      {/* MODAL DE DETALLE DE PEDIDO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detalleVisible}
        onRequestClose={() => setDetalleVisible(false)}
      >
        <View style={styles.modalOverlayDetalle}>
          <View style={styles.modalContainerDetalle}>
            <View style={styles.modalHeaderDetalle}>
              <Text style={styles.modalTitleDetalle}>Detalle del Pedido</Text>
              <TouchableOpacity
                style={styles.closeBtnDetalle}
                onPress={() => setDetalleVisible(false)}
              >
                <Text style={styles.closeTextDetalle}>✕</Text>
              </TouchableOpacity>
            </View>

            {pedidoSeleccionado && (
              <>
                <View style={styles.menuInfoDetalle}>
                  <Text style={styles.menuNombreDetalle}>{pedidoSeleccionado.nombre}</Text>
                  <View style={styles.infoRowDetalle}>
                    <Text style={styles.infoLabelDetalle}>Cantidad total:</Text>
                    <Text style={styles.infoValueDetalle}>{pedidoSeleccionado.cantidad}</Text>
                  </View>
                </View>

                <Text style={styles.sectionTitleDetalle}>Personas que solicitaron:</Text>

                <ScrollView style={styles.detallesScroll}>
                  {pedidoSeleccionado.detalles?.map((detalle, index) => (
                    <View key={index} style={styles.detalleCard}>
                      <View style={styles.userHeader}>
                        <View style={styles.avatarCircle}>
                          <Text style={styles.avatarText}>
                            {detalle.nombreUsuario.charAt(0)}
                          </Text>
                        </View>
                        <View style={styles.userInfoDetalle}>
                          <Text style={styles.userNameDetalle}>{detalle.nombreUsuario}</Text>
                          <Text style={styles.userEmailDetalle}>{detalle.email}</Text>
                        </View>
                      </View>

                      <Text style={styles.fechaText}>Fecha: {detalle.fecha}</Text>
                      <Text style={styles.observacionText}>Observación: {detalle.observacion}</Text>
                    </View>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={styles.cerrarBtnDetalle}
                  onPress={() => setDetalleVisible(false)}
                >
                  <Text style={styles.cerrarBtnTextDetalle}>Cerrar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

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
                style={styles.historyBtn}
                onPress={() => {
                  closeSidebar();
                  navigation.navigate('IndexPedidoAL');
                }}
              >
                <Text style={styles.historyText}>Volver a la pantalla inicial</Text>
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

export default HistorialAL;
