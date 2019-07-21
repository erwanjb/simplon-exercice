const connexion = require('../../connexion/connexion')

async function deleteRelance(id) {
    const sqlEx = 'SELECT * FROM relance WHERE id_relance=' + id
    const resEx = await connexion.query(sqlEx)
    if (!resEx.rows.length) {
        return {
            statut: 'NO',
            message: 'aucune relance a cet id'
        }
    }
    const sql = 'DELETE FROM relance WHERE id_relance=' + id
    await connexion.query(sql)
    return {
        statut: 'OK',
        message: 'La relance a bien été supprimé'
    }
}

module.exports = deleteRelance