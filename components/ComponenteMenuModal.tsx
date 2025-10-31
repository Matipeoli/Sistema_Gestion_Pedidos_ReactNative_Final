import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface MenuOption {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface MenuModalProps {
  visible: boolean;
  modoEdicion: boolean;
  menuEditando: MenuOption | null;
  onSave: (menu: { title: string; description: string; image: string }) => void;
  onCancel: () => void;
}

const ComponenteMenuModal: React.FC<MenuModalProps> = ({
  visible,
  modoEdicion,
  menuEditando,
  onSave,
  onCancel,
}) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('https://images.unsplash.com/photo-');

  useEffect(() => {
    if (modoEdicion && menuEditando) {
      setTitulo(menuEditando.title);
      setDescripcion(menuEditando.description);
      setImagen(menuEditando.image);
    } else {
      setTitulo('');
      setDescripcion('');
      setImagen('https://images.unsplash.com/photo-');
    }
  }, [modoEdicion, menuEditando, visible]);

  const guardar = () => {
    if (!titulo.trim() || !descripcion.trim() || !imagen.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    onSave({ title: titulo, description: descripcion, image: imagen });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
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
            <TouchableOpacity style={styles.btnCancelar} onPress={onCancel}>
              <Text style={styles.btnCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnGuardar} onPress={guardar}>
              <Text style={styles.btnGuardarTexto}>
                {modoEdicion ? 'Actualizar' : 'Guardar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  label: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#1e1e1e', borderWidth: 1, borderColor: '#444', borderRadius: 8, padding: 12, color: '#fff', fontSize: 16 },
  inputMultiline: { height: 80, textAlignVertical: 'top' },
  botonesModal: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 12 },
  btnCancelar: { flex: 1, backgroundColor: '#444', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnCancelarTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnGuardar: { flex: 1, backgroundColor: '#0beb03ff', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnGuardarTexto: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});

export default ComponenteMenuModal;
