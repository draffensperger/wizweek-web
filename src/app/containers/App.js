import todoFilters from '../constants/TodoFilters.js';
import todos from '../todos/todos.js';

export default {
  templateUrl: 'src/app/containers/App.html',
  controller: App
};

function App() {
  this.todos = [todos.initialTodo];
  this.filter = todoFilters.SHOW_ALL;
}
