import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { PlusCircle, Edit, Trash2, DollarSign, Calendar, Tag, Info, ListChecks } from 'lucide-react';
    import { useExpenses } from '@/context/ExpenseContext';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import DashboardMetrics from '@/components/DashboardMetrics';

    const HomePage = () => {
      const { expenses, deleteExpense, loading, error } = useExpenses();
      const { toast } = useToast();

      const handleDelete = async (id) => {
        try {
          await deleteExpense(id);
          toast({
            title: "Gasto Eliminado",
            description: "El gasto ha sido eliminado exitosamente.",
            variant: "default",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: error.message || "No se pudo eliminar el gasto",
            variant: "destructive",
          });
        }
      };

      if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-t-primary border-r-primary border-b-transparent border-l-transparent rounded-full"
            />
          </div>
        );
      }

      if (error) {
        return <p className="text-destructive text-center">{error}</p>;
      }
      
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.07,
          },
        },
      };

      const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 120,
          },
        },
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <DashboardMetrics expenses={expenses} />

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground flex items-center">
              <ListChecks size={22} className="mr-2 text-primary" />
              Historial de Gastos
            </h2>
            {expenses.length > 0 && (
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/add" className="flex items-center space-x-2">
                  <PlusCircle size={18} />
                  <span>Añadir Gasto</span>
                </Link>
              </Button>
            )}
          </div>

          {expenses.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center py-12 minimal-card p-6"
            >
              <Info size={40} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-lg text-foreground">No hay gastos registrados todavía.</p>
              <p className="text-sm text-muted-foreground">¡Empieza añadiendo tu primer gasto!</p>
              <Button asChild size="default" className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/add" className="flex items-center space-x-2">
                  <PlusCircle size={18} />
                  <span>Añadir Primer Gasto</span>
                </Link>
              </Button>
            </motion.div>
          ) : (
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {expenses.map((expense) => (
                <motion.li key={expense.id} variants={itemVariants}>
                  <Card className="minimal-card hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                    <CardHeader className="pb-3 pt-5 px-5">
                      <CardTitle className="text-lg font-medium text-foreground flex items-center">
                        <DollarSign size={20} className="mr-2 text-primary/90" />
                        {expense.description}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground pt-1">
                        Monto: ${parseFloat(expense.amount).toFixed(2)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1 px-5 pb-4 flex-grow">
                      <p className="flex items-center text-muted-foreground"><Tag size={14} className="mr-2 text-primary/80" /> {expense.category}</p>
                      <p className="flex items-center text-muted-foreground"><Calendar size={14} className="mr-2 text-primary/80" /> {new Date(expense.date).toLocaleDateString()}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 px-5 pb-4 pt-0">
                      <Button variant="outline" size="sm" asChild className="text-muted-foreground hover:text-primary hover:border-primary/70">
                        <Link to={`/edit/${expense.id}`}>
                          <Edit size={14} className="mr-1" /> Editar
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(expense.id)} className="bg-destructive/90 hover:bg-destructive text-destructive-foreground">
                        <Trash2 size={14} className="mr-1" /> Eliminar
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      );
    };

    export default HomePage;