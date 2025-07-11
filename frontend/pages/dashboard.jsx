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
 <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <Text style={styles.title}>Gastos</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("createExpense")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Total Gastos */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total este mes</Text>
        <Text style={styles.summaryAmount}>${total}</Text>
      </View>

      {/* Lista estilo lista de compras */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {data.map((expense) => (
          <View key={expense.id} style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Text style={styles.listCategory}>{expense.category}</Text>
              <Text style={styles.listDescription}>{expense.description}</Text>
            </View>
            <View style={styles.listItemRight}>
              <Text style={styles.listAmount}>${expense.amount}</Text>
              <Text style={styles.listDate}>{expense.date}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("updateExpense", { expense })
                  }
                  style={styles.updateButton}
                >
                  <Text style={styles.buttonText}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteClient(expense.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#002544",
  },
  addButton: {
    backgroundColor: "#002544",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  summaryCard: {
    backgroundColor: "#002544",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 4,
  },
  summaryAmount: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  listLeft: {
    flex: 1,
    marginRight: 12,
  },
  listCategory: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002544",
  },
  listDescription: {
    fontSize: 14,
    color: "#555555",
    marginTop: 4,
  },
  listRight: {
    alignItems: "flex-end",
  },
  listAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0052A0",
  },
  listDate: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  updateButton: {
    backgroundColor: "#0052A0",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#7E003B", // Un morado oscuro para contraste
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});

