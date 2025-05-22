import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useExpenses } from '@/context/ExpenseContext';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { Save, XCircle } from 'lucide-react';

    const ExpenseForm = ({ existingExpense }) => {
      const navigate = useNavigate();
      const { addExpense, updateExpense } = useExpenses();
      const { toast } = useToast();

      const [description, setDescription] = useState('');
      const [amount, setAmount] = useState('');
      const [category, setCategory] = useState('');
      const [date, setDate] = useState('');
      const [errors, setErrors] = useState({});

      useEffect(() => {
        if (existingExpense) {
          setDescription(existingExpense.description);
          setAmount(existingExpense.amount.toString());
          setCategory(existingExpense.category);
          setDate(existingExpense.date ? new Date(existingExpense.date).toISOString().split('T')[0] : '');
        }
      }, [existingExpense]);

      const validateForm = () => {
        const newErrors = {};
        if (!description.trim()) newErrors.description = 'La descripción es obligatoria.';
        if (!amount.trim()) {
          newErrors.amount = 'El monto es obligatorio.';
        } else if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
          newErrors.amount = 'El monto debe ser un número positivo.';
        }
        if (!category.trim()) newErrors.category = 'La categoría es obligatoria.';
        if (!date) newErrors.date = 'La fecha es obligatoria.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
          toast({
            title: "Error de Validación",
            description: "Por favor, corrige los errores en el formulario.",
            variant: "destructive",
          });
          return;
        }

        try {
          const expenseData = { description, amount: parseFloat(amount), category, date };

          if (existingExpense) {
            await updateExpense(existingExpense.id, expenseData);
            toast({
              title: "Gasto Actualizado",
              description: "El gasto ha sido actualizado exitosamente.",
              variant: "default",
            });
          } else {
            await addExpense(expenseData);
            toast({
              title: "Gasto Añadido",
              description: "El nuevo gasto ha sido añadido exitosamente.",
              variant: "default",
            });
          }
          navigate('/');
        } catch (error) {
          toast({
            title: "Error",
            description: error.message || "Ha ocurrido un error al procesar el gasto",
            variant: "destructive",
          });
        }
      };
      
      return (
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-foreground">Descripción</Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Café con amigos"
              className={`mt-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring ${errors.description ? 'border-destructive' : ''}`}
            />
            {errors.description && <p className="text-destructive text-xs mt-1">{errors.description}</p>}
          </div>

          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-foreground">Monto</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej: 5.50"
              step="0.01"
              className={`mt-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring ${errors.amount ? 'border-destructive' : ''}`}
            />
            {errors.amount && <p className="text-destructive text-xs mt-1">{errors.amount}</p>}
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-foreground">Categoría</Label>
            <Input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ej: Comida, Transporte"
              className={`mt-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring ${errors.category ? 'border-destructive' : ''}`}
            />
            {errors.category && <p className="text-destructive text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <Label htmlFor="date" className="text-sm font-medium text-foreground">Fecha</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`mt-1 bg-background border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring ${errors.date ? 'border-destructive' : ''} dark:[color-scheme:dark]`}
            />
            {errors.date && <p className="text-destructive text-xs mt-1">{errors.date}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary hover:border-primary/70"
            >
              <XCircle size={16} className="mr-2" />
              Cancelar
            </Button>
            <Button 
              type="submit"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save size={16} className="mr-2" />
              {existingExpense ? 'Actualizar Gasto' : 'Guardar Gasto'}
            </Button>
          </div>
        </motion.form>
      );
    };

    export default ExpenseForm;