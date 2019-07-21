const connexion = require('../../connexion/connexion')

async function updateClient(client) {
    const id_client = client.id_client
    const verif = 'SELECT * FROM client WHERE id_client=' + id_client
    const resVerif = await connexion.query(verif)

    if(!resVerif.rows.length) {
        return {
            statut: 'NO_EX',
            message: 'Aucun client n\'existe avec cet id'
        }
    }
    const sqlVerif = 'SELECT * FROM client WHERE name_client=' + connexion.escapeLiteral(client.name_client)
    const resAutherverif = await connexion.query(sqlVerif)
    if (resAutherverif.rows.length) {
        return {
            statut: 'NO',
            message: 'Un client avec le même nom existe déjà'
        }
    }
    
    const sql = 'UPDATE client set name_client=' + connexion.escapeLiteral(client.name_client) + ' WHERE id_client =' + id_client
    await connexion.query(sql)
    const sqlSelect = 'SELECT * FROM client WHERE id_client=' + id_client
    const result = await connexion.query(sqlSelect)
    return {
        statut: 'OK',
        client: result.rows[0],
        message: 'le client a bien été mis à jour'
    }
}

module.exports = updateClient