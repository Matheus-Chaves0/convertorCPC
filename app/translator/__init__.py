# app/translator/__init__.py
"""
Módulo responsável pela tradução entre linguagem natural (NL)
e Cálculo Proposicional Clássico (CPC).
"""

from .logic_converter import nl_to_cpc, cpc_to_nl
