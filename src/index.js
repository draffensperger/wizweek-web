import angular from 'angular';
import 'todomvc-app-css/index.css!';

import todos from './app/todos/todos.js';
import App from './app/containers/App.js';
import Header from './app/components/Header.js';
import MainSection from './app/components/MainSection.js';
import TodoTextInput from './app/components/TodoTextInput.js';
import TodoItem from './app/components/TodoItem.js';
import Footer from './app/components/Footer.js';
import 'angular-ui-router';
import routesConfig from './routes.js';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('todoService', todos.TodoService)
  .component('app', App)
  .component('headerComponent', Header)
  .component('footerComponent', Footer)
  .component('mainSection', MainSection)
  .component('todoTextInput', TodoTextInput)
  .component('todoItem', TodoItem);
