const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticate = require('../middleware/auth');

router.get('/', authenticate, async (req, res) => {
    try {
        const tasks = await Task.findAllByUser(req.userId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', authenticate, async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        if (!title) return res.status(400).json({ error: 'Title is required' });
        const task = await Task.create({
            userId: req.userId,
            title,
            description,
            priority: priority || 1,
            dueDate,
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.update(id, req.userId, req.body);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.delete(id, req.userId);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;