import { db } from "../database/database.connection.js";

async function verifyCustomer(id){
    return db.query(`
        SELECT id 
            FROM customers 
            WHERE id=$1
  `, [id]);
}

async function verifyGame(id){
    return db.query(`
        SELECT * 
            FROM games 
            WHERE id=$1
  `, [id]);
}

async function listRentals(gameId){
    return db.query(`
        SELECT id
            FROM rentals 
            WHERE "gameId"=$1 AND "returnDate" IS null
  `, [gameId]);
}

async function createRental(customerId, gameId, daysRented, originalPrice){
    return db.query(`
        INSERT INTO 
        rentals (
            "customerId", "gameId", "rentDate", 
            "daysRented", "returnDate", "originalPrice", "delayFee"
        )
        VALUES ($1, $2, NOW(), $3, null, $4, null); 
    `, [customerId, gameId, daysRented, originalPrice]);
}

async function findRentals(){
    return db.query(`
        SELECT
            rentals.*,
            jsonb_build_object('id', customers.id, 'name', customers.name) AS customer,
            jsonb_build_object('id', games.id, 'name', games.name) AS game
        FROM rentals 
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;
    `);
}

const rentalsrepository ={
    verifyCustomer,
    verifyGame,
    listRentals,
    createRental,
    findRentals,
    
}

export default rentalsrepository;