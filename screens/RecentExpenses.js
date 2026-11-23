import { useContext } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Últimos 7 dias"
      fallbackText="Nenhuma despesa nos últimos 7 dias."
      isLoading={expensesCtx.isLoading}
      error={expensesCtx.error}
      onRetry={expensesCtx.refreshExpenses}
    />
  );
}

export default RecentExpenses;
