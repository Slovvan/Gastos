from app.database.db import db

class Expense (db.Model):
    __tablename__ = "expenses"

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(30))
    description = db.Column(db.String(100))
    amount = db.Column(db.Float)
    date = db.Column(db.Date)

    def to_dict(self):
          expense = {
               "id": self.id,
               "category": self.category,
               "description": self.description,
               "amount": self.amount,
               "date": self.date.strftime("%Y/%m/%d"),
               
          }
          return expense
          
