import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../src/context/AuthContext';


const FormularioAsociacionScreen = ({ navigation }) => {
  const { user, token } = useAuth(); // asumimos que ya tenés esto
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    reprocan: false,
    gestorAsociado: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5001/asociacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Listo", "¡Gracias por asociarte!");
        navigation.navigate("Home"); // o a donde corresponda
      } else {
        console.error(data);
        Alert.alert("Error", "No se pudo guardar la asociación");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema en el envío");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Asociación</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.input}
        onChangeText={text => handleChange("nombre", text)}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        onChangeText={text => handleChange("apellido", text)}
      />
      <TextInput
        placeholder="Dirección"
        style={styles.input}
        onChangeText={text => handleChange("direccion", text)}
      />
      <TextInput
        placeholder="¿Tenés REPROCANN? (sí/no)"
        style={styles.input}
        onChangeText={text => handleChange("reprocan", text.toLowerCase() === 'sí' || text.toLowerCase() === 'si')}
      />
      <TextInput
        placeholder="Gestor Asociado (opcional)"
        style={styles.input}
        onChangeText={text => handleChange("gestorAsociado", text)}
      />
      <Button title="Enviar datos" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  }
});

export default FormularioAsociacionScreen;
