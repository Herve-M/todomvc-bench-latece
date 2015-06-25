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
## Workflow

You must first choose a version to work with, Master or 1.3.0.  
After do `grunt generate-*version*`, (replace version with master or 130).  
At end launch the test with `grunt test-advanced-phjs`  

If you launch many time the test and ended it not carefully, you will have
some memory problem. So you can generate "cleaners".

`grunt generate-*version*-clean && grunt clean-todo`

## Commands

To see all available commands use `grunt`

* `grunt setup` : Clone TodoMVC Git repo && setup nmp/bower on master branch
* `grunt setup-130` : Clone TodoMVC Git repo && setup npm/bowwer on 1.3.0 tag
* `grunt generate-master` : Generate test scripts for master branch
* `grunt generate-130-all` : Generate test scripts for all Framework on 1.3.0 tag
* `grunt generate-130-tested` : Generate test scripts for all tested Framework on 1.3.0 tag
* `grunt generate-clean` : Generate cleaning scripts for master branch
* `grunt generate-130-clean` : Generate cleaning scripts for 1.3.0 tag
* `grunt test-advanced-phjs` : Launch all test with PhantomJS

## Known limitations

### Stopping on failure
Do a [bug](https://github.com/iamchrismiller/grunt-casper/issues/56) in
[grunt-casper](https://github.com/iamchrismiller/grunt-casper) using "parallel" option
stop tests set on first failure.

### Saving XUnit XML
Do a [bug](https://github.com/iamchrismiller/grunt-casper/issues/68) in [grunt-casper](https://github.com/iamchrismiller/grunt-casper) no Xunit file can be saved.  
This is only because the option "parallel" must be off to bypass another bug.
