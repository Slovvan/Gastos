from flask import Blueprint, request, jsonify
from app.controllers.expense_controller import new_expense, get_all_expenses, update_expense, delete_expense
import datetime

expense_bp = Blueprint("expense", __name__, url_prefix="/expenses")

@expense_bp.route("/create", methods=["POST"])
def create():
    data = request.json

    category = data.get("category")
    description = data.get("description")
    amount = data.get("amount")
    date = data.get("date")

    if not category or not description or not amount or not date:
        return jsonify({
            "msg": "Datos insuficientes"
        }), 400
    
    splited_date = date.split("/")
    newDate = datetime.date(int(splited_date[2]), int(splited_date[1]), int(splited_date[0]))


    expense = new_expense(category, description, amount, newDate)
    return jsonify({
        "msg": "Gasto registrado con exito",
        "Gasto": expense.to_dict()
    }), 200

@expense_bp.route("/get_all", methods=["GET"])
def get_all():
    expenses = get_all_expenses()

    data = [expense.to_dict() for expense in expenses]
    return jsonify(data), 200

@expense_bp.route("/update/<int:id>", methods=["PUT"])
def update(id):
    data = request.json
    expense = update_expense(id, data)
    if not expense:
        return jsonify({
            "msg": "Gasto no encontrado"
        }), 400
    
    return jsonify({
        "msg": "Gasto actualizado exitosamente",
        "gasto": expense.to_dict()
    }), 200

@expense_bp.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):
    expense = delete_expense(id)

    if not expense:
        return jsonify({
            "msg": "No se encontro el Gasto"
        }), 400
    
    return jsonify({
        "msg": "Gasto eliminado con exito"
    }), 200
