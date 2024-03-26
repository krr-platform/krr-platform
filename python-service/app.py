from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route('/compute', methods=['POST'])
def compute():
    data = request.json
    # Insert the logic of your calculation here and store the result.
    result = {'result': 'Computation result based on the provided data: '}
    print(result)  # This will print to the console.
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
