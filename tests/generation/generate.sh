#!/bin/bash
rootpath="src/app/todomvc/examples"
find src/app/todomvc/examples/ -maxdepth 2 -name index.html -print0 | while IFS= read -r -d $'\0' line; do
    target=${line#${rootpath}/}
    target2=${line#${rootpath}/}
    sed -e 's@FILE_URL@'${target2}'@g' -e "s@FRAMEWORK@${target%/*}@g" tests/generation/template.js > tests/test_${target%/*}.js
done

nbTest=$(ls -1 tests/test_*.js | wc -l)
echo $nbTest" test(s) generated"
