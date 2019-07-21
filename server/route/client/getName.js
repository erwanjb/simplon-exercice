const  connexion = require('../../connexion/connexion') 

async function getName (id) {
    const sql = 'SELECT name_client FROM client WHERE id_client=' + connexion.escapeLiteral(id)
    const result = await connexion.query(sql)
    if (!result.rows.length) {
        return {
            statut: 'NO',
            message: 'Aucun client a cet id'
        }
    }
    return {
        statut: 'OK',
        name: result.rows[0].name_client
    }
}

module.exports = getName