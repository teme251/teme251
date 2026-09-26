"""Refresh the allowlisted public-project activity in the profile README."""

from __future__ import annotations

import datetime as dt
import json
import os
from pathlib import Path
import urllib.request

README = Path(__file__).resolve().parent.parent / "README.md"
START = "<!-- ACTIVITY:START -->"
END = "<!-- ACTIVITY:END -->"
OWNER = "teme251"
PROJECTS = (
    ("RSA Monitor", "rsa-monitor"),
    ("RSA Ops Portal v3", "rsa-ops-portal-v3"),
    ("RSA Performance Metrics v3", "RSA-PMS-v3"),
)


def latest_commit(repo: str) -> dict:
    url = f"https://api.github.com/repos/{OWNER}/{repo}/commits?per_page=1"
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "teme251-profile-activity",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token := os.getenv("GITHUB_TOKEN"):
        headers["Authorization"] = f"Bearer {token}"
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=20) as response:
        payload = json.load(response)
    if not isinstance(payload, list) or not payload:
        raise ValueError(f"No commits returned for {repo}")
    return payload[0]


def render_activity(commits: list[tuple[str, str, dict]]) -> str:
    rows = []
    for label, repo, data in commits:
        date = dt.datetime.fromisoformat(
            data["commit"]["committer"]["date"].replace("Z", "+00:00")
        ).date().isoformat()
        sha = data["sha"][:7]
        # Links and labels are from this script's allowlist; no commit message is published.
        rows.append(
            f"| [{label}](https://github.com/{OWNER}/{repo}) | "
            f"{date} | [`{sha}`](https://github.com/{OWNER}/{repo}/commit/{data['sha']}) |"
        )
    return "\n".join(
        ["| Project | Last public update | Commit |", "| --- | --- | --- |", *rows]
    )


def replace_section(readme: str, activity: str) -> str:
    if readme.count(START) != 1 or readme.count(END) != 1:
        raise ValueError("README needs exactly one activity marker pair")
    before, rest = readme.split(START, 1)
    _, after = rest.split(END, 1)
    return f"{before}{START}\n{activity}\n{END}{after}"


def main() -> None:
    commits = [(label, repo, latest_commit(repo)) for label, repo in PROJECTS]
    current = README.read_text(encoding="utf-8")
    updated = replace_section(current, render_activity(commits))
    if updated != current:
        README.write_text(updated, encoding="utf-8")
        print("Updated public project activity.")
    else:
        print("Public project activity is already current.")


if __name__ == "__main__":
    main()
