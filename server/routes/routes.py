from config import app
from flask import request, g
from models.models import *
from .helpers import *

@app.before_request
def before_routes():
  if request.endpoint in ("user_games", "genres", "genre"):
    if not is_logged_in():
      return { "error": "Access Denied" }, 401
  elif request.endpoint == "user_game":
    id = request.view_args.get('id')
    g.user_game = UserGame.query.get(id)
    if not is_logged_in() or not is_owner(g.user_game.user_id):
      return { "error": "Access Denied" }, 401

from .static import *
from .games import *
from .genres import *
from .sessions import *
from .user_games import *
from .users import *