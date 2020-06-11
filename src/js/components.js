import { Todo } from "../classes";

import { todolist } from "../index";

// Referencias al html
const listContent  = document.querySelector('.todo-list'),
      txtInput     = document.querySelector('.new-todo'),
      btnBorrar    = document.querySelector('.clear-completed'),
      ulFiltros    = document.querySelector('.filters'),
      achroFiltros = document.querySelectorAll('.filtro');



export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> 
    `

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    listContent.append( div.firstElementChild );

    return div.firstElementChild;

}

// Eventos

txtInput.addEventListener('keyup', ( event )=>{

    if( event.keyCode === 13 && txtInput.value.length > 0) {

        const todo = new Todo( txtInput.value );

        todolist.nuevoTodo( todo );

        crearTodoHtml( todo );
        txtInput.value = '';

    }

});

listContent.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; // Input, label, button
    const todoElement    = event.target.parentElement.parentElement; // hace referencia al elmento padre
    const todoId         = todoElement.getAttribute('data-id');

    if( nombreElemento.includes('input') ) { // Click en el check

        todolist.marcarCompletado( todoId );
        todoElement.classList.toggle('completed');

    }else if( nombreElemento.includes('button') ) {

        todolist.borrarTodos( todoId );
        listContent.removeChild( todoElement );

    }

});

btnBorrar  .addEventListener('click', (event) => {
    
    todolist.eliminarCompletados();

    // barrer el contenedor de los todos para eliminar los completados
    for( let i = listContent.children.length - 1; i >= 0; i-- ) {

        const elemento = listContent.children[i];

        if( elemento.classList.contains('completed') ) {
            listContent.removeChild( elemento );
        }
    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text; // texto dentro del elemento clickeado
    if( !filtro ) { return; }

    achroFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for( const element of listContent.children ) {
        
        // Removemos la clase a nuestros elementos
        element.classList.remove( 'hidden' );

        // Ver si el elemento esta completado
        const completado = element.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if( completado ){
                    element.classList.add('hidden');
                }
                break;

            case 'Completados':
                if(!completado){
                    element.classList.add('hidden');
                }
        
            default:
                break;
        }

    }
 
});
