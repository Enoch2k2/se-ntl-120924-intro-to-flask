from config import db

class Game(db.Model):
  __tablename__ = "games"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, unique=True)

  def __repr__(self):
    return f'<Game id={self.id} title="{self.title}">'