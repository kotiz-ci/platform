#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
secret_dir="${KOTIZ_DEV_SECRET_DIR:-${script_dir}/secrets-dev}"

umask 077
mkdir -p "${secret_dir}"

for role in admin migration app; do
  password_file="${secret_dir}/postgres_${role}_password.txt"

  if [[ ! -s "${password_file}" ]]; then
    od -An -N32 -tx1 /dev/urandom | tr -d ' \n' >"${password_file}"
    printf '\n' >>"${password_file}"
  fi

  chmod 600 "${password_file}"
done
