"""Safe service primitives shared by Scoter MCP tools."""
from __future__ import annotations

import subprocess
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SCRIPTS = ROOT / "linkedin" / "scripts"


def result(status: str, code: str, message: str, *, hint: str | None = None, data: dict[str, Any] | None = None, artifacts: list[str] | None = None) -> dict[str, Any]:
    return {"status": status, "code": code, "message": message, "hint": hint, "data": data or {}, "artifacts": artifacts or []}


def workspace_path(path: str) -> Path:
    candidate = (ROOT / path).resolve() if not Path(path).is_absolute() else Path(path).resolve()
    if ROOT not in candidate.parents and candidate != ROOT:
        raise ValueError("PATH_NOT_ALLOWED")
    if not candidate.exists():
        raise FileNotFoundError(candidate)
    return candidate


def confirmation(confirm: bool, action: str) -> dict[str, Any] | None:
    if not confirm:
        return result("error", "CONFIRMATION_REQUIRED", f"Confirmation is required to {action}.", hint="Call the tool again with confirm=true after reviewing the input.")
    return None


def run_script(script: str, *, confirm: bool) -> dict[str, Any]:
    blocked = confirmation(confirm, f"run {script}")
    if blocked:
        return blocked
    path = SCRIPTS / script
    if not path.is_file():
        return result("error", "WORKFLOW_NOT_FOUND", f"Workflow '{script}' is not available.", hint="Use list_workflows to see supported workflows.")
    try:
        completed = subprocess.run(["python3", str(path)], cwd=ROOT, capture_output=True, text=True, timeout=300, check=False)
    except subprocess.TimeoutExpired:
        return result("error", "WORKFLOW_TIMEOUT", f"Workflow '{script}' exceeded five minutes.", hint="Check browser connectivity or reduce the input scope.")
    except OSError as error:
        return result("error", "WORKFLOW_START_FAILED", f"Could not start '{script}'.", hint=str(error))
    if completed.returncode:
        detail = (completed.stderr or completed.stdout).strip()[-1000:]
        return result("error", "WORKFLOW_FAILED", f"Workflow '{script}' failed.", hint="Review the configured LinkedIn authentication or browser session.", data={"exit_code": completed.returncode, "detail": detail})
    return result("ok", "WORKFLOW_COMPLETED", f"Workflow '{script}' completed.", data={"output": completed.stdout.strip()})
