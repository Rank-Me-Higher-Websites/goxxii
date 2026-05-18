#!/usr/bin/env bash
# One-time data restore for the VPS. Reads DATABASE_URL from ./.env
set -e
cd "$(dirname "$0")/.."
DB_URL=$(grep -E '^DATABASE_URL=' .env | head -1 | cut -d= -f2- | sed 's/^"//;s/"$//')
if [ -z "$DB_URL" ]; then echo "DATABASE_URL not found in .env"; exit 1; fi
echo "Restoring into $DB_URL ..."
psql "$DB_URL" < scripts/restore_data.sql
echo "Done. Verifying counts:"
psql "$DB_URL" -c "SELECT 'drivers' AS t, COUNT(*) FROM drivers UNION ALL SELECT 'check-ins', COUNT(*) FROM retention_check_ins UNION ALL SELECT 'users', COUNT(*) FROM users UNION ALL SELECT 'leads', COUNT(*) FROM leads;"
