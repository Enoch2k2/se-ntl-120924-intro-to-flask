from flask import request, jsonify
from config import app, db
from models.models import User
from sqlalchemy.exc import IntegrityError
import ipdb

@app.route("/users", methods=["GET", "POST"])
def users_route():
  if request.method == "GET":
    users = [user.to_dict() for user in User.query.all()]
    return jsonify(users), 200
  elif request.method == "POST":
    try:
      data = request.get_json()
      username = data.get('username')
      user = User(username=username)
      db.session.add(user)
      db.session.commit()
      return jsonify(user.to_dict()), 201
    except IntegrityError as error:
      error_message = str(error)
      if "UNIQUE" in error_message:
        return jsonify({"error": "Username must be unique"})
      elif "NOT NULL" in error_message:
        return jsonify({"error": "Username must exist"})
    except ValueError as error:
        return jsonify({"error": str(error)})



@app.route("/users/<int:id>", methods=["GET", "PATCH", "DELETE"])
def user_route(id):
  user = User.query.get(id)
  if request.method == "GET":
    return jsonify(user.to_dict()), 200
  elif request.method == "PATCH":
    # do an update!
    data = request.get_json()
    for key in data.keys():
      if hasattr(user, key):
        setattr(user, key, data[key])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 200
  elif request.method == "DELETE":
    db.session.delete(user)
    db.session.commit()
    return jsonify({}), 204