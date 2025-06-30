// client/app/AssociateFormScreen.js
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

/* 🔗  cambia sólo esta línea cuando reinicies ngrok */
const API_URL =
  'https://51ab-2800-2131-5400-542-555-62db-8de2-eda1.ngrok-free.app/api/asociado';

export default function AssociateFormScreen() {
  /* ─────── estado ─────── */
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
  const [okModal, setOkModal] = useState(false);
  const [errModal, setErrModal] = useState({ visible: false, msg: '' });

  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));
  const resetForm = () => setFormData(initialForm);

  /* ─────── envío ─────── */
  const handleSubmit = async () => {
    /* formatea vencimiento (AAAAMMDD, AA-AA, etc.) */
    let fechaFormateada = null;
    if (formData.vencimiento.trim()) {
      try {
        const raw = formData.vencimiento.replace(/[^0-9]/g, '');
        if (raw.length !== 8) throw new Error();
        fechaFormateada =
          `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
      } catch {
        setErrModal({
          visible: true,
          msg: '❌ Fecha inválida. Usá el formato AAAA-MM-DD.'
        });
        return;
      }
    }

    const payload = { ...formData, vencimiento: fechaFormateada };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      /* — Éxito — */
      if (res.ok) {
        setOkModal(true);
        resetForm();
        return;
      }

      /* — Errores controlados — */
      const { error } = await res.json();

      if (res.status === 409) {
        setErrModal({
          visible: true,
          msg:
            '❌ El e-mail ya está registrado.\n' +
            'Si ya sos socio, iniciá sesión desde “Soy socio”.'
        });
        return;
      }

      if (res.status === 422) {
        setErrModal({ visible: true, msg: `❌ ${error}` });
        return;
      }

      /* — Error interno — */
      setErrModal({
        visible: true,
        msg:   '❌ El e-mail ya está registrado.\n' +
            'Si ya sos socio, iniciá sesión desde “Soy socio”.'
      });
    } catch {
      setErrModal({
        visible: true,
        msg: '❌ Error de red. Verificá tu conexión.'
      });
    }
  };

  /* ─────── render ─────── */
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
        { key: 'numeroReprocan', placeholder: 'Número REPROCANN' },
        {
          key: 'vencimiento',
          placeholder: 'Vencimiento REPROCANN (AAAA-MM-DD)'
        },
        { key: 'fotoReprocan', placeholder: 'URL foto REPROCANN' },
        { key: 'numeroGestor', placeholder: 'Número Gestor Asociado' }
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
        value={formData.reprocan ? 'sí' : 'no'}
        onChangeText={txt =>
          handleChange(
            'reprocan',
            ['sí', 'si', 'yes'].includes(txt.toLowerCase())
          )
        }
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar datos</Text>
      </TouchableOpacity>

      {/* Modal Éxito */}
      <Modal visible={okModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>✅ ¡Formulario enviado con éxito!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOkModal(false)}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Error */}
      <Modal visible={errModal.visible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.modalError]}>
            <Text style={[styles.modalText, { color: '#e53935' }]}>
              {errModal.msg}
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: '#e53935' }]}
              onPress={() => setErrModal({ visible: false, msg: '' })}>
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* ─────── estilos ─────── */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
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
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
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
  modalError: { borderColor: '#e53935', borderWidth: 1 },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  modalButton: {
    backgroundColor: '#007aff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  modalButtonText: { color: '#fff', fontWeight: '600' }
});
