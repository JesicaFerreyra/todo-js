
import { Todo } from "../classes";
import {todoList} from "../index";

// Referencias en el HTML

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector ('.new-todo');

const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {

        const htmlTodo = `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="${(todo.completado)? 'checked' : ''}" checked>
            <label> ${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement ('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    
    return divTodoList;


}


// Eventos

txtInput.addEventListener('keyup', (event) =>{

    console.log(event);

        if (event.keyCode === 13 && txtInput.value.length > 0) {
            console.log (txtInput.value);
            const nuevoTodo = new Todo (txtInput.value);
            todoList.nuevoTodo (nuevoTodo);

            console.log(todoList);

            crearTodoHtml (nuevoTodo);
            txtInput.value= '';
        }

});

divTodoList.addEventListener ('click', (event) =>{

    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    //console.log(todoId);

    if (nombreElemento.includes('input') ) {

        todoList.marcarCompletado (todoId);
        todoElemento.classList.toggle('completed');

    }

    console.log(todoList);
});




ulFiltros.addEventListener ('click' , (event) =>{

 
        const filtro = event.target.text;
        if (!filtro) return;

        anchorFiltros.forEach (elem => elem.classList.contains ('selected'));
        event.target.classList.add('selected');

        for ( const elemento of divTodoList.children ){
            elemento.classList.remove ('hidden');
            const completado = elemento.classList.contains('completed');

            switch (filtro) {
                case 'Pendientes':
                    if (completado) {
                        elemento.classList.add ('hidden');
                    }
                    break;

                case 'Completados':
                    if (!completado) {
                        elemento.classList.add ('hidden');
                    }
                    break;


            }
        }
});