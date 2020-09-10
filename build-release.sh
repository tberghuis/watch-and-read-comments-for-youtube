#!/bin/bash

# update prod manifest version

rm -rf release/

mkdir release
mkdir release/content
mkdir release/content/css
mkdir release/content/js

cp -r unpacked-dev/* release/

cd content

npm run build

cp dist/css/* ../release/content/css
cp dist/js/*.js ../release/content/js

cd ..

cp prod/* release/

rm release/reload.js

# update manifest content_scripts

