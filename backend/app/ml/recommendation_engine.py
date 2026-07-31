def generate_recommendations(pta: float):
    recommendations = []

    if pta <= 20:
        recommendations.append(
            "Routine hearing check-up after 12 months."
        )

    elif pta <= 40:
        recommendations.extend([
            "ENT consultation.",
            "Annual hearing evaluation.",
        ])

    elif pta <= 60:
        recommendations.extend([
            "ENT consultation.",
            "Hearing aid evaluation.",
            "Speech audiometry.",
        ])

    else:
        recommendations.extend([
            "Immediate ENT consultation.",
            "Advanced hearing aid evaluation.",
            "Cochlear implant assessment if indicated.",
        ])

    return recommendations