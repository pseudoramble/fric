import React from 'react';
import accounting from 'accounting';

import styles from './_BudgetList.scss';

import AppActions from '../actions/AppActions';

export default class BudgetList extends React.Component {
  onClick(name) {
    AppActions.updateBudget(name, this.refs[name + "-amount"].value);
  }

  render() {
    return (
      <section className={styles.budgetList}>
        {
           this.props.items.map(({name, transactions, maxAmount}) => {
             const remainingAmount = _.reduce(transactions, (remaining, deductBy) => {
               return accounting.toFixed(remaining - deductBy, 2);
             }, maxAmount);

             return (
               <section className={styles.item} key={'budget-item-' + name}>
                 <div>
                   <span className={styles.name}>{name}</span>
                   <div className={styles.totals}>{accounting.formatMoney(remainingAmount)} Left, {accounting.formatMoney(maxAmount)} Max</div>
                 </div>
                 <div>
                   <input type="number" ref={name + "-amount"} min={0} max={remainingAmount} />
                   <button onClick={this.onClick.bind(this, name)}>Bye Cash!</button>
                 </div>
               </section>
             );
           })
        }
      </section>
    );
  }
}
