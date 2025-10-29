import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteBoton from '../components/ComponenteBoton';

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
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Datos hardcodeados (luego vendrán del backend)
  const pedidos: Pedido[] = [
    {
      id: '1',
      nombre: 'Hamburguesa Clásica',
      observaciones: 'Sin cebolla',
      cantidad: 2,
    },
    {
      id: '2',
      nombre: 'Papas Rústicas',
      observaciones: 'Con cheddar',
      cantidad: 1,
    },
    {
      id: '3',
      nombre: 'Milkshake de Vainilla',
      observaciones: 'Sin crema',
      cantidad: 1,
    },
  ];

  // Detalles de ejemplo (simula lo que vendría del backend)
  const obtenerDetalles = (pedidoId: string): DetallePedido[] => {
    // En producción, esto sería una llamada al backend
    const detallesPorPedido: { [key: string]: DetallePedido[] } = {
      '1': [
        {
          nombreUsuario: 'Juan Pérez',
          email: 'juan.perez@empresa.com',
          observacion: 'Sin cebolla',
          fecha: '29/10/2025',
        },
        {
          nombreUsuario: 'María González',
          email: 'maria.gonzalez@empresa.com',
          observacion: 'Sin cebolla, extra queso',
          fecha: '29/10/2025',
        },
      ],
      '2': [
        {
          nombreUsuario: 'Carlos López',
          email: 'carlos.lopez@empresa.com',
          observacion: 'Con cheddar',
          fecha: '29/10/2025',
        },
      ],
      '3': [
        {
          nombreUsuario: 'Ana Martínez',
          email: 'ana.martinez@empresa.com',
          observacion: 'Sin crema',
          fecha: '29/10/2025',
        },
      ],
    };

    return detallesPorPedido[pedidoId] || [];
  };

  const abrirDetalle = (pedido: Pedido) => {
    const detalles = obtenerDetalles(pedido.id);
    setPedidoSeleccionado({ ...pedido, detalles });
    setDetalleVisible(true);
  };

  const fechaActual = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          i2T<Text style={{ color: '#0beb03ff' }}>ASTE</Text>
        </Text>

        <View style={styles.userInfo}>
          <Text style={styles.name}>Manuel</Text>
          <Image source={require('../assets/icon.png')} style={styles.avatar} />

          <TouchableOpacity style={styles.menuBtn} onPress={() => setVisible(!visible)}>
            <View style={styles.bar} />
            <View style={styles.bar} />
            <View style={styles.bar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.tableHeader}>
            <Text style={styles.title}>PEDIDOS</Text>
            <Text style={styles.date}>{fechaActual}</Text>
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
            onPress={() => Alert.alert('Actualizar', 'Pedidos actualizados')}
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
            {/* HEADER DEL MODAL */}
            <View style={styles.modalHeaderDetalle}>
              <Text style={styles.modalTitleDetalle}>Detalle del Pedido</Text>
              <TouchableOpacity
                style={styles.closeBtnDetalle}
                onPress={() => setDetalleVisible(false)}
              >
                <Text style={styles.closeTextDetalle}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* INFORMACIÓN DEL MENÚ */}
            {pedidoSeleccionado && (
              <>
                <View style={styles.menuInfoDetalle}>
                  <Text style={styles.menuNombreDetalle}>{pedidoSeleccionado.nombre}</Text>
                  <View style={styles.infoRowDetalle}>
                    <Text style={styles.infoLabelDetalle}>Cantidad total:</Text>
                    <Text style={styles.infoValueDetalle}>{pedidoSeleccionado.cantidad}</Text>
                  </View>
                </View>

                {/* LISTA DE PERSONAS */}
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
                          <Text style={styles.userName}>{detalle.nombreUsuario}</Text>
                          <Text style={styles.userEmail}>{detalle.email}</Text>
                        </View>
                      </View>

                      <Text style={styles.fechaText}>Fecha: {detalle.fecha}</Text>
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

      {/* MENÚ HAMBURGUESA */}
      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeSidebar}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sidebar}>
              <TouchableOpacity style={styles.closeBtn} onPress={closeSidebar}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>

              <Text style={styles.titleSidebar}>Perfil de Usuario</Text>
              <Text style={styles.text}>Nombre: Juan Pérez</Text>
              <Text style={styles.text}>Email: juan.perez@example.com</Text>

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#222',
  },
  logo: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  name: { color: '#fff', marginRight: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16 },
  menuBtn: { marginLeft: 10 },
  bar: { width: 20, height: 2, backgroundColor: '#fff', marginVertical: 2 },

  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: { fontSize: 20, fontWeight: 'bold', textDecorationLine: 'underline' },
  date: { fontSize: 16, textDecorationLine: 'underline' },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#333',
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: { fontSize: 14, color: '#000' },
  cellHeader: { fontWeight: 'bold', fontSize: 13 },
  colNombre: { width: '35%' },
  colObservaciones: { width: '40%', alignItems: 'center', justifyContent: 'center' },
  colCantidad: { width: '25%', textAlign: 'center' },

  // BOTÓN DETALLE
  detalleBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  detalleBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  // MODAL DETALLE
  modalOverlayDetalle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerDetalle: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  modalHeaderDetalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  modalTitleDetalle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeBtnDetalle: {
    padding: 4,
  },
  closeTextDetalle: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  menuInfoDetalle: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  menuNombreDetalle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoRowDetalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabelDetalle: {
    fontSize: 14,
    color: '#666',
  },
  infoValueDetalle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitleDetalle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  detallesScroll: {
    maxHeight: 300,
  },
  detalleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfoDetalle: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
  },
  observacionContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  observacionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  observacionText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  fechaText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  cerrarBtnDetalle: {
    backgroundColor: '#6c757d',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  cerrarBtnTextDetalle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // SIDEBAR
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  sidebar: {
    backgroundColor: '#333',
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 350,
  },
  closeBtn: { position: 'absolute', top: 16, right: 16, zIndex: 10 },
  closeText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  titleSidebar: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  text: { color: '#fff', marginBottom: 12, fontSize: 16 },
  historyBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  historyText: { color: '#fff', fontWeight: 'bold' },
  logoutBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});

export default HistorialAL;