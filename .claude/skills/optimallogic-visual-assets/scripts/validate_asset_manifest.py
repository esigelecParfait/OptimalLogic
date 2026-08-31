#!/usr/bin/env python3
"""Validate media planning before asset production."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: validate_asset_manifest.py <asset-manifest.yaml>")
        return 1
    path = Path(sys.argv[1])
    try:
        payload = yaml.safe_load(path.read_text(encoding="utf-8"))
    except (OSError, yaml.YAMLError) as exc:
        print(f"Manifeste illisible: {exc}")
        return 1

    errors: list[str] = []
    assets = payload.get("assets") if isinstance(payload, dict) else None
    if payload.get("status") not in {"proposed", "approved", "in_production", "complete"}:
        errors.append("status invalide")
    if not isinstance(assets, list):
        errors.append("assets doit être une liste")
        assets = []

    identifiers: set[str] = set()
    for asset in assets:
        identifier = asset.get("id") if isinstance(asset, dict) else None
        if not identifier or identifier in identifiers:
            errors.append(f"identifiant absent ou dupliqué: {identifier}")
            continue
        identifiers.add(identifier)
        for field in ("page_id", "section_id", "role", "source_type", "status", "fallback"):
            if asset.get(field) in (None, ""):
                errors.append(f"{identifier}: champ manquant {field}")
        if asset.get("decorative") is not True and not asset.get("alt"):
            errors.append(f"{identifier}: texte alternatif manquant")
        if asset.get("status") == "ready" and asset.get("rights_status") == "pending":
            errors.append(f"{identifier}: droits non confirmés")
        if asset.get("source_type") == "generated" and not asset.get("brief"):
            errors.append(f"{identifier}: brief de génération manquant")

    if errors:
        print("Validation échouée:")
        print("\n".join(f"- {error}" for error in errors))
        return 1
    print("Manifeste d’actifs valide.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
