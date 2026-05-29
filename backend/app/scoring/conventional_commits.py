import re


CONVENTIONAL_REGEX = r"^(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .+"


def detect_conventional_commit(message: str):
    result = {
        "is_conventional": False,
        "type": None,
        "scope": None,
        "breaking": False,
        "bonus": 0,
    }

    match = re.match(CONVENTIONAL_REGEX, message)

    if match:
        result["is_conventional"] = True
        result["type"] = match.group(1)
        result["bonus"] = 10

    if "BREAKING CHANGE" in message:
        result["breaking"] = True
        result["bonus"] += 5

    return result