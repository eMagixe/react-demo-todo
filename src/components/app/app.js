import React, { Component } from 'react';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            { id: 1, label: 'Drink Coffee' },
            { id: 2, label: 'Make Awesome App' },
            { id: 3, label: 'Have a lunch' }
        ]
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((item) => item.id === id)
            if (index >= 0) return {
                todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)]
            }
        })
    }

    addItem = (text) => {
        
        const newItem = {
            id: this.maxId++,
            label: text
        }

        this.setState(({ todoData }) => {
            return { todoData: [ ...todoData, newItem ] }
        })
    }

    render() {

        const { todoData } = this.state;

        return (
            <div className="todo-app">
                <AppHeader toDo = { 1 }
                        done = { 3 }
                />
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList todos={ todoData } onDeleted={ this.deleteItem }/>
                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        )
    }
}