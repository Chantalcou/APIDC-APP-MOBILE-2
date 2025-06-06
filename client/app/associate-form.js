import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../src/components/Navbar';

const AssociateFormScreen = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.title}>Formulario de Asociación</Text>
        {/* Aquí irá el formulario de asociación */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AssociateFormScreen;
