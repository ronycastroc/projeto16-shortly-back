import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
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

        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, passwordHash]);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

const signIn = async (req, res) => {
    const { email, password } = req.body;

    const validation = signInSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);
        
        return res.status(422).send(error);
    }

    try {
        const user = (await connection.query('SELECT * FROM users WHERE email=$1;', [email])).rows;

        if(user.length > 0 && bcrypt.compareSync(password, user[0].password)) {
            const token = uuid();

            await connection.query('DELETE FROM sessions WHERE "userId"=$1;', [user[0].id]);

            await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [user[0].id, token]);

            res.status(200).send({ token });

        } else {
            res.sendStatus(401);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { signUp, signIn };

