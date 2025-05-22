const ExpensesController = require('../controllers');

function setRoutes(app) {
    const expensesController = new ExpensesController();

    // Ruta de bienvenida
    app.get('/', (req, res) => {
        res.send('¡Bienvenido al backend de gastos personales!');
    });

    // Rutas para los gastos con bind para mantener el contexto
    app.get('/expenses', expensesController.getExpenses.bind(expensesController));
    app.post('/expenses', expensesController.createExpense.bind(expensesController));
    app.put('/expenses/:id', expensesController.updateExpense.bind(expensesController));
    app.delete('/expenses/:id', expensesController.deleteExpense.bind(expensesController));
}

module.exports = { setRoutes };