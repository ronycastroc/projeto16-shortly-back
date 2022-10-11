import pg from "pg";
import { DATABASE_URL } from "../configs/constants";

const { Pool } = pg;

const connection = new Pool ({
    connectionString: DATABASE_URL
});

export { connection };