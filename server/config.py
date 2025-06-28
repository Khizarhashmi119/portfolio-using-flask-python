from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from constants import SQLALCHEMY_DATABASE_URI

app = Flask(__name__)
CORS(app)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api = Api(app, prefix='/api/v1')
