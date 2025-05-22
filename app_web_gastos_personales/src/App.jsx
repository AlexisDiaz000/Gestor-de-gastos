import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { LayoutDashboard, PlusCircle } from 'lucide-react';
    import HomePage from '@/pages/HomePage';
    import AddExpensePage from '@/pages/AddExpensePage';
    import EditExpensePage from '@/pages/EditExpensePage';
    import { ExpenseProvider } from '@/context/ExpenseContext';
    import { Toaster } from '@/components/ui/toaster';
    import { Button } from '@/components/ui/button';

    function App() {
      return (
        <ExpenseProvider>
          <Router>
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-6 selection:bg-primary/20 selection:text-primary">
              <header className="w-full max-w-3xl mb-10 mt-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row justify-between items-center"
                >
                  <Link to="/" className="text-2xl sm:text-3xl font-semibold text-foreground hover:text-primary transition-colors">
                    Gestor de Gastos
                  </Link>
                  <nav className="mt-4 sm:mt-0">
                    <ul className="flex space-x-1 sm:space-x-2">
                      <li>
                        <Button variant="ghost" asChild size="sm">
                          <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                            <LayoutDashboard size={18} />
                            <span>Panel</span>
                          </Link>
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" asChild size="sm">
                          <Link to="/add" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                            <PlusCircle size={18} />
                            <span>Añadir Gasto</span>
                          </Link>
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </motion.div>
              </header>

              <main className="w-full max-w-3xl flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/add" element={<AddExpensePage />} />
                  <Route path="/edit/:id" element={<EditExpensePage />} />
                </Routes>
              </main>
              <Toaster />
              <footer className="w-full max-w-3xl mt-16 mb-6 text-center text-xs text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Derechos Reservados</p>
              </footer>
            </div>
          </Router>
        </ExpenseProvider>
      );
    }

    export default App;