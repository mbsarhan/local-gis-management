const db = require('../db/users');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const rows = await db.login(username, password);

        if (!rows.length) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.status(200).json(rows[0]);
    } catch (err) {
        next(err);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const rows = await db.getAllUsers(req.token);
        return res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
};

const addUser = async (req, res, next) => {
    try {
        const { name, username, password, id_user_type, id_group } = req.body;

        if (!name || !username || !password || !id_user_type || !id_group) {
            return res.status(400).json({ error: 'name, username, password, id_user_type and id_group are required' });
        }

        const id = await db.addUser(req.token, name, username, password, id_user_type, id_group);
        return res.status(201).json({ id });
    } catch (err) {
        next(err);
    }
};

const deactivateUser = async (req, res, next) => {
    try {
        const id = await db.deactivateUser(req.token, req.params.id);
        return res.status(200).json({ id });
    } catch (err) {
        next(err);
    }
};

const reactivateUser = async (req, res, next) => {
    try {
        const id = await db.reactivateUser(req.token, req.params.id);
        return res.status(200).json({ id });
    } catch (err) {
        next(err);
    }
};

const changeUserPassword = async (req, res, next) => {
    try {
        const { new_password } = req.body;

        if (!new_password) {
            return res.status(400).json({ error: 'new_password is required' });
        }

        const id = await db.changeUserPassword(req.token, req.params.id, new_password);
        return res.status(200).json({ id });
    } catch (err) {
        next(err);
    }
};

const changeUserType = async (req, res, next) => {
    try {
        const { id_user_type } = req.body;

        if (!id_user_type) {
            return res.status(400).json({ error: 'id_user_type is required' });
        }

        const id = await db.changeUserType(req.token, req.params.id, id_user_type);
        return res.status(200).json({ id });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
    getAllUsers,
    addUser,
    deactivateUser,
    reactivateUser,
    changeUserPassword,
    changeUserType,
};