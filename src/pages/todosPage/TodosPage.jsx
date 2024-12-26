import React, {useEffect, useState} from 'react';
import TodoItem from "../../components/todoItem/TodoItem";

const URL = "http://localhost:8000/todos"

function TodosPage(props) {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])

    async function getTodos () {
        const response = await fetch(URL)
        const data = await response.json()
        setTodos(data)
    }

    async function deleteTodo(id) {
        const response = await fetch(URL + `/${id}` ,{
            method: "DELETE"
        });

        if (response.status === 200) {
            getTodos()
        }
    }

    async function updateTodo (status, id) {
        const data = { status };
        const response = await fetch(URL + `/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.status === 200) {
            getTodos()
        }
    }

    async function createTodo(event) {
        event.preventDefault()
        const data = {
            status: false,
            title: input
        }

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.status === 201) {
            getTodos();
            setInput("");
        }

    }

    async function updateTitle(id, title) {
        const data = { title }
        const response  = await fetch(URL + `/${id}`, {
            method: "PATCH",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            getTodos();
            setInput("");
        }
    }

    useEffect(() => {
        getTodos()
    }, []);

    return (
        <>
            <h2>Todos</h2>
            <form onSubmit={createTodo}>
                <input type="text"
                       value={input}
                       onChange={event => setInput(event.target.value)}/>
                <button>Add</button>
            </form>

            <ul>
                {
                    todos.map((todos) => (
                        <TodoItem
                            key={todos.id}
                            todo={todos}
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                            updateTitle={updateTitle}
                            input={input}
                        />
                    ))
                }
            </ul>
        </>
    );
}

export default TodosPage;