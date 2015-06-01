#!/bin/bash
rootpath[0]="src/app/todomvc/architecture-examples"
rootpath[1]="src/app/todomvc/dependency-examples"
rootpath[2]="src/app/todomvc/vanilla-examples"
rootpath[3]="src/app/todomvc/labs/architecture-examples"
rootpath[4]="src/app/todomvc/labs/dependency-examples"

for path in "${rootpath[@]}"
do
  find $path/ -maxdepth 3 -name index.html -print0 | while IFS= read -r -d $'\0' line; do
      target=${line#${path}/}
      fileName=$(echo "${target%/*}" | sed 's/\//\-/g')
      sed -e 's@FILE_URL@'${line}'@g' -e "s@FRAMEWORK@${target%/*}@g" tests/generation/template-1.3.0-clean.js > tests/clean_${fileName}.js
  done
done

nbTest=$(ls -1 tests/clean_*.js | wc -l)
echo $nbTest" test(s) cleaner generated"
