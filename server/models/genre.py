from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

class Genre(db.Model, SerializerMixin):
  __tablename__ = "genres"

  serialize_rules=(
    "-games.genre",
  )

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, unique=True)

  games = db.relationship("Game", back_populates="genre", cascade="all, delete-orphan")

  @validates("name")
  def validate_name(self, key, name):
    if len(name) < 3:
      raise ValueError("Genre should be more than 2 characters long.")
    
    return name

  def __repr__(self):
    return f'<Genre id={self.id} name="{self.name}">'