import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import ComponenteTarjeta from '../components/ComponenteTarjeta';
import { styles, colors } from '../styles/StylesApp';

// cambiar ip por la q les correspondan
const API_URL = 'http://192.168.0.10:8080';

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

  // genera la semana actual al cargar el componente
  React.useEffect(() => {
    generarSemana();
    verificarPlazoEdicion();
  }, []);

  // carga los menus del dia seleccionado
  React.useEffect(() => {
    if (semanaActual.length > 0) {
      const fecha = semanaActual[diaSeleccionado].fecha.toISOString().split('T')[0];
      obtenerMenusDelDia(fecha);
    }
  }, [diaSeleccionado, semanaActual.length]);

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
        opciones: [],
        seleccionado: undefined,
      });
    }

    setSemanaActual(dias);
  };

  const verificarPlazoEdicion = () => {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const hora = hoy.getHours();
    setPuedeEditar(!(diaSemana > 4 || (diaSemana === 4 && hora >= 24)));
  };

  // obtiene los menus disponibles para un dia
  const obtenerMenusDelDia = async (fecha: string) => {
    try {
      const response = await axios.get(`${API_URL}/menuDiario/todos/${fecha}`);
      const opciones = response.data.map((m: any) => ({
        id: m.menu.id.toString(),
        nombre: m.menu.titulo,
        descripcion: m.menu.descripcion,
        imagen: m.menu.img,
      }));

      const nuevaSemana = [...semanaActual];
      nuevaSemana[diaSeleccionado].opciones = opciones;
      setSemanaActual(nuevaSemana);
    } catch (error) {
      console.error('Error obteniendo menús:', error);
      Alert.alert('Error', 'No se pudieron cargar los menús de este día.');
    }
  };

  // guarda lo elegido en el backend
  const seleccionarMenuParaDia = async (menuId: string) => {
    if (!puedeEditar) {
      Alert.alert('Plazo cerrado', 'Ya no puedes modificar tu selección. El plazo venció el jueves.');
      return;
    }

    try {
      const fecha = semanaActual[diaSeleccionado].fecha.toISOString().split('T')[0];

      await axios.post(`${API_URL}/menuDiario/agregar`, {
        menuId: parseInt(menuId),
        fecha: fecha,
      });

      const nuevaSemana = [...semanaActual];
      nuevaSemana[diaSeleccionado].seleccionado = menuId;
      setSemanaActual(nuevaSemana);

      Alert.alert('Menú seleccionado', `Tu menú para ${semanaActual[diaSeleccionado].dia} ha sido guardado.`);
    } catch (error) {
      console.error('Error al guardar selección:', error);
      Alert.alert('Error', 'No se pudo guardar tu selección.');
    }
  };

  const seleccionarDia = (index: number) => setDiaSeleccionado(index);

  const formatearFecha = (fecha: Date) => `${fecha.getDate()}/${fecha.getMonth() + 1}`;

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

      {/* CALENDARIO SEMANAL */}
      <View style={styles.calendarioContainer}>
        <View style={styles.calendarioHeader}>
          <Text style={styles.calendarioTitle}>Menú de la Semana</Text>
          {!puedeEditar && <Text style={styles.plazoTexto}>Plazo cerrado</Text>}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasScroll}>
          {semanaActual.map((dia, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.diaCard, diaSeleccionado === index && styles.diaCardSelected]}
              onPress={() => seleccionarDia(index)}
            >
              <Text style={[styles.diaNombre, diaSeleccionado === index && styles.diaTextoSelected]}>
                {dia.dia}
              </Text>
              <Text style={[styles.diaFecha, diaSeleccionado === index && styles.diaTextoSelected]}>
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
          {puedeEditar ? 'Selecciona tu menú para cada día' : 'No se pueden hacer más cambios'}
        </Text>
      </View>

      {/* TARJETAS DE MENÚ */}
      <ScrollView contentContainerStyle={styles.scrollContainerSingle}>
        <Text style={styles.sectionTitleCenter}>
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
