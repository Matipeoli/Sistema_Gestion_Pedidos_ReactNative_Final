import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, ViewStyle, Button } from 'react-native';

interface CardProps {
  title: string;
  description?: string;
  price?: number;
  image?: string;
  onPress?: () => void;
  style?: ViewStyle;
  actionLabel?: string; 
}

const ComponenteTarjeta: React.FC<CardProps> = ({
  title,
  description,
  image,
  onPress,
  style,
  actionLabel,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

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
            onPress={() => setModalVisible(true)} // abre modal
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
              value={text}
              onChangeText={setText}
              multiline
            />
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#222',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: { width: '100%', height: 160 },
  infoContainer: { padding: 15 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  description: { color: 'rgba(255,255,255,0.7)', marginVertical: 6 },
  actionButton: {
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingVertical: 10,
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
    height: 100,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
});

export default ComponenteTarjeta;
