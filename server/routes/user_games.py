from flask import request, jsonify
from config import app, db
from models.models import UserGame

import ipdb

@app.route("/user_games", methods=["GET", "POST"])
def user_games_route():
  if request.method == "GET":
    user_games = [user_game.to_dict() for user_game in UserGame.query.all()]
    return jsonify(user_games), 200
  elif request.method == "POST":
    data = request.get_json()
    rating = data.get('rating')
    game_id = data.get('game_id')
    user_id = data.get('user_id')
    user_game = UserGame(rating=rating, game_id=game_id, user_id=user_id)
    db.session.add(user_game)
    db.session.commit()
    return jsonify(user_game.to_dict()), 201

@app.route("/user_games/<int:id>", methods=["GET", "PATCH", "DELETE"])
def user_game_route(id):
  user_game = UserGame.query.get(id)
  if request.method == "GET":
    return jsonify(user_game.to_dict()), 200
  elif request.method == "PATCH":
    # do an update!
    data = request.get_json()
    for key in data.keys():
      if hasattr(user_game, key):
        setattr(user_game, key, data[key])
    db.session.add(user_game)
    db.session.commit()
    return jsonify(user_game.to_dict()), 200
  elif request.method == "DELETE":
    db.session.delete(user_game)
    db.session.commit()
    return jsonify({}), 204