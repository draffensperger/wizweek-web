import json
import os
import flask
from flask import jsonify
from flask_restful import Resource, Api

import base64



from google_authorized_decorator import google_authorized

from gcloud import datastore
from oauth2client import service_account

app = flask.Flask(__name__)
api = Api(app) 

class Settings(Resource):
    @google_authorized
    def get(self, user_email):
        return jsonify({ 'email': user_email })

    @google_authorized
    def put(self, user_email):
        return jsonify({ 'email': user_email })

api.add_resource(Settings, '/settings')

def create_client():
    creds_json = base64.b64decode(os.environ['SERVICE_ACCOUNT_JSON_BASE64']).decode()
    creds_dict = json.loads(creds_json)
    cred = service_account.ServiceAccountCredentials.from_json_keyfile_dict(creds_dict)
    return datastore.Client(project=creds_dict['project_id'], credentials=cred)

if __name__ == '__main__':
    db_client = create_client()
    app.secret_key = str(os.environ['FLASK_SECRET_KEY'])
    app.debug = False
    app.run()
