from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

import ipdb

class User(db.Model, SerializerMixin):
  __tablename__ = "users"

  serialize_rules=(
    "-user_games.game.users",
    "-user_games.game.user_games",
    "-user_games.user",
    "-user_games.game_id",
    "-user_games.user_id",
    "-games.users",
    "-games.user_games",
    "-_password_hash"
  )
  
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True, nullable=False)
  _password_hash = db.Column(db.String)

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

  @hybrid_property
  def password_hash(self):
    raise Exception('You cannot view this')
    # return self._password_hash
  
  @password_hash.setter
  def password_hash(self, password):
    gen_password = bcrypt.generate_password_hash(password)
    self._password_hash = gen_password.decode('utf-8')

  def authenticate(self, password):
    return bcrypt.check_password_hash(self._password_hash, password)


  def __repr__(self):
    return f'<User id={self.id} username="{self.username}">'