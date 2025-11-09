def nl_to_cpc(frase: str) -> str:
    """
    Converte frase em português (NL) para fórmula lógica (CPC)
    """
    frase = frase.lower()

    # Regras simples de substituição
    frase = frase.replace("se ", "")
    frase = frase.replace(" então ", " → ")
    frase = frase.replace(" e ", " ∧ ")
    frase = frase.replace(" ou ", " ∨ ")
    frase = frase.replace("não ", "¬")

    # Trocar palavras por proposições
    mapa = {
        "joão estuda": "P",
        "ele passa": "Q",
        "maria trabalha": "R",
    }

    for k, v in mapa.items():
        frase = frase.replace(k, v)

    return frase.strip()


def cpc_to_nl(expressao: str) -> str:
    """
    Converte fórmula lógica (CPC) para frase em português (NL)
    """
    expressao = expressao.replace("→", " então ")
    expressao = expressao.replace("∧", " e ")
    expressao = expressao.replace("∨", " ou ")
    expressao = expressao.replace("¬", "não ")

    mapa_inverso = {
        "P": "João estuda",
        "Q": "ele passa",
        "R": "Maria trabalha",
    }

    for k, v in mapa_inverso.items():
        expressao = expressao.replace(k, v)

    return expressao.strip()
