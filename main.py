from dotenv import load_dotenv
load_dotenv()
import os
###
from flask import Flask, request, render, url_for
from flask_sqlalchemy import SQLAlchemy
from modules import PaswordEncoder as pe
from models.Models import User, Quotes
