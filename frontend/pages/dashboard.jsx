import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';

export default function Dashboard (){
    const navigation = useNavigation();

    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        getExpenses()
    }, []);
    
    const getExpenses = async () => {
        try {
            const res = await axios.get("https://vxx28nqw-5000.usw3.devtunnels.ms/expenses/get_all")
            const expenses = res.data
            setData(expenses)
            getTotal(expenses)
            
        } catch (error) {
            console.log("Error al buscar los gastos ", error)
        }
    }
    const getDate = ()=>{
        const currentDate = new Date();
        return {
            year: year = currentDate.getFullYear(),
            month: month = currentDate.getMonth() + 1 ,
            day: day = currentDate.getDate()
        }
    }

    const getTotal = (expenses)=>{
        const today = getDate()
        let subtotal = 0
            for (const expense of expenses){
                const [year, month] = expense.date.split("/");
                console.log(today.month, month)
                if (parseInt(today.year) == parseInt(year) && parseInt(today.month) == parseInt(month)){
                    subtotal += expense.amount
                }
            }
        setTotal(subtotal)
    }

    const deleteClient = async (id) => {
        try {
            await axios.delete(`https://vxx28nqw-5000.usw3.devtunnels.ms/expenses/delete/${id}`)
         
            const empty = data.filter(expense => expense.id !== id);
            setData(empty);
            getTotal(empty)
        } catch (error) {
            console.log("Error al borrar gasto ", error)
        }
    }


    return (
            <View style={style.container}>
                <Text style={style.title}>Gastos</Text>
                <TouchableOpacity  onPress={()=>{navigation.navigate("createExpense")}}>
                        <Text style={style.createButton}>➕</Text>
                </TouchableOpacity>

                <View>
                    <Text style={style.title}>Total Gastos de este mes</Text>
                    <Text style={style.title}>{total}</Text>
                </View>

               <ScrollView style={style.table}>
                <Grid>
                    <Row style={style.rowHeader}>
                    <Col><Text style={style.headerText}>Categoria</Text></Col>
                    <Col><Text style={style.headerText}>Descripción</Text></Col>
                    <Col><Text style={style.headerText}>Monto</Text></Col>
                    <Col><Text style={style.headerText}>Fecha</Text></Col>
                    <Col><Text style={style.headerText}>Acciones</Text></Col>
                    </Row>

                    {data.map((expense, i) => (
                    <Row
                        key={expense.id}
                        style={[style.row, i % 2 === 0 && style.zebraRow]}
                    >
                        <Col><Text style={style.colText}>{expense.category}</Text></Col>
                        <Col><Text style={style.colText}>{expense.description}</Text></Col>
                        <Col><Text style={style.colText}>{expense.amount}</Text></Col>
                        <Col><Text style={style.colText}>{expense.date}</Text></Col>
                        <Col>
                        <TouchableOpacity
                            style={style.update}
                            onPress={() => navigation.navigate("updateExpense", { expense })}
                        >
                            <Text style={{ color: "white", fontSize: 12 }}>Actualizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={style.delete}
                            onPress={() => deleteClient(expense.id)}
                        >
                            <Text style={{ color: "white", fontSize: 12 }}>Eliminar</Text>
                        </TouchableOpacity>
                        </Col>
                    </Row>
                    ))}
                </Grid>
                </ScrollView>
            </View>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        backgroundColor: "#3b0a55"
    },

    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },

    createButton: {
        backgroundColor: "#ffffff",
        color: "#3b0a55",
        borderRadius: 50,
        fontSize: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 20,
        elevation: 3,
        textAlign: "center",
    },

    search: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 10,
        width: "95%",
        gap: 10
    },

    searchBar: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        elevation: 2,
    },

    searchButton: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 8,
        elevation: 2,
    },

    select: {
        backgroundColor: "#ffffff",
        height: 40,
        borderRadius: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc"
    }, 

    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginVertical: 5,
    },

    button: {
        backgroundColor: "#5e0acc",
        width: "100%",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    input: {
        borderRadius: 5,
        fontSize: 15,
        borderColor: "#aaa",
        borderWidth: 1,
        textAlign: "center",
        width: "100%",
        padding: 10,
    },
    
  table: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginTop: 20,
    width: "95%",
    alignSelf: "center",
    elevation: 3,
  },

  rowHeader: {
    backgroundColor: "#5e0acc",
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },

  zebraRow: {
    backgroundColor: "#f9f9f9",
  },

  colText: {
    color: "#333",
    fontSize: 13,
    textAlign: "center",
  },

  headerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },

  update: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginBottom: 4,
    alignItems: "center",
  },

  delete: {
    backgroundColor: "purple",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
});