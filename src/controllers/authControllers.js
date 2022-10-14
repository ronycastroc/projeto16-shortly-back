import { connection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const signUp = async (req, res) => {
    const { name, email, password } = res.locals.user;
    
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

const signIn = async (req, res) => {
    const { email, password } = res.locals.user;

    try {
        const user = (await connection.query('SELECT * FROM users WHERE email=$1;', [email])).rows;

        if(user.length === 0 || !bcrypt.compareSync(password, user[0].password)) {
            
            return res.sendStatus(401);
        } 

        const token = uuid();

        await connection.query('DELETE FROM sessions WHERE "userId"=$1;', [user[0].id]);

        await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [user[0].id, token]);

        res.status(200).send({ token });       

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { signUp, signIn };

