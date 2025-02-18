from flask import request, jsonify
from config import app, db
from models.models import Genre

import ipdb

@app.route("/genres", methods=["GET", "POST"])
def genres_route():
  if request.method == "GET":
    genres = [genre.to_dict() for genre in Genre.query.all()]
    return jsonify(genres), 200
  elif request.method == "POST":
    data = request.get_json()
    name = data.get('name')
    genre = Genre(name=name)
    db.session.add(genre)
    db.session.commit()
    return jsonify(genre.to_dict()), 201

@app.route("/genres/<int:id>")
def genre_route(id):
  genre = Genre.query.get(id)
  return jsonify(genre.to_dict()), 200