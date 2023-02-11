#!/bin/bash
set -e

commit=$(git rev-parse --verify HEAD)
echo "${commit}"
cp -r build/contracts/ ./build-${commit}/
