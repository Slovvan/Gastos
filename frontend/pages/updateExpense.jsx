import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';

export default function UpdateExpense (){
    const route = useRoute();
    const navigation = useNavigation();
    const {expense} = route.params

    const [data, setData] = useState({})


    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }


    const updateExpense = async () => {
        try {
            await axios.put(`https://vxx28nqw-5000.usw3.devtunnels.ms/expenses/update/${expense.id}`, data)

            navigation.navigate("dashboard")
        } catch (error) {
            console.log("Error al actualizar registro ", error)
        }
    }


    return (
            <View style={style.container}>
                    <View style={style.form}>
                        <Text style={style.title}>Actualizar Registro de Gasto</Text>

                        <Text style={style.name}>Categoria:</Text>
                        <TextInput onChangeText={(text)=>{onchange("category", text)}} style={style.input} placeholder={expense.category}></TextInput>
                        <Text style={style.name}>Descripción:</Text>
                        <TextInput onChangeText={(text)=>{onchange("description", text)}} style={style.input} placeholder={expense.description}></TextInput>
                        <Text style={style.name}>Monto:</Text>
                        <TextInput onChangeText={(text)=>{onchange("amount", text)}} style={style.input} placeholder={expense.amount}></TextInput>
                        <Text style={style.name}>Fecha:</Text>
                        <TextInput onChangeText={(text)=>{onchange("date", text)}} style={style.input} placeholder={expense.date}></TextInput>
                        
                        <TouchableOpacity onPress={()=>{updateExpense()}} style={style.button}>
                            <Text style={style.button.buttonText}>Actualizar</Text>
                        </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{navigation.navigate("dashboard")}} style={style.cancelButton}>
                            <Text style={style.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
    )
}

const style = StyleSheet.create({
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