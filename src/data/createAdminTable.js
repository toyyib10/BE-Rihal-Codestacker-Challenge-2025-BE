const pool = require("../config/db.js")

const createUserTable = async () => {
    await pool.query(`
        CREATE SEQUENCE IF NOT EXISTS admin_id_seq START 1
    `);
    const queryText = `
        CREATE TABLE IF NOT EXISTS admins (
            id TEXT PRIMARY KEY, 
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone_number TEXT
        )
    `;

    try {
        pool.query(queryText);
        console.log("User table created")
    } catch (error) {
        console.log("Error", error);
    }
}


module.exports = createUserTable;