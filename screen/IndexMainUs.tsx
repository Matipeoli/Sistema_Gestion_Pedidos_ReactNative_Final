import * as React from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ComponenteTarjeta from '../components/ComponenteTarjeta';

const IndexMainUs: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation<any>();

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

      {/* SCROLL DE TARJETAS */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ComponenteTarjeta
          title="Hamburguesa Clásica"
          description="Pan artesanal, carne de res, lechuga, tomate y queso cheddar."
          image="https://images.unsplash.com/photo-1550547660-d9450f859349"
          actionLabel="Ver Detalles"
          onActionPress={() => Alert.alert('Detalles', 'Hamburguesa Clásica')}
        />

        <ComponenteTarjeta
          title="Papas Rústicas"
          description="Corte grueso, condimento especial y cocción crocante."
          image="https://images.unsplash.com/photo-1606756790138-8c3f01a1d9b5"
          actionLabel="Agregar al pedido"
          onActionPress={() => Alert.alert('Pedido', 'Papas Rústicas agregadas.')}
        />

        <ComponenteTarjeta
          title="Milkshake de Vainilla"
          description="Helado artesanal con crema y jarabe de vainilla natural."
          image="https://images.unsplash.com/photo-1565958011705-44e211f59e30"
          actionLabel="Ver Más"
          onActionPress={() => navigation.navigate('AnotherScreen')}
        />
      </ScrollView>

      {/* SIDEBAR (PERFIL) */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.sidebar}>
          <Text style={styles.title}>Perfil de Usuario</Text>
          <Text style={styles.text}>Nombre y Apellido: Juan Pérez</Text>
          <Text style={styles.text}>Correo: juan.perez@example.com</Text>
          <TouchableOpacity onPress={() => Alert.alert('Recuperar Contraseña')}>
            <Text style={[styles.text, { color: 'skyblue' }]}>Recuperar Contraseña</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default IndexMainUs;

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
  },
  sidebar: {
    backgroundColor: '#333',
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: { color: '#fff', fontSize: 20, marginBottom: 16 },
  text: { color: '#fff', marginBottom: 8 },
});
