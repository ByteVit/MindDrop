from dotenv import load_dotenv
load_dotenv()
import os, requests
###
from flask import Flask, request, render_template, url_for, jsonify,session
from flask_sqlalchemy import SQLAlchemy
from models.Models import db, User, Quotes
from modules.Connections import check_connection
from modules.PasswordEncoder import encode_str
from modules import checkEmail


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
    global SECRET_KEY
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error":"Invalid credentials"})
    users = User.query.all()
    user = data["username"]
    password = encode_str(data["password"])
    if checkEmail.check_email(user):
        user = User.query.filter_by(email=user).first()
        if not user:
            return jsonify({"error":"Email does not exists!"})
        if user.password != password:
            return jsonify({"error":"Invalid credentials"})
        session["username"] = user.username
        return jsonify({"token":SECRET_KEY,"success":"Login sucess!"})
    user = User.query.filter_by(username=user).first()
    if not user:
        return jsonify({"error":"That username does not exists"})
    if user.password != password:
        return jsonify({"error":"Invalid credentials"})
    session["username"] = user.username
    return jsonify({"success":"Login successful","token":SECRET_KEY})

@app.route("/otp-code", methods=["POST","GET"])
def otp_code():
    #future code here
    code = None #sets to none cus of no value now.



if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")

