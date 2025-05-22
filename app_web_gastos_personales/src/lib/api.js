const API_URL = 'http://localhost:3000';

// Función para obtener todos los gastos
export async function fetchExpenses() {
  try {
    const response = await fetch(`${API_URL}/expenses`);
    if (!response.ok) {
      throw new Error('Error al obtener los gastos');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para agregar un nuevo gasto
export async function addExpense(expense) {
  try {
    const response = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al agregar el gasto');
    }

    return data;
  } catch (error) {
    console.error('Error en addExpense:', error);
    throw new Error(error.message || 'Error al agregar el gasto');
  }
}

// Función para actualizar un gasto existente
export async function updateExpense(id, expense) {
  try {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el gasto');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Función para eliminar un gasto
export async function deleteExpense(id) {
  try {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el gasto');
    }
    // Para respuestas 204 No Content, retornamos true en lugar de intentar parsear JSON
    if (response.status === 204) {
      return true;
    }
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar gasto:', error);
    throw new Error('No se pudo eliminar el gasto');
  }
}