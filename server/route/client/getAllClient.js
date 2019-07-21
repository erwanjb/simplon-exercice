const connexion = require('../../connexion/connexion')

async function getAllClient () {
    const sql = 'SELECT * FROM client '
    const findClients = await connexion.query(sql)
    const clients = findClients.rows
    return {
        statut: 'OK',
        client: clients
    }
}

module.exports = getAllClient