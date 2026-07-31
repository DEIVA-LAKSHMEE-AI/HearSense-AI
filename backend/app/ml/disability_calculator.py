def calculate_disability(right_pta: float, left_pta: float):
    """
    Simplified disability estimation.
    """

    better_ear = min(right_pta, left_pta)
    poorer_ear = max(right_pta, left_pta)

    disability = (
        (5 * better_ear) + poorer_ear
    ) / 6

    disability = max(0, disability - 25)

    return round(disability, 2)