import customersRepository from "../repositories/customers.repository.js";

export async function postCustomer(req,res){
    const {name, phone, cpf, birthday} = req.body;

    try {
        const existingCpf = await customersRepository.verifyGame(cpf);
        if(existingCpf.rowCount > 0) return res.sendStatus(409);
        
        await customersRepository.createCustomer(name, phone, cpf, birthday);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}