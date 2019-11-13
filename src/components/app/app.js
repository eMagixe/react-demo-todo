import React, { Component } from 'react'
import TodoList from '../todo-list'
import SearchPanel from '../search-panel'
import AppHeader from '../app-header'
import ItemStatusFilter from '../item-status-filter'
import ItemAddForm from '../item-add-form'
import './app.css'

export default class App extends Component {

    maxId = 1

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' // active, all, done
    };

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

    onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return this.toggleProperty(todoData, id, 'important')
      })
    }

    onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return this.toggleProperty(todoData, id, 'done')
      })
    }

    onSearchChange = (term) => {
      this.setState({ term })
    }

    onFilterChange = (filter) => {
      this.setState({ filter })
    }

    onFilter = (type) => {
      console.log(type)
    }

    getIndex(array, id) {
      return array.findIndex((item) => item.id === id)
    }

    createTodoItem(label, done = false, important = false) {
      return {
        id: this.maxId++,
        label,
        done,
        important
      }
    }

    toggleProperty(array, id, propName) {
      const index = this.getIndex(array, id)
      if (index >= 0) {
        const oldItem = array[index]
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }
        return {
            todoData: [...array.slice(0, index), newItem, ...array.slice(index + 1)]
        }
      }
    }

    search(items, term) {
      if(term.length === 0) {
        return items
      }
      return items.filter((item) => {
        return item.label
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1
      })
    }

    filter(items, filter) {
      switch (filter) {
        case 'all':
          return items
        case 'active':
          return items.filter((item) => !item.done)
        case 'done':
          return items.filter((item) => item.done)
        default:
          return items
      }
    }

    render() {
        const { todoData, term, filter } = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount

        return (
            <div className="todo-app">
                <AppHeader  toDo = { todoCount } done = { doneCount }/>
                <div className="top-panel d-flex">
                    <SearchPanel
                      onSearchChange={ this.onSearchChange }
                    />
                    <ItemStatusFilter
                      filter={ filter }
                      onFilterChange={ this.onFilterChange }
                    />
                </div>
                <TodoList
                  todos={ visibleItems }
                  onDeleted={ this.deleteItem }
                  onToggleImportant={ this.onToggleImportant }
                  onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        )
    }
}
