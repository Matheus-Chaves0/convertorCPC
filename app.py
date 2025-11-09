from flask import Flask, render_template, request
from translator import nl_to_cpc, cpc_to_nl

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/traduzir", methods=["POST"])
def traduzir():
    texto = request.form["texto"]
    direcao = request.form["direcao"]

    if direcao == "nl_to_cpc":
        resultado = nl_to_cpc(texto)
    else:
        resultado = cpc_to_nl(texto)

    return render_template("index.html", entrada=texto, resultado=resultado, direcao=direcao)

if __name__ == "__main__":
    app.run(debug=True)