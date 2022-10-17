import { listUsers, listUser, insertUser, deleteSession, insertSession } from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const signUp = async (req, res) => {
    const { name, email, password } = res.locals.user;
    
    try {
        const users = await listUsers()

        const isUser = users.find(value => value.email === email);

        if(isUser) {
            return res.sendStatus(409);
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        await insertUser(name, email, passwordHash);

        res.sendStatus(201);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const signIn = async (req, res) => {
    const { email, password } = res.locals.user;

    try {
        const user = await listUser(email);

        if(user.length === 0 || !bcrypt.compareSync(password, user[0].password)) {
            
            return res.sendStatus(401);
        } 

        const token = uuid();

        await deleteSession(user);

        await insertSession(user, token);

        res.status(200).send({ token });       

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { signUp, signIn };

