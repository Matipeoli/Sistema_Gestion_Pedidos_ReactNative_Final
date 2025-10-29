import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface MenuOption {
  id: string;
  nombre: string;
  descripcion: string;
}

interface DayMenu {
  fecha: Date;
  dia: string;
  opciones: MenuOption[];
  seleccionado?: string; // ID del seleccionado
}

const ComponenteCalendario: React.FC = () => {
  const [semanaActual, setSemanaActual] = useState<DayMenu[]>([]);
  const [puedeEditar, setPuedeEditar] = useState(true);

  // Menús hardcodeados (luego vendrán del backend)
  const menusDisponibles: MenuOption[] = [
    { id: '1', nombre: 'Menú 1', descripcion: 'Milanesa con papas fritas' },
    { id: '2', nombre: 'Menú 2', descripcion: 'Pollo al horno con ensalada' },
    { id: '3', nombre: 'Menú 3', descripcion: 'Pasta con salsa bolognesa' },
    { id: '4', nombre: 'Vegetariano', descripcion: 'Ensalada completa con quinoa' },
  ];

  useEffect(() => {
    generarSemana();
    verificarPlazoEdicion();
  }, []);

  const generarSemana = () => {
    const hoy = new Date();
    const diaSemana = hoy.getDay(); // 0 = domingo, 1 = lunes, etc
    
    // calculo del proximo lunes
    const diasHastaLunes = diaSemana === 0 ? 1 : 8 - diaSemana;
    const lunesSiguiente = new Date(hoy);
    lunesSiguiente.setDate(hoy.getDate() + diasHastaLunes);

    const dias: DayMenu[] = [];
    const nombresDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    // 5 dias de lunes a viernes
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
    const diaSemana = hoy.getDay(); // 0 = domingo, 1 = lunes, etc
    const hora = hoy.getHours();

    // Puede editar hasta el jueves a las 23:59
    if (diaSemana > 4 || (diaSemana === 4 && hora >= 24)) {
      setPuedeEditar(false);
    } else {
      setPuedeEditar(true);
    }
  };

  const seleccionarMenu = (diaIndex: number, menuId: string) => {
    if (!puedeEditar) {
      Alert.alert(
        'Plazo cerrado',
        'Ya no puedes modificar tu selección. El plazo venció el jueves pasado.'
      );
      return;
    }

    const nuevaSemana = [...semanaActual];
    nuevaSemana[diaIndex].seleccionado = menuId;
    setSemanaActual(nuevaSemana);
  };

  const confirmarSeleccion = () => {
    const diasSinSeleccion = semanaActual.filter(dia => !dia.seleccionado);
    
    if (diasSinSeleccion.length > 0) {
      Alert.alert(
        'Selección incompleta',
        '¿Deseas confirmar aunque no hayas seleccionado menú para todos los días?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar', onPress: guardarSeleccion },
        ]
      );
    } else {
      guardarSeleccion();
    }
  };

  const guardarSeleccion = () => {
    // Aquí se enviaría al backend
    console.log('Selección guardada:', semanaActual);
    Alert.alert('Éxito', 'Tu selección de menús ha sido guardada correctamente.');
  };

  const formatearFecha = (fecha: Date) => {
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    return `${dia}/${mes}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menú Semanal</Text>
        <Text style={styles.subtitle}>
          {puedeEditar 
            ? 'Selecciona tu menú hasta el jueves' 
            : '⚠️ Plazo cerrado - No se pueden hacer cambios'}
        </Text>
      </View>

      {semanaActual.map((dia, diaIndex) => (
        <View key={diaIndex} style={styles.diaContainer}>
          <View style={styles.diaHeader}>
            <Text style={styles.diaNombre}>{dia.dia}</Text>
            <Text style={styles.diaFecha}>{formatearFecha(dia.fecha)}</Text>
          </View>

          {dia.opciones.map((menu) => (
            <TouchableOpacity
              key={menu.id}
              style={[
                styles.menuOption,
                dia.seleccionado === menu.id && styles.menuSelected,
                !puedeEditar && styles.menuDisabled,
              ]}
              onPress={() => seleccionarMenu(diaIndex, menu.id)}
              disabled={!puedeEditar}
            >
              <View style={styles.radioButton}>
                {dia.seleccionado === menu.id && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <View style={styles.menuInfo}>
                <Text style={styles.menuNombre}>{menu.nombre}</Text>
                <Text style={styles.menuDescripcion}>{menu.descripcion}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {!dia.seleccionado && (
            <Text style={styles.sinSeleccion}>Sin selección</Text>
          )}
        </View>
      ))}

      {puedeEditar && (
        <TouchableOpacity style={styles.confirmarBtn} onPress={confirmarSeleccion}>
          <Text style={styles.confirmarText}>Confirmar Selección</Text>
        </TouchableOpacity>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Información importante:</Text>
        <Text style={styles.infoText}>• Debes seleccionar tu menú antes del jueves a las 23:59</Text>
        <Text style={styles.infoText}>• La selección es para la semana siguiente (Lunes a Viernes)</Text>
        <Text style={styles.infoText}>• Puedes modificar tu selección hasta el jueves</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderBottomWidth: 2,
    borderBottomColor: '#0fbd0f',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0fbd0f',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  diaContainer: {
    backgroundColor: '#1e1e1e',
    margin: 12,
    borderRadius: 12,
    padding: 16,
  },
  diaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  diaNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  diaFecha: {
    fontSize: 14,
    color: '#999',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  menuSelected: {
    borderColor: '#0fbd0f',
    backgroundColor: '#1a3a1a',
  },
  menuDisabled: {
    opacity: 0.6,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0fbd0f',
  },
  menuInfo: {
    flex: 1,
  },
  menuNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  menuDescripcion: {
    fontSize: 13,
    color: '#999',
  },
  sinSeleccion: {
    color: '#ff4d4d',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    textAlign: 'center',
  },
  confirmarBtn: {
    backgroundColor: '#0fbd0f',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmarText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#1e1e1e',
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0fbd0f',
  },
  infoTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default ComponenteCalendario;