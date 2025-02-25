from config import app

# @app.route("/")
# def home_route():
#   return '''
#     <h1>Hello World!</h1>
#     <a href="/goodbye">Goodbye</a>
#     <p>This is your captain speaking!</p>
#   '''

@app.route("/api/goodbye")
def goodbye():
  return"<h1>Goodbye World</h1>"