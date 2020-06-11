import { Todo } from "./todo.class";


export class TodoList {


    constructor() {

        // this.todos = [];
        this.cargarLocalStorage();

    }

    nuevoTodo( todo ) {
        this.todos.push( todo );
        this.guardarLocalStorage()
    }

    borrarTodos( id ) {

        // Metodo filter de los arreglos
        // regresa un nuevo arreglo sin el elemento enviado por el id
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage()

    }

    marcarCompletado( id ) {

        for( const todo of this.todos ) {

            if( todo.id == id ) {

                todo.completado = !todo.completado;
                this.guardarLocalStorage()

            }

        }

    }

    eliminarCompletados(  ) {
        this.todos = this.todos.filter( todo => !todo.completado )

        this.guardarLocalStorage()
    }

    guardarLocalStorage() {

        localStorage.setItem('todo', JSON.stringify( this.todos ) );
        
    }

    cargarLocalStorage() {

        this.todos = (localStorage.getItem('todo')) ? JSON.parse(localStorage.getItem('todo')) : [];

        // Map me permite barrer cada uno de los elementos e un arreglo
        this.todos = this.todos.map( obj => Todo.fromJson( obj ) );
        console.log(this.todos);
    }
}