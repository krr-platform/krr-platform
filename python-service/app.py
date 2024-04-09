from flask import Flask, request, jsonify
from flask_cors import CORS
from anti_unification_fol_calc import main


app = Flask(__name__)
CORS(app)


@app.route('/compute/anti-unification-fol', methods=['POST'])
def compute_anti_unification_fol():
    # data = dumps(request.json)
    return main.compute_anti_unification_fol(request.json)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
