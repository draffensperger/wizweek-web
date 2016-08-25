/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */

(function() {
  'use strict';

  angular.module('wizweekPy')
  .controller('TodoController', TodoController);

  /** @ngInject */
  function TodoController($filter, todoApi, optimizeAndSync, settingsStore, $timeout) {
		'use strict';

    var vm = this;

    vm.settings = {};
    vm.settingsLoading = true;
    settingsStore.load().then(function(loadedSettings) {
      vm.settings = loadedSettings;
      vm.settingsLoading = false;
    })

    todoApi.get().then(function(todos) {
      todos.forEach(function(todo) {
        if (todo.deadline) { todo.deadline = new Date(todo.deadline) };
        if (todo.minStart) { todo.minStart = new Date(todo.minStart) };
      });
      vm.todos = todos;
    });

		var todos = vm.todos = todoApi.todos;

    var blankNewTodo = {
      title: '', hours: null, value: null, deadline: null, minStart: null
    }

    vm.optimizing = false;
    vm.optimizeMessage = '';
    vm.optimize = function() {
      vm.optimizing = true;
      optimizeAndSync.exec(vm.todos, function(message) {
        vm.optimizeMessage = message;
      }, function() {
        $timeout(function() { vm.optimizing = false; }, 100);
      });
    };

    vm.deadlinePopupOpen = false;
    vm.deadlineFocused = function() {
      vm.deadlinePopupOpen = true;
    }

    vm.minStartPopupOpen = false;
    vm.minStartFocused = function() {
      vm.minStartPopupOpen = true;
    }

    vm.newTodo = angular.extend({}, blankNewTodo);
		vm.editedTodo = null;

		vm.addTodo = function() {
			var newTodo = {
				title: vm.newTodo.title.trim(),
        hours: vm.newTodo.hours,
        value: vm.newTodo.value,
        deadline: vm.newTodo.deadline,
        minStart: vm.newTodo.minStart,
				completed: false
			};

			if (!newTodo.title || !newTodo.hours || !newTodo.value) {
				return;
			}

			vm.saving = true;
			todoApi.insert(newTodo)
				.then(function success() {
					vm.newTodo = angular.extend({}, blankNewTodo);
				})
				.finally(function () {
					vm.saving = false;
				});
		};

		vm.editTodo = function (todo) {
			vm.editedTodo = todo;
			// Clone the original todo to restore it on demand.
			vm.originalTodo = angular.extend({}, todo);
		};

		vm.saveEdits = function (todo, event) {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && vm.saveEvent === 'submit') {
				vm.saveEvent = null;
				return;
			}

			vm.saveEvent = event;

			if (vm.reverted) {
				// Todo edits were reverted-- don't save.
				vm.reverted = null;
				return;
			}

			todo.title = todo.title.trim();

			todoApi[todo.title ? 'put' : 'delete'](todo)
				.then(function success() {}, function error() {
					todo.title = vm.originalTodo.title;
				})
				.finally(function () {
					vm.editedTodo = null;
				});
		};

		vm.revertEdits = function (todo) {
			todos[todos.indexOf(todo)] = vm.originalTodo;
			vm.editedTodo = null;
			vm.originalTodo = null;
			vm.reverted = true;
		};

		vm.removeTodo = function (todo) {
			todoApi.delete(todo);
		};

		vm.saveTodo = function (todo) {
			todoApi.put(todo);
		};

		vm.toggleCompleted = function (todo, completed) {
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			todoApi.put(todo, todos.indexOf(todo))
				.then(function success() {}, function error() {
					todo.completed = !todo.completed;
				});
		};

		vm.clearCompletedTodos = function () {
			todoApi.clearCompleted();
		};

		vm.markAll = function (completed) {
			todos.forEach(function (todo) {
				if (todo.completed !== completed) {
					vm.toggleCompleted(todo, completed);
				}
			});
		};
	}
})();
