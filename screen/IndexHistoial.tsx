import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Modal, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ComponenteTarjeta from '../components/ComponenteTarjeta';
import { styles, colors } from '../styles/StylesApp';

type RootStackParamList = {
  LoginScreen: undefined;
  IndexMainUs: undefined;
  IndexHistorial: undefined;
};

const IndexHistorial: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const closeSidebar = () => setVisible(false);

  const handleLogout = () => {
    closeSidebar();
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };

  const historial = [
    {
      title: 'lunes',
      description: 'Hamburguesa Clásica + Papas Rústicas',
      observacion: 'sin leche humana',
    },
    {
      title: 'martes',
      description: 'Milkshake de Vainilla',
      observacion: 'sin leche humana',
    },
    {
      title: 'miercoles',
      description: 'Hamburguesa Clásica + Milkshake de Vainilla',
      observacion: 'sin leche humana',
    },
  ];

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

      {/* SCROLL HISTORIAL */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {historial.map((item, index) => (
          <ComponenteTarjeta
            key={index}
            title={item.title}
            description={item.description}
            observacion={item.observacion}
            onActionPress={() => Alert.alert('Historial', item.title)}
          />
        ))}

        {/* BOTÓN VOLVER */}
        <TouchableOpacity 
          style={styles.volverBtn}
          onPress={() => navigation.navigate('IndexMainUs')}
        >
          <Text style={styles.buttonText}>← Volver al Menú Principal</Text>
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

export default IndexHistorial;