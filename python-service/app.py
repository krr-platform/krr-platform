from flask import Flask, request, jsonify
from flask_cors import CORS
from json import dumps

app = Flask(__name__)
CORS(app)


# class Term:
#     def __init__(self, identifier, is_variable=False):
#         self.identifier = identifier
#         self.is_variable = is_variable

#     def __eq__(self, other):
#         return self.identifier == other.identifier and self.is_variable == other.is_variable

#     def __hash__(self):
#         return hash((self.identifier, self.is_variable))

#     def __str__(self):
#         return self.identifier

# class AntiUnifier:
#     def anti_unify(self, term1, term2):
#         if term1 == term2:
#             return term1
#         elif term1.is_variable or term2.is_variable:
#             # X is a placeholder for any term
#             return Term('X', is_variable=True)
#         else:
#             return Term('X', is_variable=True)  # Generalize different terms



@app.route('/compute/anti-unification-fol', methods=['POST'])
def compute():
    data = dumps(request.json)
    # Insert the logic of your calculation here and store the result.
    result = {'result': 'Computation result based on the provided data: ' + data}
    print(result)  # This will print to the console.

    # {"0": "one", "1": "two"}
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
