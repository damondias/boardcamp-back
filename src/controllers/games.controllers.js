import gamesRepository from "../repositories/games.repository.js";

export async function postGame(req, res){
    const {name, image, stockTotal, pricePerDay} = req.body;

    try {
        const existingGame = await gamesRepository.verifyGame(name);
        if (existingGame.rowCount > 0) return res.sendStatus(409);
        
        await gamesRepository.createGame(name, image, stockTotal, pricePerDay);
        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getGames(req, res){
    const { name } = req.query; 

    try {
        const games = await gamesRepository.findGames(name);
        res.send(games.rows);

    } catch (error) {
        res.status(500).send(error.message);
    }

}