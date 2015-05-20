# TodoMVC Benchmark

## Installation

### Debian and Ubuntu based Linux distributions

```text
sudo apt-get install -y nodejs git-core
```

### Enterprise Linux and Fedora

Official **Fedora** [Node.js](https://apps.fedoraproject.org/packages/nodejs) and [npm](https://apps.fedoraproject.org/packages/npm) packages are available in Fedora 18 and later.  Install with:

```text
sudo yum install nodejs npm git
```

**Enterprise Linux** (RHEL and CentOS) users may use the Node.js and npm packages from the [EPEL](https://fedoraproject.org/wiki/EPEL) repository.

Install the appropriate *epel-release* RPM for your version (found on the [EPEL](https://fedoraproject.org/wiki/EPEL) repository homepage), then run:

```text
sudo yum install nodejs npm --enablerepo=epel
sudo yum install git
```
### Windows

Not supported for now.

### NodeJS from source

See this [guide](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

## Setup

```
git clone https://github.com/Herve-M/todomvc-bench-latece.git &&
cd todomvc-bench-latece && git checkout master &&
npm install &&
grunt setup
```

## Commands

To see all available commands use `grunt`

* `grunt setup` : Clone TodoMVC Git repo && generate tests
* `grunt generate-master` : Generate test scripts for master branch
* `grunt generate-130` : Generate test scripts for 1.3.0 tag
* `grunt test-advanced-phjs` : Launch all test with PhantomJS
* `grunt test-advanced-sljs` : Launch all test with SlimerJS

## Known limitations

### Stopping on failure
Do a [bug](https://github.com/iamchrismiller/grunt-casper/issues/56) in
[grunt-casper](https://github.com/iamchrismiller/grunt-casper) using "parallel" option
stop tests set on first failure.

### Saving XUnit XML
Do a [bug](https://github.com/iamchrismiller/grunt-casper/issues/68) in [grunt-casper](https://github.com/iamchrismiller/grunt-casper) no Xunit file can be saved.  
This is only because the option "parallel" must be off to bypass another bug.
