from app.ml.hearing_classifier import calculate_pta
from app.ml.disability_calculator import calculate_disability
from app.ml.recommendation_engine import generate_recommendations
from app.ml.predict import predict_ml
from app.ml.explain import explain_prediction
from app.ml.validator import validate_prediction

def generate_clinical_summary(
    right_degree,
    left_degree,
    hearing_loss_type,
    disability,
):
    return (
        f"The audiogram indicates {hearing_loss_type.lower()}. "
        f"The right ear shows {right_degree.lower()} while the left ear shows "
        f"{left_degree.lower()}. Estimated hearing disability is "
        f"{disability:.2f}%. Clinical evaluation and hearing rehabilitation are recommended."
    )

def analyze_audiogram(audiogram):

    # Existing PTA frequencies
    right = {
        "500": audiogram.right_500,
        "1000": audiogram.right_1000,
        "2000": audiogram.right_2000,
        "4000": audiogram.right_4000,
    }

    left = {
        "500": audiogram.left_500,
        "1000": audiogram.left_1000,
        "2000": audiogram.left_2000,
        "4000": audiogram.left_4000,
    }

    # Rule-based calculations
    right_pta = calculate_pta(right)
    left_pta = calculate_pta(left)

    disability = calculate_disability(
        right_pta,
        left_pta,
    )

    # ML Prediction
    ml = predict_ml(
        age=25,  # Replace with patient's real age later
        right={
            "250": audiogram.right_250,
            "500": audiogram.right_500,
            "1000": audiogram.right_1000,
            "2000": audiogram.right_2000,
            "4000": audiogram.right_4000,
            "8000": audiogram.right_8000,
        },
        left={
            "250": audiogram.left_250,
            "500": audiogram.left_500,
            "1000": audiogram.left_1000,
            "2000": audiogram.left_2000,
            "4000": audiogram.left_4000,
            "8000": audiogram.left_8000,
        },
    )

    validation = validate_prediction(
        ml_prediction=ml["diagnosis"],
        right_pta=right_pta,
        left_pta=left_pta,
        pattern=ml["pattern"],
    )
    xai = explain_prediction(
    right={
        "250": audiogram.right_250,
        "500": audiogram.right_500,
        "1000": audiogram.right_1000,
        "2000": audiogram.right_2000,
        "4000": audiogram.right_4000,
        "8000": audiogram.right_8000,
    },
    left={
        "250": audiogram.left_250,
        "500": audiogram.left_500,
        "1000": audiogram.left_1000,
        "2000": audiogram.left_2000,
        "4000": audiogram.left_4000,
        "8000": audiogram.left_8000,
    },
    diagnosis=ml["diagnosis"],
    severity=ml["severity"],
    pattern=ml["pattern"],
)

    hearing_loss_type = validation["validated_prediction"]
    right_degree = ml["severity"]
    left_degree = ml["severity"]

    right_pattern = ml["pattern"]
    left_pattern = ml["pattern"]

    right_pattern_reason = "Predicted using Machine Learning model."
    left_pattern_reason = "Predicted using Machine Learning model."

    recommendations = generate_recommendations(
        max(right_pta, left_pta)
    )

    clinical_summary = generate_clinical_summary(
        right_degree,
        left_degree,
        hearing_loss_type,
        disability,
    )

    explanation = [
        f"Right Ear PTA: {right_pta:.2f} dB ({right_degree})",
        f"Left Ear PTA: {left_pta:.2f} dB ({left_degree})",
        f"ML Diagnosis: {hearing_loss_type}",
        f"Confidence: {ml['confidence']}%",
        f"Estimated Hearing Disability: {disability:.2f}%",
        f"Right Ear Pattern: {right_pattern}",
        f"Left Ear Pattern: {left_pattern}",
        "Prediction generated using the trained HearSense AI machine learning model.",
    ]

    return {
        "right_pta": right_pta,
        "left_pta": left_pta,
        "right_degree": right_degree,
        "left_degree": left_degree,
        "hearing_loss_type": hearing_loss_type,
        "disability_percentage": disability,
        "clinical_summary": clinical_summary,
        "recommendations": recommendations,
        "explanation": explanation,
        "right_pattern": right_pattern,
        "left_pattern": left_pattern,
        "right_pattern_reason": right_pattern_reason,
        "left_pattern_reason": left_pattern_reason,
        "ai_confidence": ml["confidence"],
        "ai_reasoning": xai["reasoning"],
        "important_frequencies": xai["important_frequencies"],
        "ml_prediction": ml["diagnosis"],
        "validated_prediction": validation["validated_prediction"],
        "validation_message": validation["validation_message"],
    }