const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'expense_tracker_db',
  password: 'admin',
  port: 5432,
});

app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, this is the root route!');
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
