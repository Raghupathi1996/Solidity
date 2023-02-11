#!/bin/bash
toggle=false
migrationNumber=0
for arg in "$@"; do
    if [ "$toggle" = true ];
    then
        npx truffle exec scripts/unregisterContracts.js $arg
        ./compile-contracts.sh $arg
        npx truffle migrate --f $migrationNumber --to $migrationNumber
        npx truffle exec scripts/registerContracts.js $arg
        toggle=false
    else
        migrationNumber=$arg
        toggle=true
    fi
done