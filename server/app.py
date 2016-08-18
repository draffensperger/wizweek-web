import os
from flask import jsonify, Flask
from flask_restful import Resource, Api
from google_authorized_decorator import google_authorized
from datastore_setup import datastore_client_from_env

app = Flask(__name__)
api = Api(app) 
db = datastore_client_from_env()

class Settings(Resource):
    @google_authorized
    def get(self, user_email):
        return jsonify({ 'email': user_email })

    @google_authorized
    def put(self, user_email):
        return jsonify({ 'success': True })

api.add_resource(Settings, '/settings')

if __name__ == '__main__':
    app.secret_key = str(os.environ['FLASK_SECRET_KEY'])
    app.debug = False
    app.run()
