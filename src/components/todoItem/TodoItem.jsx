import React from 'react';
import './TodosPage.css';

function TodoItem({ todo, updateTodo, deleteTodo, updateTitle, input }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.status}
                onChange={e => updateTodo(e.target.checked, todo.id)}
            />
            <span className={todo.status ? "active" : ""}>{todo.title}</span>
            <button onClick={() => updateTitle(todo.id, input)}>Update</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;