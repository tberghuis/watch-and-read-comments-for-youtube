#!/bin/bash

# run with arg fresh
rm -rf dist-dev
mkdir dist-dev
mkdir dist-dev/img

cp src/hot-reload.js dist-dev/
cp src/manifest.dev.json dist-dev/manifest.json
cp img/* dist-dev/img
cp src/popup/popup.html dist-dev/popup.html
cp src/popup/popup.js dist-dev/popup.js

npm run dev
