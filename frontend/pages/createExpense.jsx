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
            <View style={style.container}>
                <View style={style.form}>
                     <Text style={style.title}>Crear Registro de Gasto</Text>

                        <Text style={style.name}>Categoria:</Text>
                        <TextInput onChangeText={(text)=>{onchange("category", text)}} style={style.input} placeholder='Escribe la Categoria '></TextInput>
                        <Text style={style.name}>Descripción:</Text>
                        <TextInput onChangeText={(text)=>{onchange("description", text)}} style={style.input} placeholder='Escribe una Descripción '></TextInput>
                        <Text style={style.name}>Monto:</Text>
                        <TextInput onChangeText={(text)=>{onchange("amount", text)}} style={style.input} placeholder='Escribe el Monto'></TextInput>
                        <Text style={style.name}>Fecha:</Text>
                        <TextInput onChangeText={(text)=>{onchange("date", text)}} style={style.input} placeholder='Escribe la Fecha' date></TextInput>

                    <TouchableOpacity style={style.button} onPress={()=>{onSubmit()}} >
                        <Text style={style.button.textButton}>Aceptar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{navigation.navigate("client")}}>
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