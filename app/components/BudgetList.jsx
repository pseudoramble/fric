import React from 'react';

import AppActions from '../actions/AppActions';

export default class BudgetList extends React.Component {
  onClick(name) {
    AppActions.updateBudget(name, this.refs[name + "-amount"].value);
  }

  render() {
    return (
      <section>
        {
           this.props.items.map(({name, transactions, maxAmount}) => {
             const remainingAmount = _.reduce(transactions, (remaining, deductBy) => {
               return remaining - deductBy;
             }, maxAmount);

             return (
               <section key={'budget-item-' + name}>
                 <div>
                   <span>{name}</span> - <span>(Max = ${maxAmount})</span> <span>(Remaining = ${remainingAmount})</span>
                 </div>
                 <div>
                   <span>
                     <label>Add Transaction Amount:</label>
                     <input type="number" ref={name + "-amount"} min={0} max={remainingAmount} />
                   </span>
                   <span>
                     <button onClick={this.onClick.bind(this, name)}>Update Remaining!</button>
                   </span>
                 </div>
               </section>
             );
           })
        }
      </section>
    );
  }
}
