def calculate_score(
    rule_penalties,
    conventional_result,
    semantic_score=0,
    language_penalty=0,
):
    score = 100

    total_penalty = sum(rule_penalties.values())

    score -= total_penalty

    score += conventional_result.get("bonus", 0)

    score += semantic_score

    score -= language_penalty

    score = max(0, min(score, 100))

    breakdown = {
        "base_score": 100,
        "rule_penalty": total_penalty,
        "conventional_bonus": conventional_result.get("bonus", 0),
        "semantic_score": semantic_score,
        "language_penalty": language_penalty,
        "final_score": score,
    }

    return score, breakdown