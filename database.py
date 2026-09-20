from pathlib import Path
from dotenv import dotenv_values
from supabase import create_client
ENV_FILE=Path(__file__).resolve().parent.parent/".env"
config=dotenv_values(ENV_FILE)
SUPABASE_URL=config.get("SUPABASE_URL")
SUPABASE_KEY=config.get("SUPABASE_SECRET_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError(f"Supabase credentials are missing from:{ENV_FILE}")
supabase=create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)
print("Supabase connection successful!")
