import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteTarjeta from '../components/ComponenteTarjeta';
import ComponenteMenuModal from '../components/ComponenteMenuModal';
import { styles, colors } from '../styles/StylesApp';
import { obtenerMenus, crearMenu, editarMenu as editarMenuApi, eliminarMenu as eliminarMenuApi } from '../api/menuApi';

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
  const [pedidoSemanal, setPedidoSemanal] = useState<MenuOption[]>([]);
  const [todosLosMenus, setTodosLosMenus] = useState<MenuOption[]>([]);
  const [semanaActual, setSemanaActual] = useState<DayMenu[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

  //carga menus desde el backend
  const cargarMenus = async () => {
    try {
      const data = await obtenerMenus();
      const menusFormateados = data.map((menu: any) => ({
        id: menu.id,
        title: menu.titulo,
        description: menu.descripcion,
        image: menu.img,
      }));
      setTodosLosMenus(menusFormateados);
      setSemanaActual(generarSemanaConMenus(menusFormateados));
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudieron cargar los menús del servidor.');
    }
  };

  useEffect(() => {
    cargarMenus();
  }, []);

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

  //crea menus
  const agregarMenu = async (nuevoMenuData: Omit<MenuOption, 'id'>) => {
    try {
      const menuParaBackend = {
        img: nuevoMenuData.image,
        titulo: nuevoMenuData.title,
        descripcion: nuevoMenuData.description,
        id_tipo: 1, // puedes ajustar según tu base de datos
      };
      await crearMenu(menuParaBackend);
      Alert.alert('✓ Agregado', 'El menú ha sido agregado correctamente');
      cargarMenus();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo agregar el menú');
    }
  };

  //editar menus
  const editarMenu = async (id: number, datos: Omit<MenuOption, 'id'>) => {
    try {
      const menuParaBackend = {
        id,
        img: datos.image,
        titulo: datos.title,
        descripcion: datos.description,
        id_tipo: 1,
      };
      await editarMenuApi(menuParaBackend);
      Alert.alert('Actualizado', 'El menú ha sido actualizado correctamente');
      cargarMenus();
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo editar el menú');
    }
  };

  // eliminar menus
  const eliminarMenu = async (menuId: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de eliminar este menú?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarMenuApi(menuId);
              Alert.alert('Eliminado', 'El menú ha sido eliminado');
              cargarMenus();
            } catch (err) {
              console.error(err);
              Alert.alert('Error', 'No se pudo eliminar el menú');
            }
          },
        },
      ]
    );
  };

  //confirmar pedido (local)
  const confirmarPedido = (menuId: number) => {
    const menuSeleccionado = todosLosMenus.find(m => m.id === menuId);
    if (!menuSeleccionado) return;

    if (pedidoSemanal.some(m => m.id === menuId)) {
      Alert.alert('Ya confirmado', 'Este menú ya fue agregado al pedido semanal.');
      return;
    }

    setPedidoSemanal([...pedidoSemanal, menuSeleccionado]);
    Alert.alert('Pedido confirmado', `El menú "${menuSeleccionado.title}" fue agregado al pedido semanal.`);
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
          <Text style={styles.calendarioTitle}>Vista Semanal de Menús</Text>
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
        <Text style={styles.instruccion}>Gestiona los menús disponibles para toda la semana</Text>
      </View>

      {/* TARJETAS DE MENÚ */}
      <ScrollView contentContainerStyle={styles.scrollContainerSingle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={styles.sectionTitle}>Menús Disponibles</Text>
          <TouchableOpacity style={styles.buttonPrimary} onPress={abrirModalAgregar}>
            <Text style={styles.buttonPrimaryText}>Agregar Menú</Text>
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
              onEdit={(id) => {
                const menuToEdit = todosLosMenus.find(m => m.id === id);
                if (menuToEdit) abrirModalEditar(menuToEdit);
              }}
              onDelete={eliminarMenu}
              onConfirm={confirmarPedido}
            />
          ))}
        </View>
      </ScrollView>

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

      {/* MENU HAMBURGUESA */}
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
                onPress={() => {
                  closeSidebar();
                  navigation.navigate('HistorialAL');
                }}
              >
                <Text style={styles.historyText}>Ver Pedidos</Text>
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
