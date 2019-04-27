#!/bin/bash

rm -rf dist-prod
mkdir dist-prod

cp src/manifest.prod.json dist-prod/manifest.json

npm run build
