from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from app.schemas.translate_schema import TranslateSchema
from app.translator.logic_converter import nl_to_cpc, cpc_to_nl

translate_bp = Blueprint("translate", __name__)

# instância do schema
translate_schema = TranslateSchema()

@translate_bp.route("/traduzir", methods=["POST"])
def traduzir():
    try:
        # valida o JSON recebido
        data = translate_schema.load(request.get_json())

    except ValidationError as err:
        # se os dados estiverem errados, retorna erro 400
        return jsonify({"erro": err.messages}), 400

    texto = data["texto"]
    direcao = data["direcao"]

    # chama a lógica de tradução
    if direcao == "nl_to_cpc":
        resultado = nl_to_cpc(texto)
    else:
        resultado = cpc_to_nl(texto)

    return jsonify({
        "entrada": texto,
        "resultado": resultado,
        "direcao": direcao
    })
