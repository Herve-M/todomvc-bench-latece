casper.test.begin('- Cleaning on [[FRAMEWORK]] -', 1, function suite(test) {

  var links = [];

  function getTodos () {
      var todos = document.querySelectorAll('#todo-list li');
      return todos;
  }

  casper.start('FILE_URL', function() {
    //this.echo(this.getCurrentUrl());
    casper.page.injectJs('src/utils/es5-shim/es5-shim.min.js');
    links = this.evaluate(getTodos);
    casper.log(links.length, 'info');

    for (i = 0; i < links; i++) {
      this.click('.destroy');
    }
    casper.log('Delete Finish', 'info');
  });

  casper.then(function() {
    links = this.evaluate(getTodos);
    casper.log(links.length, 'info');
    test.assert((links.length === 0), 'list should be empty');
  });

  casper.run(function() {
      test.done();
  });
});
