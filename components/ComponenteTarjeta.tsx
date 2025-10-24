
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface CardProps {
  title: string;
  description?: string;
  price?: number;
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
            onPress={onActionPress}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
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
  image: {
    width: '100%',
    height: 160,
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    color: 'rgba(255,255,255,0.7)',
    marginVertical: 6,
  },
  price: {
    color: '#22c55e',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionText: {
    color: '#000',
    fontWeight: '600',
  },
});

export default ComponenteTarjeta;