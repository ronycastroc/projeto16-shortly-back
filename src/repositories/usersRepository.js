import { connection } from "../database/db.js";

const listUser = async (session) => {
    return await connection.query(`
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

};

const listUrlsUser = async (session) => {
    return await connection.query(`
        SELECT
            id,
            url,
            "shortUrl",
            "visitCount"
        FROM
            urls
        WHERE
            "userId"=$1
        ORDER BY id ASC;
`, [session[0].userId]);
}

export { listUser, listUrlsUser };