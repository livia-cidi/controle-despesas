import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText="Nenhuma despesa registrada."
      isLoading={expensesCtx.isLoading}
      error={expensesCtx.error}
      onRetry={expensesCtx.refreshExpenses}
    />
  );
}

export default AllExpenses;
