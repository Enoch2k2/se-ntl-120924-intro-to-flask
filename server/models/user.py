from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

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
  username = db.Column(db.String, unique=True, nullable=False)

  @validates("username")
  def validate_username(self, key, username):
    # key == "username"
    # username == "Bob"
    if len(username) <= 2:
      raise ValueError("Username must be at least 3 characters long")
    elif len(username) > 25:
      raise ValueError("Username must be at most 25 characters long")
    
    return username

  user_games = db.relationship("UserGame", back_populates="user", cascade="all, delete-orphan")
  games = db.relationship("Game", secondary="user_games", back_populates="users")

  def __repr__(self):
    return f'<User id={self.id} username="{self.username}">'