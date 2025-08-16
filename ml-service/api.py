# ml-service/api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os, pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # ok for local dev; server-to-server doesn’t actually need this

# Load model once at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "credit_risk_model.pkl")
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

# Expected fields (match your Streamlit features)
EXPECTED = [
    "Age", "Income", "Emp_length", "Amount", "Rate",
    "Cred_length", "Intent", "Home", "Percent_income", "Status"
]

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        payload = request.get_json(force=True) or {}

        # Accept either a flat object OR {features:{...}}
        data = payload.get("features", payload)

        # Compute derived fields if missing
        if "Percent_income" not in data:
            if "Amount" in data and "Income" in data and float(data["Income"] or 0) != 0:
                data["Percent_income"] = float(data["Amount"]) / float(data["Income"])
            else:
                data["Percent_income"] = 0.0

        # Default Status if not provided (your Streamlit used it as a feature)
        data.setdefault("Status", 0)

        # Build a single-row DataFrame with expected columns
        row = {k: data.get(k, None) for k in EXPECTED}
        df = pd.DataFrame([row])

        pred = model.predict(df)[0]
        proba = getattr(model, "predict_proba", None)
        p = float(proba(df)[0][1]) if callable(proba) else None

        return jsonify({
            "prediction": int(pred),
            "probability": p
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Port 5001 to avoid clashing with Node on 5000
    app.run(host="0.0.0.0", port=5001, debug=True)
