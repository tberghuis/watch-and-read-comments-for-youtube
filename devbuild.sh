#!/bin/bash

cp src/manifest.dev.json dist-dev/manifest.json
cp src/hot-reload.js dist-dev/

# "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
# '\''
# sed -i -e 's/CONTENT_SECURITY_POLICY/script-src '\''self'\'' '\''unsafe-eval'\''; object-src '\''self'\''/g' dist-dev/manifest.json


npm run dev
