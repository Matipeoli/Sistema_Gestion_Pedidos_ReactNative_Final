import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert, StatusBar, Platform, TextInput } from 'react-native';
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
}

interface DayMenu {
  fecha: Date;
  dia: string;
  menus: MenuOption[];
}

const IndexPedidoAL: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [menuEditando, setMenuEditando] = useState<MenuOption | null>(null);
  
  const [semanaActual, setSemanaActual] = useState<DayMenu[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);
  
  // Estados del formulario
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Menús del sistema (todos disponibles)
  const [todosLosMenus, setTodosLosMenus] = useState<MenuOption[]>([
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
  ]);

  React.useEffect(() => {
    generarSemana();
  }, [todosLosMenus]);

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
        menus: [...todosLosMenus],
      });
    }

    setSemanaActual(dias);
  };

  const formatearFecha = (fecha: Date) => {
    return `${fecha.getDate()}/${fecha.getMonth() + 1}`;
  };

  // ABRIR MODAL PARA AGREGAR
  const abrirModalAgregar = () => {
    setModoEdicion(false);
    setMenuEditando(null);
    setTitulo('');
    setDescripcion('');
    setImagen('https://images.unsplash.com/photo-');
    setModalFormVisible(true);
  };

  // ABRIR MODAL PARA EDITAR
  const abrirModalEditar = (menu: MenuOption) => {
    setModoEdicion(true);
    setMenuEditando(menu);
    setTitulo(menu.title);
    setDescripcion(menu.description);
    setImagen(menu.image);
    setModalFormVisible(true);
  };

  // GUARDAR MENU (AGREGAR O EDITAR)
  const guardarMenu = () => {
    if (!titulo.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }
    if (!descripcion.trim()) {
      Alert.alert('Error', 'La descripción es obligatoria');
      return;
    }
    if (!imagen.trim()) {
      Alert.alert('Error', 'La URL de la imagen es obligatoria');
      return;
    }

    if (modoEdicion && menuEditando) {
      // EDITAR MENÚ EXISTENTE
      const nuevosMenus = todosLosMenus.map(menu =>
        menu.id === menuEditando.id
          ? { ...menu, title: titulo, description: descripcion, image: imagen }
          : menu
      );
      setTodosLosMenus(nuevosMenus);
      Alert.alert('✓ Actualizado', 'El menú ha sido actualizado correctamente');
    } else {
      // AGREGAR NUEVO MENÚ
      const nuevoId = Math.max(...todosLosMenus.map(m => m.id), 0) + 1;
      const nuevoMenu: MenuOption = {
        id: nuevoId,
        title: titulo,
        description: descripcion,
        image: imagen,
      };
      setTodosLosMenus([...todosLosMenus, nuevoMenu]);
      Alert.alert('✓ Agregado', 'El menú ha sido agregado correctamente');
    }

    setModalFormVisible(false);
  };

  // ELIMINAR MENU
  const eliminarMenu = (menuId: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar este menú? Se eliminará de todos los días.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const nuevosMenus = todosLosMenus.filter(m => m.id !== menuId);
            setTodosLosMenus(nuevosMenus);
            Alert.alert('✓ Eliminado', 'El menú ha sido eliminado');
          },
        },
      ]
    );
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
          <Text style={styles.calendarioTitle}>📅 Vista Semanal de Menús</Text>
          <Text style={styles.infoText}>
            {todosLosMenus.length} menús disponibles
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
          {semanaActual.map((dia, index) => (
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
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.instruccion}>
          👆 Gestiona los menús disponibles para toda la semana
        </Text>
      </View>

      {/* TARJETAS DE MENÚ */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tituloConBoton}>
          <Text style={styles.menuDelDia}>Menús Disponibles</Text>
          <TouchableOpacity style={styles.agregarBtn} onPress={abrirModalAgregar}>
            <Text style={styles.agregarBtnText}>+ Agregar Menú</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardsGrid}>
          {todosLosMenus.map((menu) => (
            <ComponenteTarjeta
              key={menu.id}
              id={menu.id}
              title={menu.title}
              description={menu.description}
              image={menu.image}
              showAdminActions={true}
              onEdit={abrirModalEditar}
              onDelete={eliminarMenu}
            />
          ))}
        </View>
      </ScrollView>

      {/* MODAL FORMULARIO (AGREGAR/EDITAR) */}
      <Modal
        visible={modalFormVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalFormVisible(false)}
      >
        <View style={styles.modalOverlayForm}>
          <View style={styles.modalForm}>
            <Text style={styles.modalFormTitulo}>
              {modoEdicion ? '✏️ Editar Menú' : '➕ Agregar Nuevo Menú'}
            </Text>

            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Hamburguesa Premium"
              placeholderTextColor="#999"
              value={titulo}
              onChangeText={setTitulo}
            />

            <Text style={styles.label}>Descripción *</Text>
            <TextInput
              style={[styles.input, styles.inputMultiline]}
              placeholder="Descripción del menú..."
              placeholderTextColor="#999"
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={3}
            />

            <Text style={styles.label}>URL de Imagen *</Text>
            <TextInput
              style={styles.input}
              placeholder="https://images.unsplash.com/..."
              placeholderTextColor="#999"
              value={imagen}
              onChangeText={setImagen}
            />

            <View style={styles.botonesModal}>
              <TouchableOpacity
                style={styles.btnCancelar}
                onPress={() => setModalFormVisible(false)}
              >
                <Text style={styles.btnCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnGuardar}
                onPress={guardarMenu}
              >
                <Text style={styles.btnGuardarTexto}>
                  {modoEdicion ? 'Actualizar' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
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
  instruccion: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
  },

  // MENÚS
  scrollContainer: {
    padding: 16,
    paddingTop: 20,
  },
  tituloConBoton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuDelDia: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  agregarBtn: {
    backgroundColor: '#0beb03ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  agregarBtnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // MODAL FORMULARIO
  modalOverlayForm: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalForm: {
    width: '90%',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  modalFormTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#444',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancelarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnGuardar: {
    flex: 1,
    backgroundColor: '#0beb03ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnGuardarTexto: {
    color: '#000',
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