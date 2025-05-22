import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { DollarSign, TrendingUp, List } from 'lucide-react';

    const MetricCard = ({ title, value, icon, unit, color }) => {
      const IconComponent = icon;
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="minimal-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
              <IconComponent className={`h-5 w-5 ${color || 'text-primary'}`} />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-foreground">
                {unit === '$' && unit}{value}{unit !== '$' && unit && ` ${unit}`}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    };

    const DashboardMetrics = ({ expenses }) => {
      const totalExpenses = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
      const numberOfExpenses = expenses.length;
      const averageExpense = numberOfExpenses > 0 ? totalExpenses / numberOfExpenses : 0;

      const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      };
      
      return (
        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl font-semibold text-foreground mb-4">Panel de Control</h1>
          <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <MetricCard 
              title="Gasto Total" 
              value={totalExpenses.toFixed(2)} 
              icon={DollarSign} 
              unit="$"
              color="text-green-600 dark:text-green-500"
            />
            <MetricCard 
              title="Número de Gastos" 
              value={numberOfExpenses} 
              icon={List} 
              color="text-blue-600 dark:text-blue-500"
            />
            <MetricCard 
              title="Gasto Promedio" 
              value={averageExpense.toFixed(2)} 
              icon={TrendingUp} 
              unit="$"
              color="text-purple-600 dark:text-purple-500"
            />
          </div>
        </motion.div>
      );
    };

    export default DashboardMetrics;