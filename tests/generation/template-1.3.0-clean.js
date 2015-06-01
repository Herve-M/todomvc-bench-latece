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

casper.test.begin('- Cleaning on [[FRAMEWORK]] -', 1, function suite(test) {

  var links = [];

  function getTodos () {
      var todos = document.querySelectorAll('#todo-list li');
      return todos;
  }

  casper.start('FILE_URL', function() {
    //this.echo(this.getCurrentUrl());
    links = this.evaluate(getTodos);
    casper.log(links.length, 'info');

    for (i = 0; i < links; i++) {
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
  });
});
