#!/usr/bin/env python3
"""Validate motion presets and their page references."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml


def load(path: str) -> dict:
    payload = yaml.safe_load(Path(path).read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise ValueError(f"{path}: racine invalide")
    return payload


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: validate_motion_spec.py <motion-spec.yaml> <page-motion-map.yaml>")
        return 1
    try:
        spec, page_map = load(sys.argv[1]), load(sys.argv[2])
    except (OSError, yaml.YAMLError, ValueError) as exc:
        print(f"Fichier illisible: {exc}")
        return 1

    errors: list[str] = []
    presets = spec.get("presets")
    if not isinstance(presets, list) or not presets:
        errors.append("motion-spec.yaml: presets vide")
        presets = []
    preset_ids: set[str] = set()
    for preset in presets:
        identifier = preset.get("id") if isinstance(preset, dict) else None
        if not identifier or identifier in preset_ids:
            errors.append(f"preset absent ou dupliqué: {identifier}")
            continue
        preset_ids.add(identifier)
        for field in ("category", "purpose", "duration_token", "easing_token", "reduced"):
            if preset.get(field) in (None, ""):
                errors.append(f"{identifier}: champ manquant {field}")

    pages = page_map.get("pages")
    if not isinstance(pages, list) or not pages:
        errors.append("page-motion-map.yaml: pages vide")
    else:
        for page in pages:
            for section in page.get("sections", []):
                preset_id = section.get("preset_id")
                if preset_id not in preset_ids:
                    errors.append(f"preset inconnu: {preset_id}")
                if not section.get("fallback"):
                    errors.append(f"fallback absent: {page.get('page_id')}/{section.get('section_id')}")

    reduced = spec.get("reduced_motion", {})
    if reduced.get("loops") != "disabled":
        errors.append("reduced_motion: les boucles doivent être désactivées")

    if errors:
        print("Validation échouée:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print("Système de mouvement valide.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
