class ExpensesController {
    constructor() {
        // Almacenamiento temporal de gastos (en producción usarías una base de datos)
        if (!ExpensesController.expenses) {
            ExpensesController.expenses = [];
        }
    }

    // Validar datos del gasto
    validateExpense(expense) {
        const requiredFields = ['description', 'amount', 'date', 'category'];
        const missingFields = requiredFields.filter(field => !expense[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
        }

        if (isNaN(parseFloat(expense.amount))) {
            throw new Error('El monto debe ser un número válido');
        }

        if (!Date.parse(expense.date)) {
            throw new Error('La fecha debe ser válida');
        }
    }

    // Obtener todos los gastos
    async getExpenses(req, res) {
        try {
            const sortedExpenses = [...ExpensesController.expenses].sort((a, b) => {
                return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
            });
            return res.json(sortedExpenses);
        } catch (error) {
            console.error('Error al obtener gastos:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    // Crear un nuevo gasto
    async createExpense(req, res) {
        try {
            const expenseData = req.body;
            
            // Validar campos requeridos y formato
            this.validateExpense(expenseData);

            // Crear el objeto de gasto con los datos validados
            const expense = {
                id: Date.now().toString(),
                description: expenseData.description.trim(),
                amount: parseFloat(expenseData.amount),
                category: expenseData.category.trim(),
                date: new Date(expenseData.date).toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            };

            // Agregar el gasto a la lista
            ExpensesController.expenses.push(expense);
            
            // Log para debugging
            console.log('Gasto creado exitosamente:', expense);
            
            // Enviar respuesta exitosa
            return res.status(201).json(expense);
        } catch (error) {
            console.error('Error al crear gasto:', error);
            return res.status(400).json({ error: error.message });
        }
    }

    // Actualizar un gasto existente
    async updateExpense(req, res) {
        try {
            const { id } = req.params;
            const expenseData = req.body;
            this.validateExpense(expenseData);

            const expenseIndex = ExpensesController.expenses.findIndex(e => e.id === id);
            if (expenseIndex === -1) {
                return res.status(404).json({ error: 'Gasto no encontrado' });
            }

            const updatedExpense = {
                ...ExpensesController.expenses[expenseIndex],
                ...expenseData,
                amount: parseFloat(expenseData.amount),
                updatedAt: new Date().toISOString(),
                id // Mantenemos el mismo ID
            };

            ExpensesController.expenses[expenseIndex] = updatedExpense;
            return res.json(updatedExpense);
        } catch (error) {
            console.error('Error al actualizar gasto:', error);
            return res.status(400).json({ error: error.message });
        }
    }

    // Eliminar un gasto
    async deleteExpense(req, res) {
        try {
            const { id } = req.params;
            const expenseIndex = ExpensesController.expenses.findIndex(e => e.id === id);
            
            if (expenseIndex === -1) {
                return res.status(404).json({ error: 'Gasto no encontrado' });
            }

            ExpensesController.expenses.splice(expenseIndex, 1);
            return res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar gasto:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = ExpensesController;