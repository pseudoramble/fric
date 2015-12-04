import React from 'react';
import AppActions from '../actions/AppActions';
import styles from './_AddBudgetForm.scss';

export default class AddBudgetForm extends React.Component {
  onClick() {
    AppActions.addBudget(this.refs.name.value, this.refs.maxAmount.value);
  }

  render() {
    return (
      <section className={styles.budgetForm}>
        <span>
          <label htmlFor="item-name">Name:</label>
        </span>
        <div>
          <input type="text" ref="name" id="item-name" />
        </div>
        <span>
          <label htmlFor="item-max-budget">Max Budget:</label>
        </span>
        <div>
          <input type="number" ref="maxAmount" id="item-max-budget" />
        </div>

        <div>
          <button onClick={this.onClick.bind(this)}>Create new Budget</button>
        </div>
      </section>
    );
  }
};
