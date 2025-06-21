
###

#$ByteVit

from web.main import app


with app.app_context():
    app.run(debug=True , host = '0.0.0.0')
