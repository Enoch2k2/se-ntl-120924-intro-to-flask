from config import app, db
from models.models import *

with app.app_context():
  print("Seeding Data...")

  print("Deleting...")
  Game.query.delete()

  print("Creating Games...")
  game_1 = Game(title="DOTA2")
  game_2 = Game(title="LOL")
  game_3 = Game(title="World of Warcraft")

  db.session.add_all([game_1, game_2, game_3])
  db.session.commit()

  print("Finished Seeding Data...")


