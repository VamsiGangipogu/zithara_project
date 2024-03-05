const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/customer_details', async (req, res) => {
  try {
    const { search, sortBy, page } = req.query;
    const limit = 20;
    const offset = (page - 1) * limit || 0;

    let query = `
      SELECT sno, customer_name, age, phone, location, 
      created_at::date as date, created_at::time as time 
      FROM customer_details
    `;

    const params = [];

    if (search) {
      query += ` WHERE customer_name ILIKE $1 OR location ILIKE $1`;
      params.push(`%${search}%`);
    }

    if (sortBy) {
      query += ` ORDER BY ${sortBy === 'date' ? 'created_at::date' : 'created_at::time'}`;
    }

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;

    params.push(limit, offset);

    const customers = await db.query(query, params);
    res.json(customers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
