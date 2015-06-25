#!/bin/bash
rootpath[0]="src/app/todomvc/architecture-examples"
rootpath[1]="src/app/todomvc/dependency-examples"
rootpath[2]="src/app/todomvc/vanilla-examples"
rootpath[3]="src/app/todomvc/labs/architecture-examples"
rootpath[4]="src/app/todomvc/labs/dependency-examples"

tested[0]="agilityjs"
tested[1]="angularjs-perf"
tested[2]="angularjs"
tested[3]="backbone"
tested[4]="backbone_marionette"
tested[5]="closure"
tested[6]="dijon"
tested[7]="duel-www"
tested[8]="durandal"
tested[9]="enyo_backbone"
tested[10]="epitome"
tested[11]="knockback"
tested[12]="knockoutjs"
tested[13]="maria"
tested[14]="olive"
tested[15]="plastronjs"
tested[16]="puremvc"
tested[17]="ractive"
tested[18]="serenadejs"
tested[19]="stapes"
tested[20]="thorax"
tested[21]="thorax_lumbar-public"
tested[22]="typescript-angular"
tested[23]="typescript-backbone"
tested[24]="vanillajs"

array_contains () {
    local array="$1[@]"
    local seeking=$2
    local in=1
    for element in "${!array}"; do
        if [[ $element == $seeking ]]; then
            in=0
            break
        fi
    done
    return $in
}

for path in "${rootpath[@]}"
do
  find $path/ -maxdepth 3 -name index.html -print0 | while IFS= read -r -d $'\0' line; do
    target=${line#${path}/}
    fileName=$(echo "${target%/*}" | sed 's/\//\-/g')
    #Remove unusable Framework
    if array_contains tested ${target%/*}
    then
      sed -e 's@FILE_URL@'${line}'@g' -e "s@FRAMEWORK@${target%/*}@g" tests/generation/template-1.3.0.js > tests/test_${fileName}.js
    fi
  done
done

nbTest=$(ls -1 tests/test_*.js | wc -l)
echo $nbTest" test(s) generated"
