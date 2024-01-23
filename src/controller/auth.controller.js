import User from '../models/user.model.js'
import bcryptjs from "bcryptjs";
import createAccesToken from '../libs/jwt.js';

export const addUser = async (req, res) => {
    const { email, password, userName } = req.body;

    try {

        const passwordHash = await bcryptjs.hash(password, 10);

        const newUser = new User({
            userName,
            password: passwordHash,
            email
        });

        const userAdd = await newUser.save();
        const token = await createAccesToken({ id: userAdd._id })
        res.cookie('token', token)
        res.json({
            id: userAdd._id,
            userName: userAdd.userName,
            email: userAdd.email,
            createdAt: userAdd.createdAt
        });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({
            message: "user not Found"
        });

        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({
          message: "Incorret User"  
        });

        const token = await  createAccesToken({ id: userFound._id });

        res.cookie('token', token)
        res.json({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email,
            createdAt: userFound.createdAt
        });

    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const logout = async (req, res) => {
    res.cookie('token', '',{
        expires: new Date(0)
    });
    return res.sendStatus(200);
}