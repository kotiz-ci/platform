#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
secret_dir="${KOTIZ_DEV_SECRET_DIR:-${script_dir}/secrets-dev}"
password_file="${secret_dir}/postgres_password.txt"

umask 077
mkdir -p "${secret_dir}"

if [[ ! -s "${password_file}" ]]; then
  od -An -N32 -tx1 /dev/urandom | tr -d ' \n' >"${password_file}"
  printf '\n' >>"${password_file}"
fi

chmod 600 "${password_file}"
