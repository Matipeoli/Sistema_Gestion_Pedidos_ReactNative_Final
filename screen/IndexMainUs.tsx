import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteTarjeta from '../components/ComponenteTarjeta';

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

interface DayMenu {
  fecha: Date;
  dia: string;
  opciones: MenuOption[];
  seleccionado?: string;
}

const IndexMainUs: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [semanaActual, setSemanaActual] = React.useState<DayMenu[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = React.useState<number>(0);
  const [puedeEditar, setPuedeEditar] = React.useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Menús disponibles (hardcodeados - luego vendrán del backend)
  const menusDisponibles: MenuOption[] = [
    {
      id: '1',
      nombre: 'Hamburguesa Clásica',
      descripcion: 'Pan artesanal, carne de res, lechuga, tomate y queso cheddar.',
      imagen: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
    },
    {
      id: '2',
      nombre: 'Papas Rústicas',
      descripcion: 'Corte grueso, condimento especial y cocción crocante.',
      imagen: 'https://images.unsplash.com/photo-1606756790138-8c3f01a1d9b5',
    },
    {
      id: '3',
      nombre: 'Milkshake de Vainilla',
      descripcion: 'Helado artesanal con crema y jarabe de vainilla natural.',
      imagen: 'https://images.unsplash.com/photo-1565958011705-44e211f59e30',
    },
    {
      id: '4',
      nombre: 'Ensalada César',
      descripcion: 'Lechuga, pollo grillado, crutones y aderezo césar.',
      imagen: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    },
  ];

  React.useEffect(() => {
    generarSemana();
    verificarPlazoEdicion();
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
      
      dias.push({
        fecha,
        dia: nombresDias[fecha.getDay()],
        opciones: menusDisponibles,
        seleccionado: undefined,
      });
    }

    setSemanaActual(dias);
  };

  const verificarPlazoEdicion = () => {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const hora = hoy.getHours();

    if (diaSemana > 4 || (diaSemana === 4 && hora >= 24)) {
      setPuedeEditar(false);
    } else {
      setPuedeEditar(true);
    }
  };

  const seleccionarDia = (index: number) => {
    setDiaSeleccionado(index);
  };

  const seleccionarMenuParaDia = (menuId: string) => {
    if (!puedeEditar) {
      Alert.alert('Plazo cerrado', 'Ya no puedes modificar tu selección. El plazo venció el jueves.');
      return;
    }

    const nuevaSemana = [...semanaActual];
    nuevaSemana[diaSeleccionado].seleccionado = menuId;
    setSemanaActual(nuevaSemana);
    
    Alert.alert('✓ Menú seleccionado', `Tu menú para ${semanaActual[diaSeleccionado].dia} ha sido guardado.`);
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

  const menusDiaActual = semanaActual[diaSeleccionado]?.opciones || [];
  const menuSeleccionadoId = semanaActual[diaSeleccionado]?.seleccionado;

  return (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#222" translucent={false} />
    
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

      {/* CALENDARIO SEMANAL */}
      <View style={styles.calendarioContainer}>
        <View style={styles.calendarioHeader}>
          <Text style={styles.calendarioTitle}>📅 Menú de la Semana</Text>
          {!puedeEditar && (
            <Text style={styles.plazoTexto}>⚠️ Plazo cerrado</Text>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
          {semanaActual.map((dia, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.diaCard,
                diaSeleccionado === index && styles.diaCardSelected,
              ]}
              onPress={() => seleccionarDia(index)}
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
              {dia.seleccionado && (
                <View style={styles.checkMark}>
                  <Text style={styles.checkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.instruccion}>
          {puedeEditar 
            ? '👆 Selecciona un día y elige tu menú abajo' 
            : 'Visualizando menús de la semana'}
        </Text>
      </View>

      {/* TARJETAS DE MENÚ */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.menuDelDia}>
          Menú para {semanaActual[diaSeleccionado]?.dia || 'hoy'}
        </Text>

        <View style={styles.cardsGrid}>
          {menusDiaActual.map((menu) => (
            <ComponenteTarjeta
              key={menu.id}
              title={menu.nombre}
              description={menu.descripcion}
              image={menu.imagen}
              actionLabel={
                menuSeleccionadoId === menu.id 
                  ? '✓ Seleccionado' 
                  : puedeEditar 
                    ? 'Seleccionar' 
                    : 'Ver'
              }
              onActionPress={() => seleccionarMenuParaDia(menu.id)}
              style={menuSeleccionadoId === menu.id ? styles.cardSelected : undefined}
            />
          ))}
        </View>
      </ScrollView>

      {/* MENU HAMBURGUESA (PERFIL) */}
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

              <Text style={styles.title}>Perfil de Usuario</Text>
              <Text style={styles.text}>Nombre: Juan Pérez</Text>
              <Text style={styles.text}>Email: juan.perez@example.com</Text>

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
                style={styles.historyBtn}
                onPress={() => {
                  closeSidebar();
                  navigation.navigate('IndexHistorial');
                }}
              >
                <Text style={styles.historyText}>Ver Historial</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={handleLogout}
              >
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, },
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
  
  // CALENDARIO SEMANAL
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  plazoTexto: {
    color: '#ff4d4d',
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
  checkMark: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#0beb03ff',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: '#000',
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
  
  // SECCIÓN DE MENÚS
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
  cardSelected: {
    borderWidth: 3,
    borderColor: '#0beb03ff',
  },
  
  // SIDEBAR (PERFIL)
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
  closeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },
  recoverBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  recoverText: {
    color: '#0beb03ff',
    fontWeight: 'bold',
  },
  historyBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
  },
  historyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});