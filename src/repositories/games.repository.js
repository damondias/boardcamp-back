import { db } from "../database/database.connection.js"

async function verifyGame(name){
    return db.query(`
        SELECT *
            FROM games 
            WHERE name = $1;
    `, [name]);
}

async function createGame(name, image, stockTotal, pricePerDay){
    return db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
        VALUES ($1, $2, $3, $4);
    `,[name, image, stockTotal, pricePerDay]);
}

async function findGames(name){
    return db.query(`
        SELECT *
            FROM games
            ${name ? `WHERE LOWER(name) LIKE $1` : ''};
    `, name ? [`${name.toLowerCase()}%`] : []);
}

const gamesRepository ={
    verifyGame,
    createGame,
    findGames,
}

export default gamesRepository;