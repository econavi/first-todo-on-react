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

    this.onToggleDone = (id) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[index];
        const newItem = {...oldItem, done: !oldItem.done};
        
        const newArr = [
          ...todoData.slice(0, index),
          newItem,
          ...todoData.slice(index + 1),
        ];
        
        return {
          todoData: newArr,
        };
      });
    };
    
    this.onToggleImportant = (id) => {
      console.log('Toggle Important', id);
    };
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList 
          todos={this.state.todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />

        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
}
