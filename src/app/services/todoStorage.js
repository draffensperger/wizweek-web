/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
(function() {
  'use strict';

  angular.module('wizweekPy')
	.factory('todoApi', todoApi);

  /** @ngInject */
  function todoApi($resource, auth, apiBaseUrl) {
		var store = {
			todos: [],

			api: $resource(apiBaseUrl + 'tasks/:id', null,
				{
          query: {
            headers: { 'Authorization': 'Bearer ' + auth.token },
            isArray: true
          },
          delete: {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + auth.token }
          },
          save: {
            method:'POST',
            headers: { 'Authorization': 'Bearer ' + auth.token }
          },
          update: {
            method:'PUT',
            headers: { 'Authorization': 'Bearer ' + auth.token }
          }
				}
			),

			clearCompleted: function () {
				var originalTodos = store.todos.slice(0);

				var incompleteTodos = store.todos.filter(function (todo) {
					return !todo.completed;
				});

				angular.copy(incompleteTodos, store.todos);

				return store.api.delete(function () {
					}, function error() {
						angular.copy(originalTodos, store.todos);
					});
			},

			delete: function (todo) {
				var originalTodos = store.todos.slice(0);

				store.todos.splice(store.todos.indexOf(todo), 1);
				return store.api.delete({ id: todo.id },
					function () {
					}, function error() {
						angular.copy(originalTodos, store.todos);
					});
			},

			get: function () {
        return store.api.query(function (todos) {
          todos.forEach(function(todo) {
            if (todo.deadline) { todo.deadline = new Date(todo.deadline) };
            if (todo.minStart) { todo.minStart = new Date(todo.minStart) };
          });
					angular.copy(todos, store.todos);
				})
			},

			insert: function (todo) {
				var originalTodos = store.todos.slice(0);

				return store.api.save(todo,
					function success(resp) {
						todo.id = resp.id;
						store.todos.push(todo);
					}, function error() {
						angular.copy(originalTodos, store.todos);
					})
					.$promise;
			},

			put: function (todo) {
				return store.api.update({ id: todo.id }, todo)
					.$promise;
			}
		};

		return store;
	}
})();

