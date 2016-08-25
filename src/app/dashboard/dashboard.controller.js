/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('wizweekPy')
	.controller('TodoController', function TodoController($filter, store, optimizeAndSync) {
		'use strict';

    var vm = this;

    store.get();
		var todos = vm.todos = store.todos;

    var blankNewTodo = {
      title: '', hours: null, value: null, deadline: null, minStart: null
    }

    vm.optimizing = false;
    vm.optimizeMessage = '';
    vm.optimize = function() {
      optimizeAndSync.exec(vm.todos, function(message) {
        vm.optimizeMessage = message;
      }, function() {
        vm.optimizing = false;
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
			store.insert(newTodo)
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

			store[todo.title ? 'put' : 'delete'](todo)
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
			store.delete(todo);
		};

		vm.saveTodo = function (todo) {
			store.put(todo);
		};

		vm.toggleCompleted = function (todo, completed) {
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			store.put(todo, todos.indexOf(todo))
				.then(function success() {}, function error() {
					todo.completed = !todo.completed;
				});
		};

		vm.clearCompletedTodos = function () {
			store.clearCompleted();
		};

		vm.markAll = function (completed) {
			todos.forEach(function (todo) {
				if (todo.completed !== completed) {
					vm.toggleCompleted(todo, completed);
				}
			});
		};
	});
