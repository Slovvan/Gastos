import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function Create() {
    const navigation = useNavigation()
    const [data, setData] = useState({})
 
    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }

    const onSubmit = async ()=>{
        try {
            await axios.post("https://vxx28nqw-5000.usw3.devtunnels.ms/expenses/create", data)
       
            navigation.navigate("dashboard")
        } catch (error) {
            console.error("Error al crear registro de gasto", error);
        }
    }

    return (
            <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Registrar Gasto</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Categoría:</Text>
          <TextInput
            onChangeText={(text) => onchange("category", text)}
            style={styles.input}
            placeholder="Escribe la Categoría"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            onChangeText={(text) => onchange("description", text)}
            style={styles.input}
            placeholder="Escribe una Descripción"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Monto:</Text>
          <TextInput
            onChangeText={(text) => onchange("amount", text)}
            style={styles.input}
            placeholder="Escribe el Monto"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fecha:</Text>
          <TextInput
            onChangeText={(text) => onchange("date", text)}
            style={styles.input}
            placeholder="Escribe la Fecha"
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("dashboard")}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002544ff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0c70c2ff",
    marginBottom: 24,
    textAlign: "center",
  },

  inputGroup: {
    marginBottom: 16,
    width: "100%",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
  },

  button: {
    backgroundColor: "#025aa1ff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  cancelButton: {
    marginTop: 12,
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#00447cff",
    fontSize: 16,
    fontWeight: "600",
  },
});