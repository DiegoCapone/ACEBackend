module.exports = app => {
    const validator = require("email-validator");
    const cadastrar = (req, res) => {
        if (!req.body.cnpj.trim() && req.body.cnpj.length != 14) {
            return res.status(400).send('cnpj é um campo obrigatório')
        }
        if (!validator.validate(req.body.email)) {
            return res.status(400).send('email é um campo obrigatório')
        }
        if (!req.body.razaoSocial.trim()) {
            return res.status(400).send('razaoSocial é um campo obrigatório')
        }
        if (!req.body.contato.trim()) {
            return res.status(400).send('contato é um campo obrigatório')
        }
        app.db('cliente')
            .insert({
                cnpj: req.body.cnpj,
                email: req.body.email,
                razaoSocial: req.body.razaoSocial,
                contato: req.body.contato
            })
            .then(() => res.status(200).json({ Status: 1, msg: 'cliente cadastrado com sucesso' }))
            .catch(err => res.status(400).json([{ Status: 2, msg: 'falha ao cadastra cliente' }, { ...err }]))
    }



    const getCliente = (req, res) => {
        app.db('cliente')
            .then(cliente => res.json(cliente))
            .catch(err => res.status(400).json(err))
    }

    const getClienteId = (req, res) => {
        app.db('cliente')
            .where({ id: req.params.id })
            .first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(400).json(err))
    }

    const atualizar = (req, res) => {
        app.db('cliente')
            .where({ id: req.params.id })
            .update({
                cnpj: req.body.cnpj,
                email: req.body.email,
                razaoSocial: req.body.razaoSocial,
                contato: req.body.contato
            }, ['id'])
            .then(cliente => res.status(200).json({ cliente }))
            .catch(err => res.status(400).json(err))
    }

    // return { cadastrar, getCliente, getClienteCnpj, atualizar }
    return { cadastrar, getCliente, getClienteId, atualizar }

}