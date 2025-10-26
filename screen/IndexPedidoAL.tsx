import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteTarjeta from '../components/ComponenteTarjeta';

type RootStackParamList = {
  LoginScreen: undefined;
  IndexMainUs: undefined;
};

interface TarjetaData {
  id: number;
  title: string;
  description: string;
  image?: string;
}

const IndexPedidoAL: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [tarjetas, setTarjetas] = React.useState<TarjetaData[]>([
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  //agrega nueva tarjeta
  const agregarTarjeta = () => {
    const nuevaId = tarjetas.length + 1;
    const nuevaTarjeta: TarjetaData = {
      id: nuevaId,
      title: `Nuevo Producto ${nuevaId}`,
      description: 'Descripción nueva del producto.',
      image: 'https://images.unsplash.com/photo-1604152135912-04a1820d9c3e',
    };
    setTarjetas([...tarjetas, nuevaTarjeta]);
  };

  return (
    <View style={styles.container}>
      {/* header */}
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

      {/* scroll de tarjetas */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tarjetas.map((tarjeta) => (
          <ComponenteTarjeta
            key={tarjeta.id}
            title={tarjeta.title}
            description={tarjeta.description}
            image={tarjeta.image}
            onActionPress={() => Alert.alert('Detalles', tarjeta.title)}
          />
        ))}

        {/* boton que agrega nuevas tarjetas */}
        <TouchableOpacity style={styles.botonAgregar} onPress={agregarTarjeta}>
          <Text style={styles.botonTexto}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* menu hamburguesa */}
      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={closeSidebar}>
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
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 20,
    backgroundColor: '#121212',
  },
  botonAgregar: {
    backgroundColor: '#0beb03ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    alignSelf: 'center',
  },
  botonTexto: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
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