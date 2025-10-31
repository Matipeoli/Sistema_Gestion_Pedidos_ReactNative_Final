import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import ComponenteTarjeta from '../components/ComponenteTarjeta';
import ComponenteMenuModal from '../components/ComponenteMenuModal';
import { styles, colors } from '../styles/StylesApp';

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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [visible, setVisible] = useState(false);
  const [modalFormVisible, setModalFormVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [menuEditando, setMenuEditando] = useState<MenuOption | null>(null);
  const [todosLosMenus, setTodosLosMenus] = useState<MenuOption[]>([]);
  const [semanaActual, setSemanaActual] = useState<DayMenu[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);
  const [pedidoSemanal, setPedidoSemanal] = useState<MenuOption[]>([]);

  // ⚙️ URL base del backend (ajustala a tu IP local o dominio del servidor)
  const BASE_URL = 'http://192.168.0.10:8080'; 

  // 🟢 Cargar todos los menús desde el backend
  const cargarMenus = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/menu/todos`);
      const data = response.data.map((m: any) => ({
        id: m.id,
        title: m.titulo,
        description: m.descripcion,
        image: m.img,
      }));
      setTodosLosMenus(data);
      setSemanaActual(generarSemanaConMenus(data));
    } catch (error) {
      console.error('Error al cargar los menús:', error);
      Alert.alert('Error', 'No se pudieron cargar los menús desde el servidor.');
    }
  };

  useEffect(() => {
    cargarMenus();
  }, []);

  // 🗓️ Generar semana con los menús
  const generarSemanaConMenus = (menus: MenuOption[]): DayMenu[] => {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const diasHastaLunes = diaSemana === 0 ? 1 : 8 - diaSemana;
    const lunesSiguiente = new Date(hoy);
    lunesSiguiente.setDate(hoy.getDate() + diasHastaLunes);

    const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const dias: DayMenu[] = [];

    for (let i = 0; i < 5; i++) {
      const fecha = new Date(lunesSiguiente);
      fecha.setDate(lunesSiguiente.getDate() + i);
      dias.push({
        fecha,
        dia: nombresDias[fecha.getDay()],
        menus: [...menus],
      });
    }

    return dias;
  };

  // ➕ Agregar nuevo menú
  const agregarMenu = async (nuevoMenuData: Omit<MenuOption, 'id'>) => {
    try {
      await axios.post(`${BASE_URL}/menu/save`, {
        titulo: nuevoMenuData.title,
        descripcion: nuevoMenuData.description,
        img: nuevoMenuData.image,
        id_tipo: 1, // Ajustá según tu modelo
      });
      Alert.alert('✅ Agregado', 'El menú fue agregado correctamente.');
      cargarMenus();
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el menú.');
    }
  };

  // ✏️ Editar menú
  const editarMenu = async (id: number, datos: Omit<MenuOption, 'id'>) => {
    try {
      await axios.put(`${BASE_URL}/menu/edit`, {
        id,
        titulo: datos.title,
        descripcion: datos.description,
        img: datos.image,
        id_tipo: 1,
      });
      Alert.alert('✅ Actualizado', 'El menú fue actualizado correctamente.');
      cargarMenus();
    } catch (error) {
      Alert.alert('Error', 'No se pudo editar el menú.');
    }
  };

  // ❌ Eliminar menú
  const eliminarMenu = async (menuId: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro que querés eliminar este menú?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${BASE_URL}/menu/delete/${menuId}`);
              Alert.alert('✓ Eliminado', 'El menú fue eliminado correctamente.');
              cargarMenus();
            } catch {
              Alert.alert('Error', 'No se pudo eliminar el menú.');
            }
          },
        },
      ]
    );
  };

  // 🧾 Confirmar pedido (envía varios menús diarios al backend)
  const confirmarPedido = async () => {
    if (pedidoSemanal.length === 0) {
      Alert.alert('⚠️ Sin selección', 'Seleccioná al menos un menú antes de confirmar.');
      return;
    }

    const fechaActual = new Date().toISOString().split('T')[0];
    const payload = pedidoSemanal.map(menu => ({
      menuId: menu.id,
      fecha: fechaActual,
    }));

    try {
      await axios.post(`${BASE_URL}/menuDiario/agregarVarios`, payload);
      Alert.alert('✅ Pedido confirmado', 'Los menús fueron agregados al menú diario.');
      setPedidoSemanal([]);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo confirmar el pedido.');
    }
  };

  const seleccionarMenu = (menuId: number) => {
    const menu = todosLosMenus.find(m => m.id === menuId);
    if (!menu) return;

    if (pedidoSemanal.some(m => m.id === menuId)) {
      Alert.alert('⚠️ Ya agregado', 'Este menú ya está en el pedido.');
      return;
    }

    setPedidoSemanal([...pedidoSemanal, menu]);
    Alert.alert('✅ Agregado', `"${menu.title}" fue agregado al pedido.`);
  };

  const abrirModalAgregar = () => {
    setModoEdicion(false);
    setMenuEditando(null);
    setModalFormVisible(true);
  };

  const abrirModalEditar = (menu: MenuOption) => {
    setModoEdicion(true);
    setMenuEditando(menu);
    setModalFormVisible(true);
  };

  const closeSidebar = () => setVisible(false);
  const handleLogout = () => {
    closeSidebar();
    navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
  };

  return (
    <View style={styles.containerWithPadding}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBg} translucent={false} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          i2T<Text style={styles.logoAccent}>ASTE</Text>
        </Text>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Admin</Text>
          <Image source={require('../assets/icon.png')} style={styles.avatar} />
          <TouchableOpacity style={styles.menuBtn} onPress={() => setVisible(!visible)}>
            <View style={styles.menuBar} />
            <View style={styles.menuBar} />
            <View style={styles.menuBar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CALENDARIO */}
      <View style={styles.calendarioContainer}>
        <View style={styles.calendarioHeader}>
          <Text style={styles.calendarioTitle}>📅 Vista Semanal de Menús</Text>
          <Text style={[styles.textSmall, { color: colors.primaryDark, fontWeight: 'bold' }]}>
            {todosLosMenus.length} menús disponibles
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
          {semanaActual.map((dia, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.diaCard, diaSeleccionado === index && styles.diaCardSelected]}
              onPress={() => setDiaSeleccionado(index)}
            >
              <Text style={[styles.diaNombre, diaSeleccionado === index && styles.diaTextoSelected]}>
                {dia.dia}
              </Text>
              <Text style={[styles.diaFecha, diaSeleccionado === index && styles.diaTextoSelected]}>
                {`${dia.fecha.getDate()}/${dia.fecha.getMonth() + 1}`}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* TARJETAS DE MENÚ */}
      <ScrollView contentContainerStyle={styles.scrollContainerSingle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>Menús Disponibles</Text>
          <TouchableOpacity style={styles.buttonPrimary} onPress={abrirModalAgregar}>
            <Text style={styles.buttonPrimaryText}>+ Agregar Menú</Text>
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
              onEdit={() => abrirModalEditar(menu)}
              onDelete={eliminarMenu}
              onConfirm={seleccionarMenu}
            />
          ))}
        </View>
      </ScrollView>

      {/* BOTÓN CONFIRMAR PEDIDO */}
      {pedidoSemanal.length > 0 && (
        <TouchableOpacity style={[styles.buttonPrimary, { margin: 16 }]} onPress={confirmarPedido}>
          <Text style={styles.buttonPrimaryText}>✅ Confirmar Pedido ({pedidoSemanal.length})</Text>
        </TouchableOpacity>
      )}

      {/* MODAL FORMULARIO */}
      <ComponenteMenuModal
        visible={modalFormVisible}
        modoEdicion={modoEdicion}
        menuEditando={menuEditando}
        onSave={(menuData) => {
          if (modoEdicion && menuEditando) {
            editarMenu(menuEditando.id, menuData);
          } else {
            agregarMenu(menuData);
          }
          setModalFormVisible(false);
        }}
        onCancel={() => setModalFormVisible(false)}
      />

      {/* SIDEBAR */}
      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeSidebar}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sidebar}>
              <TouchableOpacity style={styles.closeBtn} onPress={closeSidebar}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
              <Text style={styles.sidebarTitle}>Panel de Administrador</Text>
              <Text style={styles.textWhite}>Nombre: Admin Aroma Light</Text>
              <Text style={styles.textWhite}>Email: admin@aromalight.com</Text>

              <TouchableOpacity
                style={styles.historyBtn}
                onPress={() => { closeSidebar(); navigation.navigate('HistorialAL'); }}
              >
                <Text style={styles.historyText}>📊 Ver Pedidos</Text>
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

export default IndexPedidoAL;
