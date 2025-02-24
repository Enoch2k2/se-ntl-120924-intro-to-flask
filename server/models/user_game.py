from config import db
from sqlalchemy_serializer import SerializerMixin

class UserGame(db.Model, SerializerMixin):
  __tablename__ = "user_games"

  serialize_rules=(
    "-game.user_games",
    "-game.users",
    "-user.user_games",
    "-user.games"
  )

  # genre = db.relationship("Genre", back_populates="games")
  # user_games = db.relationship("UserGame", back_populates="game", cascade="all, delete-orphan")
  # users = db.relationship("User", secondary="user_games", back_populates="games")

  
  id = db.Column(db.Integer, primary_key=True)
  rating = db.Column(db.Integer)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  game_id = db.Column(db.Integer, db.ForeignKey("games.id"))

  game = db.relationship("Game", back_populates="user_games")
  user = db.relationship("User", back_populates="user_games")

  def __repr__(self):
    return f'<UserGame id={self.id} rating="{self.rating}">'