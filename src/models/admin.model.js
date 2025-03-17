const pool = require("../config/db")

const getAllUserService = async () => {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
    
};

const getSerialService = async () => {
    const serialQuery = `SELECT nextval('admin_id_seq') AS next_serial`;
    const result = await pool.query(serialQuery);
    const nextSerial = result.rows[0].next_serial;
    const id = `A${String(nextSerial).padStart(3, "0")}`;
    return {id, nextSerial};
} 

const createAdminService = async (name, email, hashedPassword, phone_number, id, nextSerial) => {
    const password = hashedPassword;
    const query = `
        INSERT INTO admins (name, email, password, phone_number, id, serial_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, phone_number, serial_number
    `;
    const values = [name, email, password, phone_number, id, nextSerial];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const verifyAdminService = async (email, password) => {
    const result = await pool.query("SELECT email, password FROM admins WHERE email = $1",[email]);
    return result.rows[0];
}

module.exports = {getAllUserService, createAdminService, verifyAdminService, getSerialService}