
    import React from 'react';
    import { useParams } from 'react-router-dom';
    import ExpenseForm from '@/components/ExpenseForm';
    import { useExpenses } from '@/context/ExpenseContext';
    import { motion } from 'framer-motion';

    const EditExpensePage = () => {
      const { id } = useParams();
      const { getExpenseById, loading } = useExpenses();
      const expenseToEdit = getExpenseById(id);

      if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent rounded-full"
            />
          </div>
        );
      }

      if (!expenseToEdit) {
        return <p className="text-red-400 text-center">Gasto no encontrado.</p>;
      }
      
      const formattedExpenseToEdit = {
        ...expenseToEdit,
        date: expenseToEdit.date ? new Date(expenseToEdit.date).toISOString().split('T')[0] : ''
      };

      return (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto p-6 sm:p-8 glassmorphism rounded-xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Editar Gasto
          </h1>
          <ExpenseForm existingExpense={formattedExpenseToEdit} />
        </motion.div>
      );
    };

    export default EditExpensePage;
  