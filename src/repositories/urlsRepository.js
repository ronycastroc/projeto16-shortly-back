import { connection } from "../database/db.js";

const insertUrl = async (session, url, shortUrl) => {
    return await connection.query('INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);', [session[0].userId, url, shortUrl]);
};

const listUrl = async (id) => {
    return (await connection.query('SELECT id, url, "shortUrl" FROM urls WHERE id=$1;', [id])).rows;
};

const listShortUrl = async (shortUrl) => {
    return (await connection.query('SELECT * FROM urls WHERE "shortUrl"=$1;', [shortUrl])).rows;
};

const listUrlId = async (id) => {
    return (await connection.query('SELECT * FROM urls WHERE id=$1;', [id])).rows;
}

const updateCountUrl = async (url, shortUrl) => {
    return await connection.query('UPDATE urls SET "visitCount"=$1 WHERE "shortUrl"=$2;', [url[0].visitCount + 1, shortUrl]);
};

const deleteUrlId = async (id) => {
    return await connection.query('DELETE FROM urls WHERE id=$1;', [id]);
};

export { insertUrl, listUrl, listShortUrl, listUrlId, updateCountUrl, deleteUrlId };