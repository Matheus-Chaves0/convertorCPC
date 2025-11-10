# app/api/user_routes.py
from flask import Blueprint, jsonify

user_bp = Blueprint('user', __name__, url_prefix='/api/usuarios')

@user_bp.route('/', methods=['GET'])
def listar_usuarios():
    usuarios = ["Heitor", "Matheus"]
    return jsonify({"usuarios": usuarios})
