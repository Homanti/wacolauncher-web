import os
from flask import Flask, render_template, abort
app = Flask(__name__)

@app.route('/<path:path>')
def catch_all(path):
    if os.path.exists(os.path.join('templates', f'{path}.html')):
        return render_template(f'{path}.html')
    else:
        abort(404)

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv("PORT", default=5000))