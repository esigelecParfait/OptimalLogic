#!/usr/bin/env python3
"""Validate the minimum contract shared by the OptimalLogic rebuild skills."""

from __future__ import annotations

import sys
from pathlib import Path

import yaml


REQUIRED_FILES = {
    "site-spec.yaml",
    "page-inventory.yaml",
    "content-map.yaml",
    "conversion-map.yaml",
    "open-decisions.yaml",
    "source-ledger.yaml",
}

VALID_STATUSES = {"needs_input", "ready", "approved"}
VALID_DECISIONS = {"preserve", "redesign", "internal", "reference_only"}


def load_yaml(path: Path) -> dict:
    try:
        payload = yaml.safe_load(path.read_text(encoding="utf-8"))
    except (OSError, yaml.YAMLError) as exc:
        raise ValueError(f"{path.name}: YAML illisible: {exc}") from exc
    if not isinstance(payload, dict):
        raise ValueError(f"{path.name}: la racine doit être un objet")
    return payload


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: validate_rebuild_pack.py <dossier-directeur>")
        return 1

    root = Path(sys.argv[1]).resolve()
    errors: list[str] = []

    missing = sorted(name for name in REQUIRED_FILES if not (root / name).is_file())
    errors.extend(f"fichier manquant: {name}" for name in missing)
    if missing:
        print("\n".join(errors))
        return 1

    try:
        spec = load_yaml(root / "site-spec.yaml")
        inventory = load_yaml(root / "page-inventory.yaml")
        content = load_yaml(root / "content-map.yaml")
        conversion = load_yaml(root / "conversion-map.yaml")
        load_yaml(root / "open-decisions.yaml")
        sources = load_yaml(root / "source-ledger.yaml")
    except ValueError as exc:
        print(exc)
        return 1

    for filename, payload in {
        "site-spec.yaml": spec,
        "page-inventory.yaml": inventory,
        "content-map.yaml": content,
        "conversion-map.yaml": conversion,
    }.items():
        if payload.get("status") not in VALID_STATUSES:
            errors.append(f"{filename}: statut invalide")

    routes = inventory.get("routes")
    if not isinstance(routes, list) or not routes:
        errors.append("page-inventory.yaml: routes doit être une liste non vide")
    else:
        paths: set[str] = set()
        for index, route in enumerate(routes):
            if not isinstance(route, dict):
                errors.append(f"page-inventory.yaml: route {index} invalide")
                continue
            path = route.get("path")
            if not isinstance(path, str) or not path.startswith("/"):
                errors.append(f"page-inventory.yaml: route {index} sans path valide")
            elif path in paths:
                errors.append(f"page-inventory.yaml: path dupliqué {path}")
            else:
                paths.add(path)
            if route.get("decision") not in VALID_DECISIONS:
                errors.append(f"page-inventory.yaml: décision invalide pour {path}")

    positioning = content.get("positioning", {})
    if not positioning.get("existing_core"):
        errors.append("content-map.yaml: positionnement existant absent")
    if not positioning.get("added_demand_management"):
        errors.append("content-map.yaml: axe de gestion des demandes absent")

    channels = conversion.get("channels")
    channel_ids = {
        item.get("id") for item in channels or [] if isinstance(item, dict)
    }
    for required in {"call", "quote", "form", "booking", "message"}:
        if required not in channel_ids:
            errors.append(f"conversion-map.yaml: canal manquant {required}")

    source_items = sources.get("sources")
    if not isinstance(source_items, list) or not source_items:
        errors.append("source-ledger.yaml: aucune source")

    if errors:
        print("Validation échouée:")
        print("\n".join(f"- {error}" for error in errors))
        return 1

    print("Dossier directeur OptimalLogic valide.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
