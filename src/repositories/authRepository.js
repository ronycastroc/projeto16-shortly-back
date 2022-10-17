import { connection } from "../database/db.js";

async function listUsers() {
    return (await connection.query('SELECT * FROM users;')).rows;
};

async function listUser(email) {
    return (await connection.query('SELECT * FROM users WHERE email=$1;', [email])).rows;
}

async function insertUser(name, email, passwordHash) {    
    return await connection.query(`
        INSERT INTO users 
            (name, email, password) 
        VALUES 
            ($1, $2, $3);`, [name, email, passwordHash]);   
};

async function deleteSession(user) {
    return await connection.query('DELETE FROM sessions WHERE "userId"=$1;', [user[0].id]);
}

async function insertSession(user, token) {
    return await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [user[0].id, token]);
}

export { listUsers, listUser, insertUser, deleteSession, insertSession };