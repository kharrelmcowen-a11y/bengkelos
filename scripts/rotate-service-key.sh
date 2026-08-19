#!/usr/bin/env bash
# Swap in a new Supabase service key everywhere it is used, without the value
# ever appearing in a shell history, a command line, or a chat transcript.
#
#   1. Supabase dashboard -> Project Settings -> API Keys -> create a secret key
#   2. bash scripts/rotate-service-key.sh   (paste when prompted)
#   3. Supabase dashboard -> disable the key it replaces
#
# Production only: local development runs against the local Supabase stack and
# never holds a production credential.
set -euo pipefail

cd "$(dirname "$0")/.."

printf 'Paste the new Supabase service key (input hidden): '
read -rs NEW_KEY
printf '\n'

if [ -z "${NEW_KEY}" ]; then
  echo "No key given, nothing changed." >&2
  exit 1
fi

SUPABASE_URL=${SUPABASE_URL:-https://hyivfiybznrfnhbzyyeb.supabase.co}

echo "==> Checking the key against ${SUPABASE_URL}"
STATUS=$(curl -s -o /dev/null -w '%{http_code}' \
  -H "apikey: ${NEW_KEY}" -H "Authorization: Bearer ${NEW_KEY}" \
  "${SUPABASE_URL}/rest/v1/shops?select=id&limit=1")

if [ "${STATUS}" != "200" ]; then
  echo "The key was rejected (HTTP ${STATUS}). Nothing was changed." >&2
  exit 1
fi
echo "    key works"

echo "==> Updating Vercel production"
vercel env rm SUPABASE_SERVICE_ROLE_KEY production --yes > /dev/null
printf '%s' "${NEW_KEY}" | vercel env add SUPABASE_SERVICE_ROLE_KEY production > /dev/null
echo "    done"

echo "==> Redeploying"
vercel --prod --yes > /dev/null
echo "    done"

echo "==> Verifying production"
curl -s -o /dev/null -w '    dashboard: %{http_code} (expect 404, the access gate)\n' \
  https://bengkelos.vercel.app/dashboard
echo
echo "Now disable the old service_role key in the Supabase dashboard."
