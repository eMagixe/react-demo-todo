import React, { Component } from 'react';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 1;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ]
    };

    getIndex(array, id) {
      return array.findIndex((item) => item.id === id)
    }

    createTodoItem(label, done = false, important = false) {
      return {
        id: this.maxId++,
        label,
        done,
        important
      };
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const index = this.getIndex(todoData, id)
            if (index >= 0) return {
                todoData: [...todoData.slice(0, index), ...todoData.slice(index + 1)]
            }
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text)
        this.setState(({ todoData }) => {
            return { todoData: [ ...todoData, newItem ] }
        })
    }

    toggleProperty(array, id, propName) {
      const index = this.getIndex(array, id);
      if (index >= 0) {
        const oldItem = array[index];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return {
            todoData: [...array.slice(0, index), newItem, ...array.slice(index + 1)]
        }
      }
    }

    onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return this.toggleProperty(todoData, id, 'important');
      })
    }

    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return this.toggleProperty(todoData, id, 'done');
      })
    }

    render() {
        const { todoData } = this.state;

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader  toDo = { todoCount } done = { doneCount }/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>
                <TodoList
                  todos={ todoData }
                  onDeleted={ this.deleteItem }
                  onToggleImportant={ this.onToggleImportant }
                  onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        )
    }
}
