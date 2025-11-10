# app/translator/logic_converter.py
from .utils import normalizar_texto, analisar_frase, detectar_condicional

def mapear_proposicao(frase: str) -> str:
    """Associa frases específicas a variáveis proposicionais."""
    mapa = {
        "joão estuda": "P",
        "ele passa": "Q",
        "maria trabalha": "R",
        "joão dorme": "S",
    }

    for k, v in mapa.items():
        if k in frase:
            return v
    return "?"

def nl_to_cpc(frase: str) -> str:
    frase = normalizar_texto(frase)
    doc = analisar_frase(frase)

    if detectar_condicional(frase):
        partes = frase.split("então")
        if len(partes) == 2:
            antecedente = partes[0].replace("se", "").strip()
            consequente = partes[1].strip()
            return f"{mapear_proposicao(antecedente)} → {mapear_proposicao(consequente)}"

    frase = frase.replace(" e ", " ∧ ").replace(" ou ", " ∨ ").replace("não ", "¬")
    return mapear_proposicao(frase)

def cpc_to_nl(expressao: str) -> str:
    expressao = (
        expressao.replace("→", " então ")
        .replace("∧", " e ")
        .replace("∨", " ou ")
        .replace("¬", "não ")
    )

    mapa_inverso = {
        "P": "João estuda",
        "Q": "Ele passa",
        "R": "Maria trabalha",
        "S": "João dorme",
    }

    for simbolo, texto in mapa_inverso.items():
        expressao = expressao.replace(simbolo, texto)

    return expressao.strip()
