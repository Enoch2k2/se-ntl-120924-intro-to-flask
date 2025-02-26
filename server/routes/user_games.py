from flask import request, jsonify, g
from config import app, db
from models.models import UserGame
from .helpers import *
import ipdb

@app.route("/api/user_games", methods=["GET", "POST"], endpoint="user_games")
def user_games_route():
  if request.method == "GET":
    user_games = [user_game.to_dict() for user_game in UserGame.query.all()]
    return jsonify(user_games), 200
  elif request.method == "POST":
    data = request.get_json()
    rating = data.get('rating')
    game_id = data.get('game_id')
    user_id = current_user().id
    user_game = UserGame(rating=rating, game_id=game_id, user_id=user_id)
    db.session.add(user_game)
    db.session.commit()
    return jsonify(user_game.to_dict(only=('rating', 'user_id', 'id', 'game_id'))), 201

@app.route("/api/user_games/<int:id>", methods=["GET", "PATCH", "DELETE"], endpoint="user_game")
def user_game_route(id):
  # define what it means to be authorized to access below
  if request.method == "GET":
    return jsonify(g.user_game.to_dict()), 200
  elif request.method == "PATCH":
    # do an update!
    data = request.get_json()
    for key in data.keys():
      if hasattr(g.user_game, key):
        setattr(g.user_game, key, data[key])
    db.session.add(g.user_game)
    db.session.commit()
    return jsonify(g.user_game.to_dict(only=('rating', 'user_id', 'id', 'game_id'))), 200
  elif request.method == "DELETE":
    db.session.delete(g.user_game)
    db.session.commit()
    return jsonify({}), 204