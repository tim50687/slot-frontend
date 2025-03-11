#!/usr/bin/env sh

set -e

npm run build


cd dist

rm -rf .git
git init
git lfs install
echo "*.data filter=lfs diff=lfs merge=lfs -text" > .gitattributes
echo "*.wasm filter=lfs diff=lfs merge=lfs -text" >> .gitattributes
echo "*.framework.js filter=lfs diff=lfs merge=lfs -text" >> .gitattributes



git add -A
git commit -m 'deploy'

git push -f https://github.com/tim50687/slot-frontend.git main:gh-pages

cd -