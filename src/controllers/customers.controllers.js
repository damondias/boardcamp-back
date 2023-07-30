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

export async function getCustomers(req, res){

    try {
        const customers = await customersRepository.findCustomers();
        res.send(customers.rows);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getCustomer(req, res) {
    const { id } = req.params;

    try {
      const customer = await customersRepository.findCustomer(id);
      if (customer.rowCount === 0) return res.sendStatus(404);

      res.send(customer.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function putCustomer(req,res){
    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.body;

    try {
        const existingCpf = await customersRepository.verifyCpf(cpf,id);
        if (existingCpf.rowCount > 0) return res.sendStatus(409);

        await customersRepository.updateCustomer(name, phone, cpf, birthday, id);
        res.sendStatus(200);        
    } catch (error) {
        res.status(500).send(error.message);
    }
}