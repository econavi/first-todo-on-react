import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
  constructor() {
    super();

    this.maxId = 100;

    this.createItem = (label) => {
      return {
        label,
        important: false, 
        done: false,
        id: this.maxId++,
      }
    };

    this.state = {
      todoData: [
        this.createItem('Drink Coffee'),
        this.createItem('Make Awesome App'),
        this.createItem('Have a lunch'),
      ],
      term: '',
      filter: 'all', // active, all, done
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const newArr = [
          ...todoData.slice(0, index),
          ...todoData.slice(index + 1)
        ];
        return {
          todoData: newArr,
        }
      });
    };

    this.addItem = (text) => {
      const newItem = this.createItem(text);

      this.setState(({ todoData }) => {
        const newArr = [...todoData, newItem];
        return {
          todoData: newArr,
        };
      });
    };
    
    this.onToggleProperty = (arr, id, propName) => {
      const index = arr.findIndex((el) => el.id === id);
      const oldItem = arr[index];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      
      return [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index + 1),
      ];
    };

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.onToggleProperty(todoData, id, 'done'),
        };
      });
    };
    
    this.onToggleImportant = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.onToggleProperty(todoData, id, 'important'),
        };
      });
    };
    
    this.onSearchChange = (term) => {
      this.setState({ term });
    };
    
    this.onFilterChange = (filter) => {
      this.setState({ filter });
    };
    
    this.search = (items, term) => {
      if (term.length === 0) return items;
      return items.filter(item => {
        return item.label
          .toLowerCase()
          .indexOf(term.toLowerCase()) > -1;
      });
    };
    
    this.filter = (items, filter) => {
      switch(filter) {
        case 'all':
          return items;
        case 'active':
          return items.filter(item => !item.done);
        case 'done':
          return items.filter(item => item.done);
        default:
          return items;
      }
    };
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange} />
          <ItemStatusFilter 
          filter={filter}
          onFilterChange={this.onFilterChange} />
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}
