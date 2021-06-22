import React, { useState } from 'react';
// Material UI Button
import Button from '@material-ui/core/Button'
// Material UI Checkbox
import Checkbox from '@material-ui/core/Checkbox'
import TodoForm from './TodoForm'

export default function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if(edit.id) {
        return <TodoForm
        edit={edit}
        onSubmit={submitUpdate}
        />
    }

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    return todos.map((todo, index) => (
        <div
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            key={index}
        >
            <div
            key={todo.id}
            onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>

            <div className="icons">
                <Checkbox
                color="secondary"/>

                <Button
                    onClick={() => removeTodo(todo.id)}
                    color="secondary"
                    variant="outlined">
                    Delete
                </Button>

                <Button
                    onClick={() => setEdit({id: todo.id, value: todo.text})}
                    color="secondary"
                    variant="outlined">
                    Edit
                </Button>

                Added on {currentDate} at {currentTime}

                <hr/>
            </div>
        </div>
    ))
}