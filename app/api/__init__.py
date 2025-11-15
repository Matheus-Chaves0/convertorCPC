# app/api/__init__.py
from app.api.translate_routes import translate_bp
from app.api.user_routes import user_bp

__all__ = ['translate_bp', 'user_bp']
