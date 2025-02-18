from config import db
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
  __tablename__ = "users"

  serialize_rules=(
    "-user_games.game.users",
    "-user_games.game.user_games",
    "-user_games.user",
    "-user_games.game_id",
    "-user_games.user_id",
    "-games.users",
    "-games.user_games"
  )
  
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String)

  user_games = db.relationship("UserGame", back_populates="user")
  games = db.relationship("Game", secondary="user_games", back_populates="users")

  def __repr__(self):
    return f'<User id={self.id} username="{self.username}">'