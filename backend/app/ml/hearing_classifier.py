from typing import Dict


def calculate_pta(thresholds: Dict[str, float]) -> float:
    """
    Calculate Pure Tone Average (PTA)
    Uses 500, 1000, 2000 and 4000 Hz.
    """

    return round(
        (
            thresholds["500"]
            + thresholds["1000"]
            + thresholds["2000"]
            + thresholds["4000"]
        )
        / 4,
        2,
    )


def classify_degree(pta: float) -> str:
    """
    WHO Hearing Loss Classification
    """

    if pta <= 20:
        return "Normal Hearing"

    elif pta <= 34:
        return "Mild Hearing Loss"

    elif pta <= 49:
        return "Moderate Hearing Loss"

    elif pta <= 64:
        return "Moderately Severe Hearing Loss"

    elif pta <= 79:
        return "Severe Hearing Loss"

    elif pta <= 94:
        return "Profound Hearing Loss"

    else:
        return "Complete Hearing Loss"


def analyze_hearing(
    right: Dict[str, float],
    left: Dict[str, float],
):
    """
    Complete Hearing Analysis
    """

    right_pta = calculate_pta(right)
    left_pta = calculate_pta(left)

    return {
        "right_pta": right_pta,
        "left_pta": left_pta,
        "right_degree": classify_degree(right_pta),
        "left_degree": classify_degree(left_pta),
    }