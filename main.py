from dotenv import load_dotenv
load_dotenv()
import os
###
from flask import Flask, request, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from modules import PasswordEncoder as pe
from models.Models import User, Quotes


app = Flask(__name__)

#enviroment variables

SECRET_KEY = os.getenv("SECRET_KEY")
API_KEY = os.getenv("API_KEY")

#enviroment variables ends here

app.config["SECRET_KEY"] = SECRET_KEY
app.config["API_KEY"] = API_KEY

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mindrop.db"

"""
db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

"""

@app.route("/")
def load_screen():
    return render_template("load.html")

@app.route("/home")
def home():
    return render_template("home.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

