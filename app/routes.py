# app/routes.py
from flask import Blueprint, request, jsonify
from .translator.logic_converter import nl_to_cpc, cpc_to_nl

# Blueprint organiza as rotas
main = Blueprint("main", __name__)

@main.route("/api/traduzir", methods=["POST"])
def traduzir():
    """
    Rota da API para traduzir NL ↔ CPC
    Recebe JSON e devolve JSON
    """
    data = request.get_json()  # lê o JSON enviado pelo front

    if not data or "texto" not in data or "direcao" not in data:
        return jsonify({"error": "JSON inválido. Esperado: {'texto': '...', 'direcao': 'nl_to_cpc|cpc_to_nl'}"}), 400

    texto = data["texto"]
    direcao = data["direcao"]

    try:
        if direcao == "nl_to_cpc":
            resultado = nl_to_cpc(texto)
        elif direcao == "cpc_to_nl":
            resultado = cpc_to_nl(texto)
        else:
            return jsonify({"error": "Direção inválida. Use 'nl_to_cpc' ou 'cpc_to_nl'."}), 400

        return jsonify({
            "entrada": texto,
            "direcao": direcao,
            "resultado": resultado
        })

    except Exception as e:
        return jsonify({"error": f"Erro interno: {str(e)}"}), 500