import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native';

// The backend listens on the port defined in api/.env (5001 by default).
// Replace the placeholder below with the public ngrok URL to test on a device
// or the Expo web browser. Example: 'https://abcd1234.ngrok-free.app/api/asociado'
const API_URL = 'https://YOUR_NGROK_URL/api/asociado';

const AssociateFormScreen = () => {
  const initialForm = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    dni: '',
    email: '',
    telefono: '',
    calle: '',
    numero: '',
    ciudad: '',
    codigoPostal: '',
    provincia: '',
    observaciones: '',
    reprocan: false,
    numeroReprocan: '',
    vencimiento: '',
    fotoReprocan: '',
    numeroGestor: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => setFormData(initialForm);

  const handleSubmit = async () => {
    console.log('Enviando...');

    let fechaFormateada = null;
    if (formData.vencimiento.trim() !== "") {
      try {
        const raw = formData.vencimiento.replace(/[^0-9]/g, "");
        if (raw.length !== 8) throw new Error();
        const anio = parseInt(raw.substring(0, 4), 10);
        const mes = parseInt(raw.substring(4, 6), 10);
        const dia = parseInt(raw.substring(6, 8), 10);
        const fecha = new Date(anio, mes - 1, dia);
        if (isNaN(fecha.getTime())) throw new Error();
        const yyyy = fecha.getFullYear();
        const mm = String(fecha.getMonth() + 1).padStart(2, '0');
        const dd = String(fecha.getDate()).padStart(2, '0');
        fechaFormateada = `${yyyy}-${mm}-${dd}`;
      } catch {
        alert("Fecha inválida. Usá el formato AAAA-MM-DD, / o sin separadores.");
        return;
      }
    }

    const data = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      fechaNacimiento: formData.fechaNacimiento || null,
      dni: formData.dni,
      email: formData.email,
      telefono: formData.telefono,
      calle: formData.calle,
      numero: formData.numero,
      ciudad: formData.ciudad,
      codigoPostal: formData.codigoPostal,
      provincia: formData.provincia,
      observaciones: formData.observaciones,
      reprocan: formData.reprocan,
      numeroReprocan: formData.numeroReprocan,
      vencimiento: fechaFormateada,
      fotoReprocan: formData.fotoReprocan,
      numeroGestor: formData.numeroGestor,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setModalVisible(true);
        resetForm();
      } else {
        console.log('Respuesta del servidor:', result);
        alert("No se pudo guardar la asociación.");
      }
    } catch (error) {
      console.log("ERROR:", error);
      alert('Error de red. Verificá tu conexión.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Asociación</Text>

      {[
        { key: 'nombre', placeholder: 'Nombre' },
        { key: 'apellido', placeholder: 'Apellido' },
        { key: 'dni', placeholder: 'DNI', keyboardType: 'numeric' },
        { key: 'email', placeholder: 'Email', keyboardType: 'email-address' },
        { key: 'telefono', placeholder: 'Teléfono', keyboardType: 'phone-pad' },
        { key: 'calle', placeholder: 'Calle' },
        { key: 'numero', placeholder: 'Número' },
        { key: 'ciudad', placeholder: 'Ciudad' },
        { key: 'codigoPostal', placeholder: 'Código Postal' },
        { key: 'provincia', placeholder: 'Provincia' },
        { key: 'observaciones', placeholder: 'Observaciones' },
        { key: 'numeroReprocan', placeholder: 'Número de REPROCANN' },
        { key: 'vencimiento', placeholder: 'Vencimiento REPROCANN (AAAA-MM-DD, / o sin separadores)' },
        { key: 'fotoReprocan', placeholder: 'URL de foto REPROCANN' },
        { key: 'numeroGestor', placeholder: 'Número del Gestor Asociado' }
      ].map(({ key, placeholder, keyboardType }) => (
        <TextInput
          key={key}
          placeholder={placeholder}
          style={styles.input}
          keyboardType={keyboardType || 'default'}
          value={formData[key]}
          onChangeText={text => handleChange(key, text)}
        />
      ))}

      <TextInput
        placeholder="¿Posee REPROCANN vigente? (sí/no)"
        style={styles.input}
        value={formData.reprocan ? "sí" : "no"}
        onChangeText={text => handleChange("reprocan", text.toLowerCase() === 'sí' || text.toLowerCase() === 'si')}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar datos</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>✅ ¡Formulario enviado con éxito!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    elevation: 1
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%'
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
});

export default AssociateFormScreen;
