import React, { useState } from 'react';
import TodoList from './TodoList';

export default function TodoForm(props) {
    const [input, setInput] = useState('')

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        })

        setInput('');
    }

    return(
        <form
            className="todo-form"
            onSubmit={handleSubmit}>
                <input
                    type = 'text'
                    placeholder = 'Add a To-Do'
                    value = {input}
                    name = 'text'
                    className = 'todo-input'
                    onChange = {handleChange}
                    data-testid="new-item-input"
                />

                <button
                    className='todo-button'
                    data-testid="new-item-button">
                    Add To-Do
                </button>
        </form>
    )
}