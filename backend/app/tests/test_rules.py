from scoring.rules import evaluate_rules


def test_short_message():
    penalties = evaluate_rules("fix")

    assert "too_short" in penalties


def test_generic_word():
    penalties = evaluate_rules("update stuff")

    assert "generic_update" in penalties


def test_all_caps():
    penalties = evaluate_rules("FIX LOGIN BUG")

    assert "all_caps" in penalties