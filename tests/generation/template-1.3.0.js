var selectors = {
  todo_list_ul : 'ul#todo-list', // Selector for containing todos
  todo_list_li : 'ul#todo-list li',
  todo_input : 'ul#todo-list li .view label', // Selector for the added todos
  todo_com : 'ul#todo-list li .view input', // Selector to complete todo
  todo_new : 'input#new-todo', // Selector to add new input
  todo_count : '#todo-count', // Selector for the todo counts
  link_completed : 'ul#filters li:nth-child(3) a', // Selector for the link for completed todos
  link_all : 'ul#filters li:nth-child(1) a', // Selector for the link for All todos
  delete_todo : '.destroy' // Selector to delete selected todo
};

casper.test.begin('- Benchmark on [[FRAMEWORK]] -', 3, function suite(test) {

  var links = [];

  function getTodos () {
      var todos = document.querySelectorAll('#todo-list li');
      return todos;
  }

  function getDestroy() {
    var todos = document.querySelectorAll('.destroy');
    return todos.length;
  }

  casper.start('FILE_URL', function() {
    //this.echo(this.getCurrentUrl());
    casper.page.injectJs('src/utils/es5-shim/es5-shim.min.js');
    links = this.evaluate(getTodos);
    casper.log(links.length, 'info');
    test.assert((links.length === 0), 'list should be empty');
  });

  //Add
  casper.waitFor(function check() {
    return this.evaluate(function() {
        return document.querySelectorAll('#new-todo').length === 1;
    });
  }, function then() {
    for (i = 0; i < 500; i++) {
      //Get Focus
      this.click('input#new-todo');
      //Keep Focus
      this.sendKeys('#new-todo', 'casperjs'+i);
      //https://github.com/ariya/phantomjs/commit/cab2635e66d74b7e665c44400b8b20a8f225153a
      this.sendKeys('#new-todo', this.page.event.key.Enter);
    }
    casper.log('Insert Finish', 'info');
  }, function timeout() {
    this.die("Fail.", 1);
  });

  casper.then(function() {
    links = this.evaluate(getTodos);
    casper.log(links.length, 'info');
    test.assert((links.length === 500), 'list should have 500 elements');
  });

  //Delete
  casper.then(function(){
    //while (this.evaluate(getDestroy) != 0) {
    //while (this.exists(selectors.delete_todo)) {
    //  this.click(selectors.delete_todo);
    //}
    for (i = 0; i < 500; i++) {
      this.click(selectors.delete_todo);
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
      //Wait for issue 64 to remove this line
      test.renderResults(false, 0, 'tests/results/result_FRAMEWORK.xml');
  });
});
