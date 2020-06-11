import './styles.css'

import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from './js/components';


export const todolist = new TodoList();

todolist.todos.forEach(todo =>  crearTodoHtml( todo ) );