import { db } from "../database/database.connection.js";

async function verifyGame(cpf){
    return db.query(`
        SELECT *
            FROM customers 
            WHERE cpf = $1;
    `, [cpf]);
}

async function createCustomer(name, phone, cpf, birthday){
    return db.query(`
        INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);
    `,[name, phone, cpf, birthday]);
}

const customersRepository ={
    verifyGame,
    createCustomer,
}

export default customersRepository;