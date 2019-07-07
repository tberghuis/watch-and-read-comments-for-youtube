#!/bin/bash

rm -rf dist-prod
mkdir dist-prod
mkdir dist-prod/img

cp src/manifest.prod.json dist-prod/manifest.json
cp img/* dist-prod/img
cp src/popup/popup.html dist-prod/popup.html
cp src/popup/popup.js dist-prod/popup.js

npm run build
