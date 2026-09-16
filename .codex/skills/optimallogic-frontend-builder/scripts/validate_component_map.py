#!/usr/bin/env python3
"""Validate a component map before frontend implementation."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: validate_component_map.py <component-map.yaml>")
        return 1

    path = Path(sys.argv[1])
    try:
        payload = yaml.safe_load(path.read_text(encoding="utf-8"))
    except (OSError, yaml.YAMLError) as exc:
        print(f"Carte illisible: {exc}")
        return 1

    errors: list[str] = []
    if not isinstance(payload, dict):
        errors.append("la racine doit être un objet")
        payload = {}
    if payload.get("status") not in {"proposed", "approved", "implemented"}:
        errors.append("status invalide")
    pages = payload.get("pages")
    if not isinstance(pages, list) or not pages:
        errors.append("pages doit être une liste non vide")
    else:
        for page in pages:
            page_id = page.get("page_id") if isinstance(page, dict) else None
            sections = page.get("sections") if isinstance(page, dict) else None
            if not page_id or not isinstance(sections, list) or not sections:
                errors.append(f"page invalide: {page_id or 'sans identifiant'}")
                continue
            for section in sections:
                if section.get("decision") not in {"reuse", "extend", "create"}:
                    errors.append(f"{page_id}: décision de section invalide")
                if section.get("decision") in {"extend", "create"} and not section.get(
                    "justification"
                ):
                    errors.append(f"{page_id}: justification manquante")
                for field in ("section_id", "block_family", "variant", "acceptance"):
                    if not section.get(field):
                        errors.append(f"{page_id}: champ manquant {field}")

    if errors:
        print("Validation échouée:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print("Carte de composants valide.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
