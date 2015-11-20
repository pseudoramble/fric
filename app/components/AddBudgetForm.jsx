import React from 'react';
import AppActions from '../actions/AppActions';

export default class AddBudgetForm extends React.Component {
  onClick() {
    AppActions.addBudget(this.refs.name.value, this.refs.maxAmount.value);
  }

  render() {
    return (
      <section>
        <div>
          <label>Name:</label>
          <input type="text" ref="name" />
        </div>
        <div>
          <label>Max Budget:</label>
          <input type="number" ref="maxAmount" />
        </div>
        <div>
          <button onClick={this.onClick.bind(this)}>Add Now!</button>
        </div>
      </section>
    );
  }
};
