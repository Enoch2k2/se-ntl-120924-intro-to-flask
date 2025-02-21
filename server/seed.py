from config import app, db
from models.models import *

with app.app_context():
  print("Seeding Data...")

  print("Deleting...")
  Game.query.delete()
  Genre.query.delete()
  User.query.delete()

  print("Creating Games...")
  dota = Game(title="DOTA2")
  lol = Game(title="LOL")
  wow = Game(title="World of Warcraft")

  db.session.add_all([dota, lol, wow])
  db.session.commit()

  print("Creating Genres")
  mmorpg = Genre(name="MMORPG")
  moba = Genre(name="MOBA")

  db.session.add_all([mmorpg, moba])
  db.session.commit()

  print("Creating Users")
  bob = User(username="Bob")
  sam = User(username="Sam")

  bob.password_hash = "testtest"
  sam.password_hash = "testtest"

  db.session.add_all([bob, sam])
  db.session.commit()

  print("Creating User Games...")
  bob_game_1 = UserGame(rating=4, user_id=bob.id, game_id=lol.id)
  bob_game_2 = UserGame(rating=5, user_id=bob.id, game_id=wow.id)
  sam_game_1 = UserGame(rating=5, user_id=sam.id, game_id=dota.id)
  sam_game_2 = UserGame(rating=4, user_id=sam.id, game_id=wow.id)

  db.session.add_all([bob_game_1, bob_game_2, sam_game_1, sam_game_2])
  db.session.commit()

  print("Associating...")
  dota.genre_id = moba.id
  lol.genre_id = moba.id
  wow.genre_id = mmorpg.id

  db.session.add_all([dota, lol, wow])
  db.session.commit()

  print("Finished Seeding Data...")


