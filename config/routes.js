module.exports = app => {
    app.route('/cliente')
        .post(app.api.cliente.cadastrar)
        .get(app.api.cliente.getCliente)

    app.route('/cliente/:id')
        .put(app.api.cliente.atualizar)
        .get(app.api.cliente.getClienteId)

    app.post('/GeraToken', app.api.GeraToken.GeraToken)
}