from config import db
from sqlalchemy_serializer import SerializerMixin

class Game(db.Model, SerializerMixin):
  __tablename__ = "games"

  serialize_rules=(
    "-genre_id",
    "-genre.games",
    "-user_games.game",
    "-user_games.game_id",
    "-user_games.user",
    "-user_games.user_id",
    "-users.user_games",
    "-users.games"
  )
  
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String)
  genre_id = db.Column(db.Integer, db.ForeignKey("genres.id"))

  genre = db.relationship("Genre", back_populates="games")
  user_games = db.relationship("UserGame", back_populates="game")
  users = db.relationship("User", secondary="user_games", back_populates="games")


  def __repr__(self):
    return f'<Game id={self.id} title="{self.title}">'