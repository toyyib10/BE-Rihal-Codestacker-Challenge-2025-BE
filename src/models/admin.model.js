const pool = require("../config/db")

const getAllUserService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
    
};

const getAdminIdService = async () => {
    const result = await pool.query("SELECT id FROM admins ORDER BY id DESC LIMIT 1;");

    if (result.rows.length === 0) {
        return "A001";
    }

    const lastId = result.rows[0].id;
    const numberPart = parseInt(lastId.substring(1)) + 1;
    return `A${String(numberPart).padStart(3, "0")}`;
} 

const createAdminService = async (name, email, hashedPassword, phone_number, id) => {
    const password = hashedPassword;
    const query = `
        INSERT INTO admins (name, email, password, phone_number, id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone_number
    `;
    const values = [name, email, password, phone_number, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const verifyAdminService = async (email, password) => {
    const result = await pool.query("SELECT email, password FROM admins WHERE email = $1",[email]);
    return result.rows[0];
}

module.exports = {getAllUserService, createAdminService, verifyAdminService, getAdminIdService}