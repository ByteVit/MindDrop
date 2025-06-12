#models
##product of *BYTEVIT* ORGANISATION, ©2025 All Right Reserved
#follow  us on github::  https://github.com/ByteVit
#
#
#
#
#
#
#two main models needed for the web app,
#User and quotes
#with some backend depemdency thst will be added later....


#######


from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)

    username = db.Column(db.String(50), unique=True,nullable=False)

    email = db.Column(db.String(120), unique=True,nullable=False)

    password = db.Column(db.String(120),nullable=False)
    
    quotes = db.relationship("Quotes",backref="owner", lazy=True)

#######QUOTES TO BE DISPLAYED

class Quotes(db.Model):
    id = db.Column(db.Integer,primary_key=True)

    title = db.Column(db.String(100),nullable=True)

    quote = db.Column(db.Text,nullable=False)

    category = db.Column(db.String(130),nullable=False,default="No Category")

    created_at = db.Column(db.Date,default=datetime.utcnow)

    unique_id = db.Column(db.ForeignKey("user.id"))


#More models to be added soon....
