from flask import Flask
from .config import Config
from .database.db import db
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    from app.models.gasto_model import Expense
    
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    
    #Ruteo
    from .routes.expense_route import expense_bp
    app.register_blueprint(expense_bp)
    CORS(app)
    
    return app
""" from flask import flask, request, jsonify


app = flask(__name__)

@app.route("/")
def start():
    return "Servidor Corriendo"

if __name__ == "__main__":
    app.run(debug=True) """