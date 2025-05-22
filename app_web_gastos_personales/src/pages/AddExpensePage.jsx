
    import React from 'react';
    import ExpenseForm from '@/components/ExpenseForm';
    import { motion } from 'framer-motion';

    const AddExpensePage = () => {
      return (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto p-6 sm:p-8 glassmorphism rounded-xl shadow-2xl"
        >
          <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Añadir Nuevo Gasto
          </h1>
          <ExpenseForm />
        </motion.div>
      );
    };

    export default AddExpensePage;
  