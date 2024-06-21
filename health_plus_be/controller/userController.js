const bcrypt = require('bcryptjs');
const connection = require('../config/db')
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    register: async (req, res) => {
        //tidak bisa register dengan email yang sama
        const { username, name, email, password } = req.body;
        const role = 'pasien';

        try {
            //check jika email sudah ada
            const checkEmailSql = 'SELECT * FROM users WHERE email = ?';
            const existingUser = await new Promise((resolve, reject) => {
                connection.query(checkEmailSql, [email], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            if (existingUser.length > 0) {
                return res.status(409).json({
                    message: 'Email is already in use',
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `INSERT INTO users (username, name, email, password, role, status, verified) VALUES (?, ?, ?, ?, ?, 'active', false)`;
            connection.query(sql, [username, name, email, hashedPassword, role], (error, results) => {
                if (error) {
                    return res.status(500).json({
                        message: "Internal server error",
                        error: error.message
                    });
                }
                res.status(201).json({
                    message: "User registered successfully"
                });
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    },

    login: async (req, res) => {
        //ketika status user nonaktif maka tidak bisa login
        const { email, password } = req.body;

        try {
            const sql = `SELECT * FROM users WHERE email = ?`;
            connection.query(sql, [email], async (error, results) => {
                if (error) {
                    return res.status(500).json({
                        message: "Internal server error",
                        error: error.message
                    });
                }
                if (results.length === 0) {
                    return res.status(401).json({
                        message: "Authentication failed: User not found"
                    });
                }

                const user = results[0];
                // Check apakah user active atau tidak
                if (user.status !== 'active') {
                    return res.status(403).json({
                        message: 'User is inactive and cannot log in',
                    });
                }

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return res.status(401).json({
                        message: "Authentication failed: Incorrect password"
                    });
                }

                const accessToken = jwt.sign(
                    { id: user.id, role: user.role }, process.env.JWT_SECRET,
                    { expiresIn: '1h' } 
                );

                res.status(200).json({
                    status: 'success',
                    message: 'User logged successfully',
                    role: user.role,
                    data: {
                        accessToken,
                    },
                });
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
                error: error.message
            });
        }
    }
}
