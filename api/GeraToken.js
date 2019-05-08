const { authSecret } = require('../.env')
const jwt = require('jwt-simple')

module.exports = app => {
    const GeraToken = async (req, res) => {
        if (!req.body.cnpj) {
            return releaseEvents.status(400).json({ msg: 'cnpj não informado' })
        }

        const cliente = await app.db('cliente')
            .where({ cnpj: req.body.cnpj })
            .first()

        if (cliente) {
            res.json({
                token: jwt.encode(cliente, authSecret)
            })
        } else {
            res.json({
                msg: 'Error, CNPJ não cadastrado'
            })
        }
    }
    return { GeraToken }
}