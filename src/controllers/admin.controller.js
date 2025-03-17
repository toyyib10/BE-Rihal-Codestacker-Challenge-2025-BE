const { createAdminService, getAllUserService, getSerialService } = require("../models/admin.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

const getAllUser = async (req, res, next) => {
    try {
        const users = await getAllUserService();
        handleResponse(res, 200, "User fetched successfully", users);
    } catch (error) {
        next(error)
    }
}

const createAdmin = async (req, res, next) => {
    const {name, email, password, phone_number} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const {id, nextSerial} = await getSerialService();
        const newAdmin = await createAdminService(name, email, hashedPassword, phone_number, id, nextSerial);
        handleResponse(res, 200, "Admin created successfully",newAdmin);
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllUser, createAdmin };