#!/usr/bin/env sh

set -e

npm run build


cd dist


git init
git lfs install
git lfs track "*.gz"


git add -A
git commit -m 'deploy'

git push -f https://github.com/tim50687/slot-frontend.git main:gh-pages

cd -