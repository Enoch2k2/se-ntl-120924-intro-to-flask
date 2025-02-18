from flask import request, jsonify
from config import app, db
from models.models import Game

import ipdb

@app.route("/games", methods=["GET", "POST"])
def games_route():
  if request.method == "GET":
    games = [game.to_dict() for game in Game.query.all()]
    return jsonify(games), 200
  elif request.method == "POST":
    data = request.get_json()
    title = data.get('title')
    game = Game(title=title)
    db.session.add(game)
    db.session.commit()
    return jsonify(game.to_dict()), 201

@app.route("/games/<int:id>")
def game_route(id):
  game = Game.query.get(id)
  return jsonify(game.to_dict()), 200