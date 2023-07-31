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