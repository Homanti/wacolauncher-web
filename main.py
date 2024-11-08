import os
from flask import Flask, render_template, abort
app = Flask(__name__)

@app.route('/<path:path>')
def catch_all(path):
    # Проверяем наличие HTML-файла в поддиректории templates/html
    if os.path.exists(os.path.join('templates', f'{path}.html')):
        # Просто передаем имя файла, так как Flask уже ищет в templates
        return render_template(f'{path}.html')
    else:
        abort(404)  # Если файла нет, возвращаем 404

if __name__ == '__main__':
    app.run(debug=True)
