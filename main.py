from dotenv import load_dotenv
load_dotenv()
import os, requests
###
from flask import Flask, request, render_template, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from modules import PasswordEncoder as pe
from models.Models import User, Quotes
from modules.Connections import check_connection


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
    return render_template("index.html")

@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/internet-status", methods=["POST","GET"])
def internet_status():
    if check_connection():
        return jsonify({"success":"Connection Is Active"})
    return jsonify({"error":"No connection"})

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

