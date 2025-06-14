from dotenv import load_dotenv
load_dotenv()
import os, requests
###
from flask import Flask, request, render_template, url_for, jsonify,session
from flask_sqlalchemy import SQLAlchemy
from models.Models import db, User, Quotes
from modules.Connections import check_connection
from modules.PasswordEncoder import encode_str


app = Flask(__name__)

#enviroment variables

SECRET_KEY = os.getenv("SECRET_KEY")
API_KEY = os.getenv("API_KEY")

#enviroment variables ends here

app.config["SECRET_KEY"] = SECRET_KEY
app.config["API_KEY"] = API_KEY

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mindrop.db"


db.init_app(app)

with app.app_context():
    db.create_all()


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

@app.route("/new-user",methods = ["POST","GET"])
def new_user():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error":"Enter valid Credentials"})
    user = User.query.filter_by(username=data["username"].strip()).first()
    email = User.query.filter_by(email=data["email"]).first()
    if user or email:
        return jsonify({"error":"Credential Already exists."})
    if len(data["password"]) < 6:
        return jsonify({"error":"Password should be greater than or equals to 6."})
    password = encode_str(data["password"])
    new_user = User(username=data["username"].strip(), email=data["email"].strip(),password=password.strip())
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success":"Registration succesful"})



@app.route("/log-user",methods=["POST","GET"])
def log_user():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error":"Error parsing your Details"})
    username = data["username"].strip()
    password = encode_str(data["password"].strip())
    email = User.query.filter_by(email=username,password=password.strip()).first()
    username = User.query.filter_by(username=username.strip(),password=password.strip()).first()
    if not email or username:
        return jsonify({"error":"Invalid Credentials"})
    if email:
        session["username"] = email.username
        return jsonify({"success":"Login successful"})
    user = User.query.filter_by(username=username.strip(),password=hashed_password.strip()).first()
    session["username"] = user.username
    return jsonify({"success":"Log in succesful!", "token":app.config["SECRET_KEY"]})
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

