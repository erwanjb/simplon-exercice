const connexion = require('../../connexion/connexion')

async function addClient (client) {
    const sqlVerif = 'SELECT * FROM client WHERE name_client=' + connexion.escapeLiteral(client)
    const findClientExisted = await connexion.query(sqlVerif)
    if (!findClientExisted.rows.length) {
        const sqlInsert = 'INSERT INTO client (name_client) VALUES ('+ connexion.escapeLiteral(client) +')'
        await connexion.query(sqlInsert)
        const sqlClient = await connexion.query(sqlVerif)
        return {
            statut: 'OK',
            client: sqlClient.rows[0],
            message: 'Le client a bien été ajouté'
        }
    } else {
        return {
            statut: 'NO',
            message: 'Un client du même nom existe déjà'
        }
    }
}

module.exports = addClient