import React, { useState, useEffect } from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView, Modal, StatusBar, Platform, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteTarjeta from '../components/ComponenteTarjeta';
import ComponenteMenuModal from '../components/ComponenteMenuModal';

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

  const [semanaActual, setSemanaActual] = useState<DayMenu[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Generar semana con menús actuales
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

  useEffect(() => {
    setSemanaActual(generarSemanaConMenus(todosLosMenus));
  }, []);

  const formatearFecha = (fecha: Date) => `${fecha.getDate()}/${fecha.getMonth() + 1}`;

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

  const agregarMenu = (nuevoMenuData: Omit<MenuOption, 'id'>) => {
    const nuevoId = Math.max(...todosLosMenus.map(m => m.id), 0) + 1;
    const nuevoMenu: MenuOption = { id: nuevoId, ...nuevoMenuData };
    const nuevosMenus = [...todosLosMenus, nuevoMenu];
    setTodosLosMenus(nuevosMenus);
    setSemanaActual(generarSemanaConMenus(nuevosMenus));
    Alert.alert('✓ Agregado', 'El menú ha sido agregado correctamente');
  };

  const editarMenu = (id: number, datos: Omit<MenuOption, 'id'>) => {
    const nuevosMenus = todosLosMenus.map(menu =>
      menu.id === id ? { ...menu, ...datos } : menu
    );
    setTodosLosMenus(nuevosMenus);
    setSemanaActual(generarSemanaConMenus(nuevosMenus));
    Alert.alert('✓ Actualizado', 'El menú ha sido actualizado correctamente');
  };

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
            setSemanaActual(generarSemanaConMenus(nuevosMenus));
            Alert.alert('✓ Eliminado', 'El menú ha sido eliminado');
          },
        },
      ]
    );
  };

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
  };

  const menusDiaActual = semanaActual[diaSeleccionado]?.menus || [];

  return (
    <View style={{ flex: 1, backgroundColor: '#111', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <StatusBar barStyle="light-content" backgroundColor="#222" translucent={false} />

      {/* HEADER */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#222' }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>i2T<Text style={{ color: '#0beb03ff' }}>ASTE</Text></Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#fff', marginRight: 8 }}>Admin</Text>
          <Image source={require('../assets/icon.png')} style={{ width: 32, height: 32, borderRadius: 16 }} />
          <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setVisible(!visible)}>
            <View style={{ width: 20, height: 2, backgroundColor: '#fff', marginVertical: 2 }} />
            <View style={{ width: 20, height: 2, backgroundColor: '#fff', marginVertical: 2 }} />
            <View style={{ width: 20, height: 2, backgroundColor: '#fff', marginVertical: 2 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CALENDARIO */}
      <View style={{ backgroundColor: '#1e1e1e', paddingVertical: 16, borderBottomWidth: 2, borderBottomColor: '#0beb03ff' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>📅 Vista Semanal de Menús</Text>
          <Text style={{ color: '#0beb03ff', fontSize: 12, fontWeight: 'bold' }}>{todosLosMenus.length} menús disponibles</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 12 }}>
          {semanaActual.map((dia, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: diaSeleccionado === index ? '#0beb03ff' : '#2a2a2a',
                borderRadius: 12,
                padding: 12,
                marginHorizontal: 4,
                minWidth: 70,
                alignItems: 'center',
                borderWidth: 2,
                borderColor: diaSeleccionado === index ? '#0beb03ff' : 'transparent',
              }}
              onPress={() => setDiaSeleccionado(index)}
            >
              <Text style={{ color: diaSeleccionado === index ? '#000' : '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>{dia.dia}</Text>
              <Text style={{ color: diaSeleccionado === index ? '#000' : '#999', fontSize: 12 }}>{`${dia.fecha.getDate()}/${dia.fecha.getMonth() + 1}`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={{ color: '#999', fontSize: 12, textAlign: 'center', marginTop: 12, paddingHorizontal: 16 }}>👆 Gestiona los menús disponibles para toda la semana</Text>
      </View>

      {/* TARJETAS DE MENÚ */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Menús Disponibles</Text>
          <TouchableOpacity style={{ backgroundColor: '#0beb03ff', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 }} onPress={abrirModalAgregar}>
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 14 }}>+ Agregar Menú</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
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
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }} activeOpacity={1} onPress={closeSidebar}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={{ backgroundColor: '#333', padding: 24, borderTopLeftRadius: 20, borderTopRightRadius: 20, minHeight: 350 }}>
              <TouchableOpacity style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }} onPress={closeSidebar}>
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>✕</Text>
              </TouchableOpacity>
              <Text style={{ color: '#fff', fontSize: 22, marginBottom: 20, marginTop: 20, fontWeight: 'bold' }}>Panel de Administrador</Text>
              <Text style={{ color: '#fff', marginBottom: 12, fontSize: 16 }}>Nombre: Admin Aroma Light</Text>
              <Text style={{ color: '#fff', marginBottom: 12, fontSize: 16 }}>Email: admin@aromalight.com</Text>

              <TouchableOpacity style={{ marginTop: 16, padding: 12, backgroundColor: '#444', borderRadius: 8, alignItems: 'center' }} onPress={() => { closeSidebar(); Alert.alert('Recuperar Contraseña', 'Funcionalidad en desarrollo'); }}>
                <Text style={{ color: '#0beb03ff', fontWeight: 'bold' }}>Recuperar Contraseña</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 16, padding: 12, backgroundColor: '#444', borderRadius: 8, alignItems: 'center' }} onPress={() => { closeSidebar(); navigation.navigate('HistorialAL'); }}>
                <Text style={{ color: '#0beb03ff', fontWeight: 'bold' }}>📊 Ver Pedidos</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 16, padding: 12, backgroundColor: '#ff4444', borderRadius: 8, alignItems: 'center' }} onPress={handleLogout}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar Sesión</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default IndexPedidoAL;
