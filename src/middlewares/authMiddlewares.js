import { connection } from "../database/db.js";

async function authValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const session = (await connection.query('SELECT * FROM sessions WHERE token=$1;', [token])).rows;

        if(session.length === 0) {
           return res.sendStatus(401);
        }

        res.locals.session = session;
        next();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { authValidation };