def classify_audiogram_pattern(thresholds):
    """
    Classify audiogram configuration.

    Parameters:
        thresholds (dict): {
            "500": value,
            "1000": value,
            "2000": value,
            "4000": value
        }

    Returns:
        tuple(pattern, reason)
    """

    t500 = thresholds["500"]
    t1000 = thresholds["1000"]
    t2000 = thresholds["2000"]
    t4000 = thresholds["4000"]

    low = (t500 + t1000) / 2
    mid = t2000
    high = t4000

    # Flat
    if max(thresholds.values()) - min(thresholds.values()) <= 15:
        return (
            "Flat",
            "Hearing thresholds remain relatively constant across all frequencies."
        )

    # Sloping
    if high - low >= 20:
        return (
            "Sloping",
            "Hearing sensitivity decreases progressively at higher frequencies."
        )

    # Rising
    if low - high >= 20:
        return (
            "Rising",
            "Low-frequency hearing is poorer than high-frequency hearing."
        )

    # Cookie Bite
    if (mid - low >= 15) and (mid - high >= 15):
        return (
            "Cookie-Bite",
            "Mid-frequency thresholds are poorer than both low and high frequencies."
        )

    # Noise Notch
    if t4000 - t2000 >= 20:
        return (
            "Noise Notch",
            "A characteristic high-frequency notch suggests possible noise-induced hearing loss."
        )

    return (
        "Unclassified",
        "Pattern does not match predefined audiogram categories."
    )