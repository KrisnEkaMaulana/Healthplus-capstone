const connection = require('../config/db')
const bcrypt = require('bcryptjs');


module.exports = {
    getAllUser: async (req, res) => {
        try {
            const sql = "SELECT * FROM users"; 

            const data = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "sucess to get data", 
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    },
    getUserById: async (req, res) => {
        const id = req.params.id; 
        const sql = "SELECT * FROM users WHERE id = ?";

        try {
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "sucess to get data by id", 
                data: data
            })

        } catch (error) {
                res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    },
    addUser: async (req, res) => {        
        const {username, name, email, password, role, status} = req.body
        const sql = "INSERT INTO users (username, name, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?)";
        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, hashedPassword, role, status], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(201).json({
                message: "sucess to add data", 
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        const { username, name, email, password, role, status } = req.body;

        try {
            let hashedPassword = password;

            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const sql = "UPDATE users SET username = ?, name = ?, email = ?, role = ?, password = ?, status = ? WHERE id = ?";
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, [username, name, email, role, hashedPassword, status, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: "Success to update data",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }, 
    delete: async (req, res) => {
        const id = req.params.id; 
        const sql = "DELETE FROM users WHERE id = ?"; 

        try {
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "Success to delete data",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }, 
    //ketika endpoint di akses, akan mengupdate status dari aktif menjadi nonaktif
    deactivateUser: async (req, res) => {
        const id = req.params.id;
        const sql = "UPDATE users SET status = 'nonaktif' WHERE id = ?";

        try {
            const data = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                message: "Success to deactivate user",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    },

    //ketika endpoint di akses, akan mengupdate status dari nonaktif menjadi aktif
    activateUser: async (req, res) => {
        const id = req.params.id;
    const sql = "UPDATE users SET status = 'aktif' WHERE id = ?";

    try {
        const data = await new Promise((resolve, reject) => {
            connection.query(sql, id, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });

        return res.status(200).json({
            message: "Success to activate user",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}
};