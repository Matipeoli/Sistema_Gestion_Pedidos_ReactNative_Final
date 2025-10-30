import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteTarjeta from '../components/ComponenteTarjeta';

type RootStackParamList = {
  LoginScreen: undefined;
  IndexPedidoAL: undefined;
  HistorialAL: undefined;
};

interface MenuOption {
  id: number;
  title: string;
  description: string;
  image: string;
  activo: boolean; // Si está disponible para ese día
}

interface DayMenu {
  fecha: Date;
  dia: string;
  menus: MenuOption[];
}

const IndexPedidoAL: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [semanaActual, setSemanaActual] = useState<DayMenu[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Todos los menús disponibles en el sistema
  const todosLosMenus: Omit<MenuOption, 'activo'>[] = [
    {
      id: 1,
      title: 'Hamburguesa Clásica',
      description: 'Pan artesanal, carne de res, lechuga, tomate y queso cheddar.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    },
    {
      id: 2,
      title: 'Papas Rústicas',
      description: 'Corte grueso, condimento especial y cocción crocante.',
      image: 'https://images.unsplash.com/photo-1606756790138-8c3f01a1d9b5',
    },
    {
      id: 3,
      title: 'Milkshake de Vainilla',
      description: 'Helado artesanal con crema y jarabe de vainilla natural.',
      image: 'https://images.unsplash.com/photo-1565958011705-44e211f59e30',
    },
    {
      id: 4,
      title: 'Ensalada César',
      description: 'Lechuga, pollo grillado, crutones y aderezo césar.',
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    },
  ];

  React.useEffect(() => {
    generarSemana();
  }, []);

  const generarSemana = () => {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const diasHastaLunes = diaSemana === 0 ? 1 : 8 - diaSemana;
    const lunesSiguiente = new Date(hoy);
    lunesSiguiente.setDate(hoy.getDate() + diasHastaLunes);

    const dias: DayMenu[] = [];
    const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    for (let i = 0; i < 5; i++) {
      const fecha = new Date(lunesSiguiente);
      fecha.setDate(lunesSiguiente.getDate() + i);
      
      // Por defecto, todos los menús están activos
      const menusConEstado = todosLosMenus.map(menu => ({
        ...menu,
        activo: true,
      }));

      dias.push({
        fecha,
        dia: nombresDias[fecha.getDay()],
        menus: menusConEstado,
      });
    }

    setSemanaActual(dias);
  };

  const toggleMenuDelDia = (menuId: number) => {
    const nuevaSemana = [...semanaActual];
    const menuIndex = nuevaSemana[diaSeleccionado].menus.findIndex(m => m.id === menuId);
    
    if (menuIndex !== -1) {
      nuevaSemana[diaSeleccionado].menus[menuIndex].activo = 
        !nuevaSemana[diaSeleccionado].menus[menuIndex].activo;
      setSemanaActual(nuevaSemana);
    }
  };

  const guardarConfiguracion = () => {
    // Aquí se guardaría en el backend
    console.log('Configuración guardada:', semanaActual);
    Alert.alert('✓ Guardado', 'La configuración de menús ha sido guardada correctamente.');
  };

  const formatearFecha = (fecha: Date) => {
    return `${fecha.getDate()}/${fecha.getMonth() + 1}`;
  };

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const menusDiaActual = semanaActual[diaSeleccionado]?.menus || [];
  const menusActivos = menusDiaActual.filter(m => m.activo).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#222" translucent={false} />
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          i2T<Text style={{ color: '#0beb03ff' }}>ASTE</Text>
        </Text>

        <View style={styles.userInfo}>
          <Text style={styles.name}>Admin</Text>
          <Image source={require('../assets/icon.png')} style={styles.avatar} />

          <TouchableOpacity style={styles.menuBtn} onPress={() => setVisible(!visible)}>
            <View style={styles.bar} />
            <View style={styles.bar} />
            <View style={styles.bar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CALENDARIO SEMANAL */}
      <View style={styles.calendarioContainer}>
        <View style={styles.calendarioHeader}>
          <Text style={styles.calendarioTitle}>📅 Configurar Menús por Día</Text>
          <Text style={styles.infoText}>
            {menusActivos} de {menusDiaActual.length} activos
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
          {semanaActual.map((dia, index) => {
            const activos = dia.menus.filter(m => m.activo).length;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.diaCard,
                  diaSeleccionado === index && styles.diaCardSelected,
                ]}
                onPress={() => setDiaSeleccionado(index)}
              >
                <Text style={[
                  styles.diaNombre,
                  diaSeleccionado === index && styles.diaTextoSelected,
                ]}>
                  {dia.dia}
                </Text>
                <Text style={[
                  styles.diaFecha,
                  diaSeleccionado === index && styles.diaTextoSelected,
                ]}>
                  {formatearFecha(dia.fecha)}
                </Text>
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{activos}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.instruccion}>
          👆 Selecciona un día y activa/desactiva los menús disponibles
        </Text>
      </View>

      {/* TARJETAS DE MENÚ */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.menuDelDia}>
          Configurar {semanaActual[diaSeleccionado]?.dia || ''}
        </Text>

        <View style={styles.cardsGrid}>
          {menusDiaActual.map((menu) => (
            <View key={menu.id} style={styles.cardWrapper}>
              <ComponenteTarjeta
                title={menu.title}
                description={menu.description}
                image={menu.image}
                actionLabel={menu.activo ? '✓ Activo' : '✕ Desactivado'}
                onActionPress={() => toggleMenuDelDia(menu.id)}
                style={menu.activo ? styles.cardActiva : styles.cardInactiva}
              />
              {!menu.activo && (
                <View style={styles.overlayInactivo}>
                  <Text style={styles.overlayText}>DESACTIVADO</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* BOTÓN GUARDAR */}
        <TouchableOpacity style={styles.guardarBtn} onPress={guardarConfiguracion}>
          <Text style={styles.guardarBtnText}>💾 Guardar Configuración</Text>
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

              <Text style={styles.title}>Panel de Administrador</Text>
              <Text style={styles.text}>Nombre: Admin Aroma Light</Text>
              <Text style={styles.text}>Email: admin@aromalight.com</Text>

              <TouchableOpacity
                style={styles.recoverBtn}
                onPress={() => {
                  closeSidebar();
                  Alert.alert('Recuperar Contraseña', 'Funcionalidad en desarrollo');
                }}
              >
                <Text style={styles.recoverText}>Recuperar Contraseña</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.recoverBtn}
                onPress={() => {
                  closeSidebar();
                  navigation.navigate('HistorialAL');
                }}
              >
                <Text style={styles.recoverText}>📊 Ver Pedidos</Text>
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
  container: { 
    flex: 1, 
    backgroundColor: '#111',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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

  // CALENDARIO
  calendarioContainer: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#0beb03ff',
  },
  calendarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  calendarioTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#0beb03ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  diasScroll: {
    paddingHorizontal: 12,
  },
  diaCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    minWidth: 70,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  diaCardSelected: {
    backgroundColor: '#0beb03ff',
    borderColor: '#0beb03ff',
  },
  diaNombre: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  diaFecha: {
    color: '#999',
    fontSize: 12,
  },
  diaTextoSelected: {
    color: '#000',
  },
  badgeContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff6b00',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instruccion: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
  },

  // MENÚS
  menuDelDia: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 20,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  cardActiva: {
    borderWidth: 2,
    borderColor: '#0beb03ff',
  },
  cardInactiva: {
    opacity: 0.5,
    borderWidth: 2,
    borderColor: '#ff4444',
  },
  overlayInactivo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  overlayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    transform: [{ rotate: '-15deg' }],
  },

  // BOTÓN GUARDAR
  guardarBtn: {
    backgroundColor: '#0beb03ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  guardarBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
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
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  closeText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  text: { color: '#fff', marginBottom: 12, fontSize: 16 },
  recoverBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  recoverText: { color: '#0beb03ff', fontWeight: 'bold' },
  logoutBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});

export default IndexPedidoAL;