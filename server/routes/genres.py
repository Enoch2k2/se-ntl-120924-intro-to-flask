from flask import request, jsonify
from config import app, db
from models.models import Genre

import ipdb

@app.route("/api/genres", methods=["GET", "POST"])
def genres_route():
  if request.method == "GET":
    genres = [genre.to_dict() for genre in Genre.query.all()]
    return jsonify(genres), 200
  elif request.method == "POST":
    data = request.get_json()
    name = data.get('name')
    try:
      genre = Genre(name=name)
      db.session.add(genre)
      db.session.commit()
      return jsonify(genre.to_dict()), 201
    except ValueError as error:
      return jsonify({"error": str(error)}), 422

@app.route("/api/genres/<int:id>",methods=["GET", "PATCH", "DELETE"])
def genre_route(id):
  genre = Genre.query.get(id)
  if request.method == "GET":
    return jsonify(genre.to_dict()), 200
  elif request.method == "PATCH":
    # were gonna do PATCH things
    # do an update!
    data = request.get_json()
    for key in data.keys():
      if hasattr(genre, key):
        setattr(genre, key, data[key])
    db.session.add(genre)
    db.session.commit()
    return jsonify(genre.to_dict()), 200
  elif request.method == "DELETE":
    db.session.delete(genre)
    db.session.commit()
    return jsonify({}), 204

