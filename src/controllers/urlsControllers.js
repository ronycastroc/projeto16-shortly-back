import { connection } from "../database/db.js";
import { nanoid } from "nanoid";

const createUrl = async (req, res) => {
    const { url } = res.locals.user;
    const session = res.locals.session;

    try {
        new URL(url);
        const shortUrl = nanoid();

        await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);', [session[0].userId, url, shortUrl]);

        res.status(201).send({ shortUrl });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

const readUrl = async (req, res) => {
    const { id } = req.params;

    try {
        const url = (await connection.query('SELECT id, url, "shortUrl" FROM urls WHERE id=$1;', [id])).rows;

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        res.status(200).send(url[0]);

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const readShortUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = (await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1;', [shortUrl])).rows;

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        await connection.query('UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;', [url[0].visitCount + 1, shortUrl]);

        res.redirect(url[0].url);

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteUrl = async (req, res) => {
    const { id } = req.params;
    const session = res.locals.session;

    try {
        const url = (await connection.query('SELECT * FROM urls WHERE id=$1;', [id])).rows;

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        if(session.length === 0 || session[0].userId !== url[0].userId) {
            return res.sendStatus(401);
         }        

        await connection.query('DELETE FROM urls WHERE id=$1;', [id]);

        res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { createUrl, readUrl, readShortUrl, deleteUrl };