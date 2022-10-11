import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

const signUp = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const validation = signUpSchema.validate(req. body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);

        return res.status(422).send(error);
    }

    if(password !== confirmPassword) {
        return res.status(422).send("Wrong Password")
    }

    try {
        const users = (await connection.query('SELECT * FROM users;')).rows;

        const isUser = users.find(value => value.email === email);

        if(isUser) {
            return res.sendStatus(409);
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        await connection.query('INSERT INTO users (name, email, password, confirmPassword) VALUES ($1, $2, $3, $4);', [name, email, passwordHash, passwordHash]);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { signUp };

