
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
      tool: {
        cmd: 'tests/generation/generate.sh'
      }
    },
    clean: {
      tests: ["tests/test_*.js", "!tests/basicTest.js", "!tests/advancedTest.js"],
      results: ["tests/results"]
    },
    casper: {
      options: {
        test: true,
        parallel : false,
        concurrency : 1,
        'log-level' : 'error',
        'fail-fast' : false,
        concise : false,
        engine : 'phantomjs'
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
  grunt.registerTask('setup', 'Setup TodoMVC App. and generate Tests',['batch_git_clone', 'run']);
  grunt.registerTask('generate', 'Generate Tests', ['run']);
  //Clean
  grunt.registerTask('clean-all', 'Delete all tests and results', ['clean:tests', 'clean:results']);
  grunt.registerTask('clean-tests', 'Delete all tests',['clean:tests']);
  grunt.registerTask('clean-results', 'Delete all results',['clean:results']);
  //Test
  grunt.registerTask('test-basic-phjs', 'Launch basic test with PhantomJS',['casper:basicTest']);
  grunt.registerTask('test-basic-sljs', 'Launch basic test with SlimerJS',['casper:basicTest_sljs']);
  grunt.registerTask('test-advanced-phjs', 'Launch all test with PhantomJS',['casper:advancedTest']);
  grunt.registerTask('test-advanced-sljs', 'Launch all test with SlimerJS',['casper:advancedTest_sljs']);
  //Other
  grunt.registerTask('verify', ['jshint']);
};
