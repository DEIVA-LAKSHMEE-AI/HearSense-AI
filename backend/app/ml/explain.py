def explain_prediction(right, left, diagnosis, severity, pattern):

    reasons = []
    important_frequencies = []

    all_thresholds = {
        "250 Hz": max(right["250"], left["250"]),
        "500 Hz": max(right["500"], left["500"]),
        "1000 Hz": max(right["1000"], left["1000"]),
        "2000 Hz": max(right["2000"], left["2000"]),
        "4000 Hz": max(right["4000"], left["4000"]),
        "8000 Hz": max(right["8000"], left["8000"]),
    }

    # Top affected frequencies
    sorted_freqs = sorted(
        all_thresholds.items(),
        key=lambda x: x[1],
        reverse=True
    )

    important_frequencies = [freq for freq, _ in sorted_freqs[:3]]

    # Diagnosis explanation
    if diagnosis == "Normal":
        reasons.append("All hearing thresholds are within the normal clinical range.")

    elif diagnosis == "Conductive":
        reasons.append(
            "Low-frequency hearing thresholds indicate conductive hearing loss."
        )

    elif diagnosis == "Sensorineural":
        reasons.append(
            "High-frequency thresholds are elevated, which is commonly associated with sensorineural hearing loss."
        )

    elif diagnosis == "Mixed":
        reasons.append(
            "Both low and high frequencies show significant elevation, suggesting mixed hearing loss."
        )

    # Severity explanation
    reasons.append(
        f"The predicted severity is {severity.lower()} based on the overall hearing thresholds."
    )

    # Pattern explanation
    reasons.append(
        f"The audiogram configuration is classified as a {pattern.lower()} pattern."
    )

    return {
        "reasoning": reasons,
        "important_frequencies": important_frequencies
    }