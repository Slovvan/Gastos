from app.models.gasto_model import Expense
from app.database.db import db


def new_expense(category, description, amount, date):
    expense = Expense(category=category, description=description, amount=amount, date=date)
    db.session.add(expense)
    db.session.commit()
    return expense

def get_all_expenses():
    return Expense.query.all()

def update_expense(id_expense, data):
    expense = Expense.query.get(id_expense)
    if not expense:
        return None
    
    for key, value in data.items():
        setattr(expense, key, value)
    db.session.add(expense)
    db.session.commit()
    return expense

def delete_expense(id_expense):
    expense = Expense.query.get(id_expense)
    if not expense:
        return None
    
    db.session.delete(expense)
    db.session.commit()
    return expense
    