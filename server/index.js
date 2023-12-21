const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'expense_tracker',
  password: 'admin',
  port: 5432,
});

app.get('/api/expenses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching expenses', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/expenses', async (req, res) => {
  const { description, amount, type, date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO expenses (description, amount, type, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [description, amount, type, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding expense', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/expenses/:id', async (req, res) => {
  const { description, amount, type, date } = req.body;
  const expenseId = req.params.id;
  try {
    const result = await pool.query(
      'UPDATE expenses SET description = $1, amount = $2, type = $3, date = $4 WHERE id = $5 RETURNING *',
      [description, amount, type, date, expenseId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating expense', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  const expenseId = req.params.id;
  try {
    await pool.query('DELETE FROM expenses WHERE id = $1', [expenseId]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting expense', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});