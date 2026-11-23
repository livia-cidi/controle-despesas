import { createContext, useEffect, useReducer, useState } from 'react';
import { fetchExpenses, storeExpense, updateStoredExpense, deleteStoredExpense } from '../util/http';

export const ExpensesContext = createContext({
  expenses: [],
  isLoading: false,
  error: null,
  addExpense: async () => {},
  deleteExpense: async () => {},
  updateExpense: async () => {},
  refreshExpenses: async () => {},
  clearError: () => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload;
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) => expense.id === action.payload.id ? action.payload.data : expense);
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function refreshExpenses() {
    setIsLoading(true);
    setError(null);
    try {
      const expenses = await fetchExpenses();
      dispatch({ type: 'SET', payload: expenses });
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível carregar as despesas.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshExpenses();
  }, []);

  async function addExpense(expenseData) {
    setError(null);
    try {
      const savedExpense = await storeExpense(expenseData);
      dispatch({ type: 'ADD', payload: savedExpense });
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível salvar a despesa.');
      throw requestError;
    }
  }

  async function updateExpense(id, expenseData) {
    setError(null);
    try {
      await updateStoredExpense(id, expenseData);
      dispatch({ type: 'UPDATE', payload: { id, data: { ...expenseData, id } } });
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível atualizar a despesa.');
      throw requestError;
    }
  }

  async function deleteExpense(id) {
    setError(null);
    try {
      await deleteStoredExpense(id);
      dispatch({ type: 'DELETE', payload: id });
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível apagar a despesa.');
      throw requestError;
    }
  }

  function clearError() {
    setError(null);
  }

  const value = {
    expenses: expensesState,
    isLoading,
    error,
    addExpense,
    deleteExpense,
    updateExpense,
    refreshExpenses,
    clearError,
  };

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
