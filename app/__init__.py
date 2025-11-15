# app/__init__.py
from flask import Flask
from flask_cors import CORS

# Importa os Blueprints
from app.api.translate_routes import translate_bp
from app.api.user_routes import user_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Registra os Blueprints
    app.register_blueprint(translate_bp)
    app.register_blueprint(user_bp)

    return app
