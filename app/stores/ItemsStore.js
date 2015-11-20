import _ from 'lodash';

import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';

import {
  ITEMS_UPDATED,
  ITEMS_GET_SUCCESS
} from '../constants/AppConstants';

class ItemsStore extends EventEmitter {
  _addBudgetItem(name) {
    const budgetItems = JSON.parse(localStorage.getItem('budget-items') || '[]');
    budgetItems.push(name);
    localStorage.setItem('budget-items', JSON.stringify(budgetItems));
  }

  _fetchBudget(name) {
    return JSON.parse((localStorage.getItem(name) || '{}'));
  }

  _saveBudget(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  addBudget(name, maxAmount) {
    this._addBudgetItem(name);

    if (!localStorage.getItem(name)) {
      this._saveBudget(name, { name : name, maxAmount : parseFloat(maxAmount), transactions : [] });
    }

    this.emitChange();
  }

  updateBudget(name, amount) {
    const item = this._fetchBudget(name);

    if (item) {
      item.transactions.push(parseFloat(amount));
      this._saveBudget(name, item);
    }

    this.emitChange();
  }

  getAll() {
    if (!localStorage.getItem('budget-items')) {
      localStorage.setItem('budget-items', JSON.stringify([]));
    }

    const budgetItems = JSON.parse(localStorage.getItem('budget-items'));
    return _.map(budgetItems, (item) => {
      return this._fetchBudget(item);
    });
  }

  emitChange() {
    this.emit(ITEMS_UPDATED);
  }

  addChangeListener(callback) {
    this.on(ITEMS_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(ITEMS_UPDATED, callback);
  }
}

let store = new ItemsStore();

AppDispatcher.register((action) => {
  switch(action.actionType) {
  case 'ADD-BUDGET':
    store.addBudget(action.name, action.maxAmount);
    break;
  case 'UPDATE-BUDGET':
    store.updateBudget(action.name, action.amount);
    break;
  case ITEMS_GET_SUCCESS:
    store.setAll(action.items);
    break;
  default:
  }
});

export default store;
