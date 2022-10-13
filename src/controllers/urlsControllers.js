import { connection } from "../database/db.js";
import joi from "joi";
import { nanoid } from "nanoid";

const urlSchema = joi.object({
    url: joi.string().required()
})

const createUrl = async (req, res) => {
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const validation = urlSchema.validate(req.body, { abortEarly: false });

    if(validation.error) {
        const error = validation.error.details.map(value => value.message);

        return res.status(422).send(error);
    }

    try {
        new URL(url);

        const session = (await connection.query('SELECT * FROM sessions WHERE token=$1;', [token])).rows;

        if(session.length === 0) {
           return res.sendStatus(401);
        }

        const shortUrl = nanoid();

        await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);', [session[0].userId, url, shortUrl]);

        res.status(201).send({ shortUrl });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { createUrl };