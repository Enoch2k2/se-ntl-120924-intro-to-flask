from flask import request, jsonify
from config import app, db
from models.models import Game

import ipdb

@app.route("/api/games", methods=["GET", "POST"])
def games_route():
  if request.method == "GET":
    games = [game.to_dict() for game in Game.query.all()]
    return jsonify(games), 200
  elif request.method == "POST":
    data = request.get_json()
    title = data.get('title')
    genre_id = data.get('genre_id')
    game = Game(title=title, genre_id=genre_id)
    db.session.add(game)
    db.session.commit()
    return jsonify(game.to_dict()), 201

@app.route("/api/games/<int:id>", methods=["GET", "PATCH", "DELETE"])
def game_route(id):
  game = Game.query.get(id)
  if request.method == "GET":
    return jsonify(game.to_dict()), 200
  elif request.method == "PATCH":
    # do an update!
    data = request.get_json()
    for key in data.keys():
      if hasattr(game, key):
        setattr(game, key, data[key])
    db.session.add(game)
    db.session.commit()
    return jsonify(game.to_dict()), 200
  elif request.method == "DELETE":
    # do delete stuff
    db.session.delete(game)
    db.session.commit()
    return jsonify({}), 204