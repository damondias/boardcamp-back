import dayjs from "dayjs";
import rentalsrepository from "../repositories/rentals.repository.js";

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body;
    const today = dayjs().format("YYYY-MM-DD");
    try {
        const existingCustomer = await rentalsrepository.verifyCustomer(customerId);
        if (existingCustomer.rowCount == 0) return res.sendStatus(400);

        const existingGame = await rentalsrepository.verifyGame(gameId);
        if (existingGame.rowCount == 0) return res.sendStatus(400);
        const game = existingGame.rows[0];
        
        const { rowCount: rentalsTotal} = await rentalsrepository.listRentals(gameId);
        if ( rentalsTotal > 0 && rentalsTotal <= game.stockTotal) return res.sendStatus(400);

        const originalPrice = daysRented*game.pricePerDay;
        await rentalsrepository.createRental(customerId, gameId, daysRented, originalPrice);
        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getrentals(req,res){
    const {customerId, gameId} = req.query;
    
    try {
        const rentals = await rentalsrepository.findRentals(customerId, gameId);
        res.send(rentals.rows);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function returnGame(req,res){
    const {id} = req.params;
    const today = dayjs().format('YYYY-MM-DD');

    try {
        const {rowCount: existingRental, rows: rentalGame } = await rentalsrepository.verifyRentalGame(id);
        if (existingRental ==0) return res.sendStatus(404);
        
        const { rentDate, daysRented, returnDate, originalPrice } = rentalGame[0];  
        if (returnDate != null) return res.sendStatus(400);

        const rentedTime = dayjs().diff(rentDate, 'day');
        if(rentedTime <= daysRented){

            await rentalsrepository.depositGame(today, null, id)
            return res.sendStatus(200);
        }

        const extraDays= rentedTime - daysRented;
        const priceDay = originalPrice/daysRented;
        const extraFee = priceDay*extraDays;
        
        await rentalsrepository.depositGame(today, extraFee, id);
        res.sendStatus(200);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteRental(req,res){
    const {id} = req.params;

    try {
        const {rowCount: existingRental, rows: rental} = await rentalsrepository.verifyRentalGame(id);
        if(existingRental == 0) return res.sendStatus(404)
    
        const {returnDate} = rental[0];
        if(returnDate == null) return res.sendStatus(400)
        
        await rentalsrepository.deleteRental(id);
        res.sendStatus(200);
               
    } catch (error) {
        res.status(500).send(error.message);
    }
}