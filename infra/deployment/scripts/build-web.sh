#!/bin/bash
# run this with:
# - ./scripts/build-web prod
# - ./scripts/build-web stg
set -e
cd ../../ && npm run build && zip -r web.zip build/* && cd -
mv ../../web.zip web.zip
