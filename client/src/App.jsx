// App.jsx

import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: 0,
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/expenses');
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses([...expenses, data]);
        setNewExpense({
          description: '',
          amount: 0,
          type: 'expense',
          date: new Date().toISOString().split('T')[0],
        });
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };



  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>
      <div className="add-expense-container">
        <h2>Add Expense</h2>
        <input
          type="text"
          placeholder="Description"
          value={newExpense.description}
          onChange={(e) =>
            setNewExpense({ ...newExpense, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
        />
        <select
          value={newExpense.type}
          onChange={(e) =>
            setNewExpense({ ...newExpense, type: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) =>
            setNewExpense({ ...newExpense, date: e.target.value })
          }
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div className="expenses-container">
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{expense.type}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => handleDeleteExpense(expense.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className="app-description">
        <h2>App Description</h2>
        <p>
          Expense Tracker is a simple application to help you manage your expenses and income. You can add
          new expenses or income, view your transaction history, and track your total financial status.
        </p>
      </div>
    </div>
  );
};

export default App;
