const pool = require('../db');

class Task {
    static async findAllByUser(userId) {
        const res = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return res.rows;
    }

    static async create({ userId, title, description, priority, dueDate }) {
        const res = await pool.query(
            `INSERT INTO tasks (user_id, title, description, priority, due_date)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [userId, title, description, priority, dueDate]
        );
        return res.rows[0];
    }

    static async update(id, userId, fields) {
        const { title, description, isCompleted, priority, dueDate } = fields;
        const res = await pool.query(
            `UPDATE tasks SET
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                is_completed = COALESCE($3, is_completed),
                priority = COALESCE($4, priority),
                due_date = COALESCE($5, due_date),
                updated_at = NOW()
             WHERE id = $6 AND user_id = $7 RETURNING *`,
            [title, description, isCompleted, priority, dueDate, id, userId]
        );
        return res.rows[0];
    }

    static async delete(id, userId) {
        const res = await pool.query(
            'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        return res.rows[0];
    }
}

module.exports = Task;