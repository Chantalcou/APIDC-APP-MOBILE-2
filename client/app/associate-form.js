// client/app/AssociateFormScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';

const API_URL = 'https://624f-2800-2131-5400-542-d044-2a65-d340-4d78.ngrok-free.app/api/asociado';

export default function AssociateFormScreen() {
  const initialForm = {
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    dni: '',
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
    numeroGestor: '',
  };

  const [formData, setFormData] = useState(initialForm);
  const [okModal, setOkModal] = useState(false);
  const [errModal, setErrModal] = useState({ visible: false, msg: '' });

  const hc = (f, v) => setFormData(p => ({ ...p, [f]: v }));
  const reset = () => setFormData(initialForm);

  const handleSubmit = async () => {
    const required = ['nombre', 'apellido', 'email'];
    const faltan = required.find(k => !formData[k].trim());
    if (faltan) {
      setErrModal({ visible: true, msg: '❌ Completá los campos obligatorios (*)' });
      return;
    }

    let vencimientoFormateado = null;
    if (formData.vencimiento.trim()) {
      try {
        const raw = formData.vencimiento.replace(/[^0-9]/g, '');
        if (raw.length !== 8) throw new Error();
        vencimientoFormateado = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
      } catch {
        setErrModal({ visible: true, msg: '❌ Fecha de vencimiento inválida. AAAA-MM-DD.' });
        return;
      }
    }

    let fechaNacFormateada = null;
    if (formData.fechaNacimiento.trim()) {
      try {
        const raw = formData.fechaNacimiento.replace(/[^0-9]/g, '');
        if (raw.length !== 8) throw new Error();
        fechaNacFormateada = `${raw.slice(4, 8)}-${raw.slice(2, 4)}-${raw.slice(0, 2)}`;
      } catch {
        setErrModal({ visible: true, msg: '❌ Fecha de nacimiento inválida. DD-MM-AAAA.' });
        return;
      }
    }

    const payload = {
      ...formData,
      vencimiento: vencimientoFormateado,
      fechaNacimiento: fechaNacFormateada,
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setOkModal(true);
        reset();
        return;
      }

      const { error } = await res.json();
      if (res.status === 409)
        return setErrModal({ visible: true, msg: '❌ El e-mail ya existe.' });

      setErrModal({ visible: true, msg: `❌ ${error || 'Error interno.'}` });
    } catch {
      setErrModal({ visible: true, msg: '❌ Error de red. Intentá de nuevo.' });
    }
  };

  const Input = ({ k, ph, extra }) => (
    <TextInput
      placeholder={ph}
      style={styles.input}
      value={formData[k]}
      onChangeText={txt => hc(k, txt)}
      {...extra}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Formulario de Asociación</Text>

      <Input k="nombre" ph="Nombre *" />
      <Input k="apellido" ph="Apellido *" />
      <Input k="email" ph="Email *" extra={{ keyboardType: 'email-address' }} />
      <Input k="fechaNacimiento" ph="Fecha de nacimiento (DD-MM-AAAA)" />
      <Input k="dni" ph="DNI" extra={{ keyboardType: 'numeric' }} />
      <Input k="telefono" ph="Teléfono" extra={{ keyboardType: 'phone-pad' }} />
      <Input k="calle" ph="Calle" />
      <Input k="numero" ph="Número" />
      <Input k="ciudad" ph="Ciudad" />
      <Input k="provincia" ph="Provincia" />
      <Input k="codigoPostal" ph="Código Postal" />
      <Input k="observaciones" ph="Observaciones" />

      <Text style={styles.label}>¿Posee REPROCANN vigente?</Text>
      <View style={styles.radioRow}>
        {['Sí', 'No'].map(op => (
          <TouchableOpacity
            key={op}
            style={[
              styles.radioBtn,
              formData.reprocan === (op === 'Sí') && styles.radioSelected,
            ]}
            onPress={() => hc('reprocan', op === 'Sí')}
          >
            <Text style={styles.radioTxt}>{op}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Input k="numeroReprocan" ph="Número REPROCANN" />
      <Input k="vencimiento" ph="Vencimiento (AAAA-MM-DD)" />
      <Input k="fotoReprocan" ph="URL foto REPROCANN" />
      <Input k="numeroGestor" ph="Número Gestor Asociado" />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar datos</Text>
      </TouchableOpacity>

      <Modal visible={okModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTxt}>✅ ¡Enviado con éxito!</Text>
            <TouchableOpacity style={styles.modalBtn} onPress={() => setOkModal(false)}>
              <Text style={styles.modalBtnTxt}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={errModal.visible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, styles.modalErr]}>
            <Text style={[styles.modalTxt, { color: '#e53935' }]}>{errModal.msg}</Text>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: '#e53935' }]}
              onPress={() => setErrModal({ visible: false, msg: '' })}
            >
              <Text style={styles.modalBtnTxt}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fafafa', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 25, textAlign: 'center', color: '#333' },
  label: { marginTop: 10, marginBottom: 6, fontWeight: '600', color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    elevation: 1,
  },
  radioRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  radioBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0a9d6d',
    alignItems: 'center',
  },
  radioSelected: { backgroundColor: '#0a9d6d' },
  radioTxt: { color: '#0a9d6d', fontWeight: '600' },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalErr: { borderColor: '#e53935', borderWidth: 1 },
  modalTxt: { fontSize: 18, marginBottom: 20, color: '#333', textAlign: 'center' },
  modalBtn: {
    backgroundColor: '#007aff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalBtnTxt: { color: '#fff', fontWeight: '600' },
});
