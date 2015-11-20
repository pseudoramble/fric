import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/WebAPI';

import {
  ITEMS_GET_SUCCESS,
  ITEMS_GET_ERROR
} from '../constants/AppConstants';

export default {
  addBudget(name, maxAmount) {
    AppDispatcher.dispatch({
      actionType : 'ADD-BUDGET',
      name : name,
      maxAmount : maxAmount
    });
  },

  updateBudget(name, amount) {
    AppDispatcher.dispatch({
      actionType : 'UPDATE-BUDGET',
      name : name,
      amount : amount
    });
  },

  getItems() {
    WebAPI.getItems()
    .then((items) => {
      AppDispatcher.dispatch({
        actionType: ITEMS_GET_SUCCESS,
        items: items
      });
    })
    .catch(() => {
      AppDispatcher.dispatch({
        actionType: ITEMS_GET_ERROR
      });
    });
  }
};
