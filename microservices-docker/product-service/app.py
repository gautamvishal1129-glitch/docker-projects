from flask import Flask, request, jsonify
import os
import pymongo

app = Flask(__name__)

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://mongo:27017")
client = pymongo.MongoClient(MONGO_URI)
db = client["microdb"]
products_col = db["products"]

@app.route("/products", methods=["GET"])
def get_products():
    # return products from DB; if empty return sample list
    items = list(products_col.find({}, {"_id": 0, "name": 1}))
    if not items:
        return jsonify({"products": ["Laptop", "Phone"]})
    return jsonify({"products": [p["name"] for p in items]})

@app.route("/products", methods=["POST"])
def add_product():
    data = request.get_json() or {}
    name = data.get("name")
    if not name:
        return jsonify({"error": "name required"}), 400
    products_col.insert_one({"name": name})
    return jsonify({"message": "product added", "name": name}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
