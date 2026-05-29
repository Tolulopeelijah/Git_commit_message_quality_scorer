from pydantic import BaseModel
from typing import Dict, Optional


class CommitIn(BaseModel):
    sha: str
    author: str
    message: str
    timestamp: str


class CommitScored(BaseModel):
    sha: str
    author: str
    message: str
    timestamp: str

    rule_penalties: Dict[str, float]
    conventional: Dict
    llm_analysis: Optional[Dict] = None

    composite_score: float
    breakdown: Dict[str, float]

    language_flag: Optional[str] = None