import { connection } from "../database/db.js";

const listRankig = async () => {
    return (await connection.query(`
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

};

export { listRankig };