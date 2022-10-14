import { connection } from "../database/db.js";

const readUser = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
        const session = (await connection.query('SELECT * FROM sessions WHERE token=$1;', [token])).rows;        

        if(session.length === 0) {
            return res.sendStatus(401);
        }

        const user = await connection.query(`
            SELECT
                users.id,
                users.name,
                SUM("visitCount") AS "visitCount"
            FROM
                users
            JOIN urls ON users.id = urls."userId"
            WHERE
                users.id=$1
            GROUP BY
                users.id;
        `, [session[0].userId]);

        const urlsUser = await connection.query(`
            SELECT
                id,
                url,
                "shortUrl",
                "visitCount"
            FROM
                urls
            WHERE
                "userId"=$1;
        `, [session[0].userId]);

        const objUrlsUser = urlsUser?.rows.map(value => ({
                id: value.id,
                shortUrl: value.shortUrl,
                url: value.url,
                visitCount: value.visitCount
        }));

        const result = user?.rows.map(value => ({
            id: value.id,
            name: value.name,
            visitCount: Number(value.visitCount),
            shortenedUrls: [
                ...objUrlsUser
            ]            
        }));

        res.status(200).send(result[0]);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { readUser };