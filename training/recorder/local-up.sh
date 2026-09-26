#!/bin/bash
# Brings the local repair-service stack up after a container restart: Docker, Supabase (without the
# services the recordings don't need), and next dev on :3000. Never touches production: the app reads
# repair-service/.env.local, which must point at http://127.0.0.1:54321.
#
#   bash training/recorder/local-up.sh            # start what is down
#   RESET=1 bash training/recorder/local-up.sh    # also reset the database and reload the demo data
set -u
APP=${REPAIR_SERVICE_DIR:-/home/user/repair-service}
export SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=dummy SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=dummy
export SEED_ADMIN_EMAIL=bootstrap.admin@thulirtech.com SEED_ADMIN_NAME="Bootstrap Admin"

grep -q 'NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1' "$APP/.env.local" || { echo "refusing: .env.local is not local"; exit 1; }

if ! docker info >/dev/null 2>&1; then
  (dockerd > /tmp/dockerd.log 2>&1 &)
  for i in $(seq 1 30); do docker info >/dev/null 2>&1 && break; sleep 1; done
fi
echo "docker: $(docker info --format '{{.ServerVersion}}' 2>/dev/null || echo down)"

cd "$APP" || exit 1
[ -f supabase/seeds/010_bootstrap_admin.sql ] || npx tsx tools/seed/bootstrap-admin.ts
supabase start -x studio,imgproxy,vector,logflare,edge-runtime,supavisor,postgres-meta,mailpit >/dev/null 2>&1
for i in $(seq 1 30); do docker exec supabase_db_Repair_Service pg_isready -U postgres >/dev/null 2>&1 && break; sleep 2; done
if [ "${RESET:-0}" = 1 ]; then
  supabase db reset >/dev/null 2>&1 && npm run -s db:demo >/dev/null 2>&1
fi
echo "db: $(docker exec supabase_db_Repair_Service psql -U postgres -At -c 'select count(*) from work_order' 2>/dev/null) work orders"

if ! curl -s -o /dev/null --max-time 3 http://127.0.0.1:3000/login; then
  (nohup npx next dev -H 127.0.0.1 -p 3000 > /tmp/next.log 2>&1 &)
  for i in $(seq 1 60); do curl -s -o /dev/null --max-time 3 http://127.0.0.1:3000/login && break; sleep 2; done
fi
echo "app: $(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/login)"
