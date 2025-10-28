import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, ViewStyle } from 'react-native';

interface CardProps {
  title: string;
  description?: string;
  observacion?: string;
  image?: string;
  onPress?: () => void;
  style?: ViewStyle;
  actionLabel?: string;
  onActionPress?: () => void;
}

const ComponenteTarjeta: React.FC<CardProps> = ({
  title,
  description,
  image,
  onPress,
  style,
  actionLabel,
  onActionPress,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

  const handleActionPress = () => {
    if (onActionPress) onActionPress();
    setModalVisible(true);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, style]}
    >
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        {actionLabel && (
          <TouchableOpacity
            onPress={handleActionPress}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal flotante */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Observaciones</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Escribe tus observaciones..."
              placeholderTextColor="#999"
              value={text}
              onChangeText={setText}
              multiline
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 18,
    overflow: 'hidden',
    marginVertical: 8,
    width: '47%', // ✅ dos tarjetas por fila
    aspectRatio: 1, // ✅ cuadradas
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  infoContainer: { 
    padding: 10, 
    justifyContent: 'space-between', 
    flex: 1 
  },
  title: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  description: { 
    color: 'rgba(255,255,255,0.7)', 
    fontSize: 12, 
    textAlign: 'center', 
    marginTop: 4 
  },
  actionButton: {
    backgroundColor: '#22c55e',
    borderRadius: 10,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  actionText: { color: '#000', fontWeight: '600' },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: { color: '#fff', fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  modalInput: {
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    backgroundColor: '#444',
    height: 100,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  closeButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ComponenteTarjeta;
