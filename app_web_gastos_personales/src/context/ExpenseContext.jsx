import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { fetchExpenses, addExpense as apiAddExpense, updateExpense as apiUpdateExpense, deleteExpense as apiDeleteExpense } from '@/lib/api';

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload, loading: false };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const initialState = {
    expenses: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const expenses = await fetchExpenses();
        dispatch({ type: 'SET_EXPENSES', payload: expenses });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: 'Error al cargar los gastos.' });
        console.error(err);
      }
    };

    loadExpenses();
  }, []);

  const addExpense = async (expense) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null }); // Limpiar errores anteriores
    
    try {
      // Validar que los campos requeridos estén presentes
      if (!expense.description || !expense.amount || !expense.category || !expense.date) {
        throw new Error('Todos los campos son requeridos');
      }

      // Validar que el monto sea un número válido
      const amount = parseFloat(expense.amount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('El monto debe ser un número válido mayor a 0');
      }

      // Intentar crear el gasto
      const newExpense = await apiAddExpense({
        ...expense,
        amount: amount
      });

      // Actualizar el estado con el nuevo gasto
      dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
      return newExpense;
    } catch (err) {
      console.error('Error al agregar gasto:', err);
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const expense = await apiUpdateExpense(id, updatedExpense);
      dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
      return true;
    } catch (err) {
      console.error('Error al actualizar gasto:', err);
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteExpense = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await apiDeleteExpense(id);
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
      return true;
    } catch (err) {
      console.error('Error al eliminar gasto:', err);
      dispatch({ type: 'SET_ERROR', payload: err.message });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <ExpenseContext.Provider value={{ ...state, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};
