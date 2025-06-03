const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/jwt')

const UserModel = require('../model/M_User')

const UserController = {
    
    getUsers: asyncHandler(async (req, res) => {
        const result = await UserModel.getUsers()
        res.status(200).json(result)
    }),

    getUserById: asyncHandler(async (req, res) => {
        const id = req.params.id;
        const user = await UserModel.getUserById(id)
        res.status(200).json({user})
    }),

    login: asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const result = await UserModel.login(username, password);
    if (!result || result.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const user = result[0];

    console.log("User payload for token:", user[0]); 

    const token = generateToken(user[0]); 

        res.status(200).json({
            message: 'Login successful.',
            data: {
                user,
                token
            }
        });
    }),


    signup: asyncHandler(async (req, res) => {
        const { name, username, password } = req.body;

        if(!name || !username || !password){
            res.status(400);
            throw new Error('Name, username, and password are required');
        }

        const userExists = await UserModel.getUserByUsername(username)
        if(userExists){
            res.status(400);
            throw new Error('Username already taken.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.createUser(name, username, hashedPassword);
        res.status(201).json({message: 'User created successfully.'});
    })
}

module.exports = UserController