#!/bin/bash

rm -rf dist-prod
mkdir dist-prod
mkdir dist-prod/img

cp src/manifest.prod.json dist-prod/manifest.json
cp img/* dist-prod/img

npm run build
