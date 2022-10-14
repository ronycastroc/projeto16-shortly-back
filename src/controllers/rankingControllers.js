import { connection } from "../database/db.js";

const readRanking = async (req, res) => {
    try {
        const ranking = (await connection.query(`
            SELECT
                users.id,
                users.name,
                COUNT(urls.id) AS "linksCount",
                COALESCE(SUM(urls."visitCount"), 0) AS "visitCount" 
            FROM
                users
                LEFT JOIN urls ON users.id = urls."userId"
            GROUP BY
                users.id
            ORDER BY
                "visitCount" DESC, "linksCount" DESC
            LIMIT
                10;
        `)).rows;

        res.status(200).send(ranking);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { readRanking };