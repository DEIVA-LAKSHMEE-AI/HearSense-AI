def validate_prediction(
    ml_prediction,
    right_pta,
    left_pta,
    pattern,
):
    avg_pta = (right_pta + left_pta) / 2

    final_prediction = ml_prediction
    validation_message = "ML prediction accepted."

    # Normal hearing
    if avg_pta <= 20:
        final_prediction = "Normal"
        validation_message = (
            "Clinical validation confirms normal hearing based on PTA."
        )

    # Mild hearing loss
    elif 20 < avg_pta <= 40:
        if ml_prediction == "Normal":
            final_prediction = "Conductive"
            validation_message = (
                "ML predicted Normal, but PTA indicates mild hearing loss."
            )

    # Moderate–Severe hearing loss
    elif avg_pta > 40:
        if pattern in ["Sloping", "Noise Notch"]:
            final_prediction = "Sensorineural"
            validation_message = (
                "High-frequency pattern supports sensorineural hearing loss."
            )
        elif pattern == "Flat":
            final_prediction = "Conductive"
            validation_message = (
                "Flat audiogram pattern supports conductive hearing loss."
            )

    return {
        "validated_prediction": final_prediction,
        "validation_message": validation_message,
    }