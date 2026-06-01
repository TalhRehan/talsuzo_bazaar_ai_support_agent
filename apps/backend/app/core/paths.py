from pathlib import Path


APP_DIR = Path(__file__).resolve().parents[1]
ROOT_DIR = APP_DIR.parents[2]
DATA_DIR = APP_DIR / "data"
POLICIES_DIR = APP_DIR / "policies"
