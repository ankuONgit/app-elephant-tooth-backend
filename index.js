const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.use(express.json());

/**
 * CREATE new user (POST /api/info)
 */
app.post('/api/info', (req, res) => {
    const { profile_pic, first_name, last_name, email, phone_number } = req.body;
    const sql = `INSERT INTO info (profile_pic, first_name, last_name, email, phone_number) 
               VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [profile_pic, first_name, last_name, email, phone_number], (err, result) => {
        if (err) {
            console.error('Insert error:', err);
            return res.status(500).json({ error: 'Failed to insert user' });
        }
        res.status(201).json({ id: result.insertId, message: 'User created successfully' });
    });
});

/**
 * READ all users (GET /api/info)
 */
app.get('/api/info', (req, res) => {
    db.query('SELECT * FROM info', (err, results) => {
        if (err) {
            console.error('Fetch error:', err);
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json(results);
    });
});

/**
 * READ single user (GET /api/info/:id)
 */
app.get('/api/info/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM info WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch user' });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

/**
 * UPDATE user (PUT /api/info/:id)
 */
app.put('/api/info/:id', (req, res) => {
    const { id } = req.params;
    const { profile_pic, first_name, last_name, email, phone_number } = req.body;
    const sql = `UPDATE info 
               SET profile_pic = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?
               WHERE id = ?`;

    db.query(sql, [profile_pic, first_name, last_name, email, phone_number, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to update user' });
        res.json({ message: 'User updated successfully' });
    });
});

/**
 * DELETE user (DELETE /api/info/:id)
 */
app.delete('/api/info/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM info WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to delete user' });
        res.json({ message: 'User deleted successfully' });
    });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
