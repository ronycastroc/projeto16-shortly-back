import { insertUrl, listUrl, listShortUrl, updateCountUrl, listUrlId, deleteUrlId } from "../repositories/urlsRepository.js";
import { nanoid } from "nanoid";

const createUrl = async (req, res) => {
    const { url } = res.locals.user;
    const session = res.locals.session;

    try {
        new URL(url);
        const shortUrl = nanoid();

        await insertUrl(session, url, shortUrl);

        res.status(201).send({ shortUrl });

    } catch (error) {
        res.status(500).send(error.message);
    }
};

const readUrl = async (req, res) => {
    const { id } = req.params;

    try {
        const url = await listUrl(id);

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
        const url = await listShortUrl(shortUrl);

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        await updateCountUrl(url, shortUrl);

        res.redirect(url[0].url);

    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteUrl = async (req, res) => {
    const { id } = req.params;
    const session = res.locals.session;

    try {
        const url = await listUrlId(id);

        if(url.length === 0) {
            return res.sendStatus(404);
        }

        if(session.length === 0 || session[0].userId !== url[0].userId) {
            return res.sendStatus(401);
         }        

        await deleteUrlId(id);

        res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { createUrl, readUrl, readShortUrl, deleteUrl };