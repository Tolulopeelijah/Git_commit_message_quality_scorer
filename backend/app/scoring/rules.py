import re
from scoring.generic_words import GENERIC_WORDS


MIN_LENGTH = 10
MAX_LENGTH = 72

COMMON_VERBS = [
    "add",
    "fix",
    "remove",
    "update",
    "refactor",
    "implement",
    "improve",
    "optimize",
]


def check_length(message: str):
    penalties = {}

    if len(message) < MIN_LENGTH:
        penalties["too_short"] = 15

    if len(message) > MAX_LENGTH:
        penalties["too_long"] = 10

    return penalties


def check_generic_words(message: str):
    penalties = {}

    lowered = message.lower()

    for word, score in GENERIC_WORDS.items():
        if word in lowered:
            penalties[f"generic_{word}"] = score

    return penalties


def check_ending_punctuation(message: str):
    penalties = {}

    if message.endswith("."):
        penalties["ending_period"] = 3

    if message.endswith("!"):
        penalties["ending_exclamation"] = 5

    return penalties


def check_all_caps(message: str):
    penalties = {}

    if message.isupper():
        penalties["all_caps"] = 10

    return penalties


def check_missing_verb(message: str):
    penalties = {}

    lowered = message.lower()

    if not any(verb in lowered for verb in COMMON_VERBS):
        penalties["missing_verb"] = 8

    return penalties


def evaluate_rules(message: str):
    penalties = {}

    rule_functions = [
        check_length,
        check_generic_words,
        check_ending_punctuation,
        check_all_caps,
        check_missing_verb,
    ]

    for fn in rule_functions:
        penalties.update(fn(message))

    return penalties