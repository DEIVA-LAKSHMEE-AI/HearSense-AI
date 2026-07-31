import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"

diagnosis_model = joblib.load(MODEL_DIR / "diagnosis_model.pkl")
severity_model = joblib.load(MODEL_DIR / "severity_model.pkl")
pattern_model = joblib.load(MODEL_DIR / "pattern_model.pkl")

diagnosis_encoder = joblib.load(MODEL_DIR / "diagnosis_encoder.pkl")
severity_encoder = joblib.load(MODEL_DIR / "severity_encoder.pkl")
pattern_encoder = joblib.load(MODEL_DIR / "pattern_encoder.pkl")


def predict_ml(age, right, left):

    features = pd.DataFrame([{
        "Age": age,

        "R250": right["250"],
        "R500": right["500"],
        "R1000": right["1000"],
        "R2000": right["2000"],
        "R4000": right["4000"],
        "R8000": right["8000"],

        "L250": left["250"],
        "L500": left["500"],
        "L1000": left["1000"],
        "L2000": left["2000"],
        "L4000": left["4000"],
        "L8000": left["8000"],
    }])

    diagnosis = diagnosis_encoder.inverse_transform(
        diagnosis_model.predict(features)
    )[0]

    severity = severity_encoder.inverse_transform(
        severity_model.predict(features)
    )[0]

    pattern = pattern_encoder.inverse_transform(
        pattern_model.predict(features)
    )[0]

    confidence = diagnosis_model.predict_proba(features).max()

    return {
        "diagnosis": diagnosis,
        "severity": severity,
        "pattern": pattern,
        "confidence": round(float(confidence * 100), 2),
    }