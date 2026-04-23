#!/usr/bin/env python3
"""Build _data/publications_cards.json from requirements/v1/publications.json."""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "requirements" / "v1" / "publications.json"
OUT = ROOT / "_data" / "publications_cards.json"

KEYWORDS_EN_MAP = {
    "说话人识别与验证": "Speaker Recognition and Verification",
    "目标说话人提取与语音分离": "Target Speaker Extraction and Speech Separation",
    "语音大模型与语音理解": "Speech Large Models and Spoken Language Understanding",
    "语音合成与歌声生成": "Speech Synthesis and Singing Voice Generation",
    "鲁棒语音处理与口音建模": "Robust Speech Processing and Accent Modeling",
    "语音信号处理与表示学习": "Speech Signal Processing and Representation Learning",
    "多模态语音与情感计算": "Multimodal Speech and Affective Computing",
    "工具、数据集与综述/挑战": "Toolkits, Datasets, and Surveys/Challenges",
}


def _years_in_text(text: str) -> list[int]:
    return [int(y) for y in re.findall(r"\b(19\d{2}|20\d{2})\b", text or "")]


def infer_year_month(venue: str) -> tuple[int, int]:
    """Return (year, month) for sorting; month 1–12, default 6 if unknown."""
    v = venue or ""
    year: int | None = None
    month = 6
    arxiv_month_set = False

    # arXiv old/new: YYMM.NNNNN after "arXiv:"
    m = re.search(r"arXiv:\s*(\d{2})(\d{2})\.\d+", v, re.I)
    if m:
        yy, mm = int(m.group(1)), int(m.group(2))
        base = 1900 if yy >= 91 else 2000
        year = base + yy
        if 1 <= mm <= 12:
            month = mm
            arxiv_month_set = True

    ys = _years_in_text(v)
    if ys:
        y_max = max(ys)
        if year is None:
            year = y_max
        else:
            # Prefer explicit trailing year when it disagrees strongly (rare)
            year = max(year, y_max)

    if year is None:
        year = 1990

    # Conference-specific month hints (rough tie-break within same year)
    conf_month: list[tuple[str, int]] = [
        (r"(?i)interspeech", 9),
        (r"(?i)\bicassp\b", 5),
        (r"(?i)\basru\b", 12),
        (r"(?i)\bslt\b", 8),
        (r"(?i)\bnaacl\b", 6),
        (r"(?i)\bacl\b", 7),
        (r"(?i)\bemnlp\b", 11),
        (r"(?i)\bcoling\b", 8),
        (r"(?i)\bieee[\s\w,]+transactions", 1),
    ]
    if not arxiv_month_set:
        for pat, mon in conf_month:
            if re.search(pat, v):
                month = mon
                break

    return year, month


def main() -> None:
    raw = json.loads(SRC.read_text(encoding="utf-8"))
    cards: list[dict] = []
    for i, p in enumerate(raw, start=1):
        venue = p.get("venue_or_source") or ""
        authors = p.get("authors") or []
        if isinstance(authors, list):
            authors_s = ", ".join(str(a) for a in authors)
        else:
            authors_s = str(authors)
        year, month = infer_year_month(venue)
        sort_key = year * 100 + month
        date_s = f"{year:04d}-{month:02d}"
        keywords_zh = p.get("research_direction") or ""
        cards.append(
            {
                "id": i,
                "title": p.get("title") or "",
                "authors": authors_s,
                "keywords": keywords_zh,
                "keywords_en": KEYWORDS_EN_MAP.get(keywords_zh, keywords_zh),
                "venue": venue,
                "date": date_s,
                "year": year,
                "sort_key": sort_key,
                "link": p.get("link") or "",
            }
        )

    cards.sort(key=lambda c: (-c["sort_key"], c["title"] or ""))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(cards, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(cards)} entries to {OUT}")


if __name__ == "__main__":
    main()
