#!/bin/bash

ARG_130=false
ARG_MASTER=false


while [ "$1" != "" ]; do
    PARAM=`echo $1 | awk -F= '{print $1}'`
    VALUE=`echo $1 | awk -F= '{print $2}'`
    case $PARAM in
        --130)
          ARG_130=true
            ;;
        --master)
          ARG_MASTER=true
            ;;
        *)
          echo "ERROR: unknown parameter \"$PARAM\""
          usage
          exit 1
          ;;
    esac
    shift
done

cd src/app/todomvc

if [ "$ARG_130" = true ]; then
  git checkout 1.3.0 &&
  npm install && bower install
fi

if [ "$ARG_MASTER" = true ]; then
  git checkout master &&
  npm install && bower install
fi

cd ../../..
