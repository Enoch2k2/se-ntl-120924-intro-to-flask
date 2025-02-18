from config import db

class Movie(db.Model):
  __tablename__ = "movies"

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String, unique=True)

  def __repr__(self):
    return f'<Movie id={self.id} title="{self.title}">'