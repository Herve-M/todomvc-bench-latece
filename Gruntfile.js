
module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options : {
        jshintrc : '.jshintrc'
      },
      all : ['tests/*.js', 'Gruntfile.js']
    },
    watch: {
      scripts: {
        files: ['tests/generation/template.js'],
        tasks: ['run'],
        options: {
          spawn: false,
        },
      },
    },
    batch_git_clone: {
      TodoMVC: {
        options: {
          configFile:"Git2Clone.json",
          npmInstall:true,
          bowerInstall:true,
          overWrite:true
        },
      },
    },
    run: {
      master: {
        cmd: 'tests/generation/generate.sh'
      },
      masterClean: {
        cmd: 'tests/generation/generate-clean.sh'
      },
      tag130: {
        cmd: 'tests/generation/generate-1.3.0.sh'
      },
      tag130Clean: {
        cmd: 'tests/generation/template-1.3.0-clean.sh'
      },
      checkout130:{
        cmd: 'tests/generation/checkout.sh',
        args: [
          '--130'
        ]
      },
      checkoutMaster:{
        cmd: 'tests/generation/checkout.sh',
        args: [
          '--master'
        ]
      },
    },
    clean: {
      tests: ["tests/test_*.js", "!tests/basicTest.js", "!tests/advancedTest.js"],
      cleaners: ["tests/clean_*.js"],
      results: ["tests/results"],
    },
    casper: {
      options: {
        test: true,
        parallel : false,
        concurrency : 1,
        'log-level' : 'info',
        'fail-fast' : false,
        concise : false,
        engine : 'phantomjs'
      },
      cleanFramework: {
        src: ['tests/clean_*.js'],
      },
      basicTest: {
        src: ['tests/basicTest.js']
      },
      basicTest_sljs: {
        options: {
          engine : 'slimerjs'
        },
        src: ['tests/basicTest.js']
      },
      advancedTest: {
        src: ['tests/test_*.js'],
        //https://github.com/iamchrismiller/grunt-casper/issues/68
        //dest : function(input) {
        //  var str = input.replace('tests/', '');
        //  return 'tests/results/'+str.replace(/\.js$/,'phs.xml');
        //}
      },
      advancedTest_sljs: {
        options: {
          engine : 'slimerjs'
        },
        src: ['tests/test_*.js'],
        //https://github.com/iamchrismiller/grunt-casper/issues/68
        //dest : function(input) {
        //  var str = input.replace('tests/', '');
        //  return 'tests/results/'+str.replace(/\.js$/,'sljs.xml');
        //}
      },
    },
    availabletasks: {
      tasks: {
        options: {
            filter: 'exclude',
            tasks: ['casper', 'batch_git_clone', 'clean', 'default', 'jshint', 'run', 'stop', 'verify', 'wait', 'watch', 'availabletasks']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-batch-git-clone');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-casper');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-available-tasks');

  //Setup
  grunt.registerTask('default', ['availabletasks']);
  grunt.registerTask('setup', 'Setup TodoMVC App. and generate Tests [master]',['batch_git_clone', 'run:checkoutMaster']);
  grunt.registerTask('setup-130', 'Setup TodoMVC App. and generate Tests [1.3.0]',['batch_git_clone', 'run:checkout130']);
  grunt.registerTask('generate-master', 'Generate Tests for master branch', ['clean:tests', 'clean:results', 'run:checkoutMaster', 'run:master']);
  grunt.registerTask('generate-130', 'Generate Tests for 1.3.0 tag', ['clean:tests', 'clean:results', 'run:checkout130', 'run:tag130']);
  grunt.registerTask('generate-clean', 'Generate todos cleaner', ['run:masterClean']);
  grunt.registerTask('generate-130-clean', 'Generate todos cleaner', ['run:tag130Clean']);
  //Clean
  grunt.registerTask('clean-all', 'Delete all tests and results', ['clean:tests', 'clean:cleaners', 'clean:results']);
  grunt.registerTask('clean-tests', 'Delete all tests',['clean:tests']);
  grunt.registerTask('clean-results', 'Delete all results',['clean:results']);
  grunt.registerTask('clean-todo', 'Delete all todos', ['casper:cleanFramework']);
  //Test
  //grunt.registerTask('test-basic-phjs', 'Launch basic test with PhantomJS',['casper:basicTest']);
  //grunt.registerTask('test-basic-sljs', 'Launch basic test with SlimerJS',['casper:basicTest_sljs']);
  grunt.registerTask('test-advanced-phjs', 'Launch all test with PhantomJS',['casper:advancedTest']);
  grunt.registerTask('test-advanced-sljs', 'Launch all test with SlimerJS',['casper:advancedTest_sljs']);
  //Other
  grunt.registerTask('verify', ['jshint']);
};
