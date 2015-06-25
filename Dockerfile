FROM ubuntu:14.04
MAINTAINER MATYSIAK Hervé "matysiak.herve@courrier.uqam.ca"
LABEL Description="Image to deploy TodoMVC LATECE Client side Benchmark"
LABEL Vendor="LATECE"
LABEL Version="0.1"

RUN apt-get update && apt-get install -y \
  git-core \
  nodejs \
  npm \
  openjdk-7-jre \
  openjdk-7-jdk \

RUN git clone -b master  https://github.com/Herve-M/todomvc-bench-latece.git

WORKDIR todomvc-bench-latece

RUN npm install

RUN grunt setup-130

RUN grunt generate-130-tested

RUN grunt test-advanced-phjs
