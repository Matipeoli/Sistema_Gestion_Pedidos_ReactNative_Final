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
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
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
              <Text style={styles.closeButtonText}>Confirmar</Text>
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
    width: '47%',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 140, // ← Altura fija en lugar de porcentaje
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  infoContainer: { 
    padding: 12,
    paddingTop: 10,
    justifyContent: 'space-between',
    minHeight: 120, // ← Altura mínima consistente
  },
  textContainer: {
    flex: 1,
    marginBottom: 8,
  },
  title: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 4,
  },
  description: { 
    color: 'rgba(255,255,255,0.7)', 
    fontSize: 12, 
    textAlign: 'center',
    lineHeight: 16,
  },
  actionButton: {
    backgroundColor: '#22c55e',
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionText: { 
    color: '#000', 
    fontWeight: '600',
    fontSize: 13,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: { 
    color: '#fff', 
    fontSize: 20, 
    marginBottom: 16, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    backgroundColor: '#333',
    height: 120,
    marginBottom: 16,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  closeButton: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ComponenteTarjeta;