from scoring.rules import evaluate_rules
from scoring.conventional_commits import detect_conventional_commit
from scoring.composite_score import calculate_score


def score_commit(message: str):
    rule_penalties = evaluate_rules(message)

    conventional = detect_conventional_commit(message)

    score, breakdown = calculate_score(
        rule_penalties,
        conventional,
    )

    return {
        "message": message,
        "rule_penalties": rule_penalties,
        "conventional": conventional,
        "score": score,
        "breakdown": breakdown,
    }