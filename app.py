from flask import Flask, render_template,request
from spell import correction
app = Flask(__name__, static_url_path='')

@app.route("/")
def hello():
    return render_template('index.html')
@app.route("/suggestions")
def checker():
    text = request.args.get('text')
    return render_template('suggestion.html',suggestion=correction(text))
if __name__ == "__main__":
    app.run()