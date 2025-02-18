from flask import request, jsonify
from config import app, db
from models.models import User

import ipdb

@app.route("/users", methods=["GET", "POST"])
def users_route():
  if request.method == "GET":
    users = [user.to_dict() for user in User.query.all()]
    return jsonify(users), 200
  elif request.method == "POST":
    data = request.get_json()
    username = data.get('username')
    user = User(username=username)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@app.route("/users/<int:id>")
def user_route(id):
  user = User.query.get(id)
  return jsonify(user.to_dict()), 200