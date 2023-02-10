#!/bin/bash
set -e

if [[ -d "./build/contracts" ]]
then
  mv ./build ./build-temp
else
  rm -rf build
  mkdir -p build-temp/contracts
fi
cp ./truffle-config-perm.js ./truffle-config.js
truffle compile
cp ./truffle-config-quire.js ./truffle-config.js
truffle compile
if [ $# -eq 0 ]; 
then
  for contract in $(find ./contracts -name '*.sol'); do
    contract=$(basename "$contract" | cut -d. -f1)
    mv -f ./build/contracts/$contract.json ./build-temp/contracts/$contract.json
  done
else
  for contract in "$@"
  do
    mv -f ./build/contracts/$contract.json ./build-temp/contracts/$contract.json
  done
fi
rm -r ./build
mv -f ./build-temp ./build