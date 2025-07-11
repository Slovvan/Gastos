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
                            <Text style={style.button.textButton}>Actualizar</Text>
                        </TouchableOpacity>
                         <TouchableOpacity onPress={()=>{navigation.navigate("dashboard")}}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
            </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3b0a55"
    },

    form: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 60, 
        borderRadius: "10%",
        
    },

    title:{
        fontSize: 38,
        fontWeight: "bold",
  },

    name: {
    
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 2
    },

    button: {
        backgroundColor: "purple",
        width: "100%",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        textButton:{
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        }
  },

    input:{
        borderRadius: 5,
        fontSize: 15,
        borderColor: "black",
        borderWidth: 1,
        textAlign: "center",
        width: "100%",
        height: "auto"
  },

})