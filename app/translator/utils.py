# app/translator/utils.py
import re
import spacy

# Carrega o modelo de linguagem do spaCy
# Só precisa carregar 1 vez por execução
nlp = spacy.load("pt_core_news_sm")

def normalizar_texto(texto: str) -> str:
    """
    Limpa e padroniza o texto de entrada:
    - transforma em minúsculas
    - remove espaços extras
    - tira pontuações desnecessárias
    """
    texto = texto.lower().strip()
    texto = re.sub(r"\s+", " ", texto)
    texto = re.sub(r"[^\w\sà-ú]", "", texto)  # remove pontuações
    return texto

def analisar_frase(frase: str):
    """
    Usa o modelo spaCy para retornar a análise linguística da frase.
    Retorna um objeto Doc contendo tokens, POS tags e dependências.
    """
    return nlp(frase)

def detectar_condicional(frase: str) -> bool:
    """
    Detecta se há uma relação condicional (contendo 'se' e 'então').
    """
    frase = frase.lower()
    return "se" in frase and "então" in frase

def debug_tokens(doc):
    """
    Exibe análise detalhada da frase (ótimo pra estudar NLP).
    """
    print("\n=== Análise sintática ===")
    for token in doc:
        print(f"{token.text:<10} | POS={token.pos_:<8} | DEP={token.dep_:<10} | HEAD={token.head.text}")
