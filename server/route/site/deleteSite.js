const connexion = require('../../connexion/connexion')

async function deleteSite(id) {
    const sqlEx = 'SELECT * FROM site WHERE id_site=' + id
    const resEx = await connexion.query(sqlEx)
    if (!resEx.rows.length) {
        return {
            statut: 'NO',
            message: 'aucun site a cet id'
        }
    }
    const sqlHeb = 'DELETE FROM hebergement WHERE id_site=' + id 
    const sqlRel = 'DELETE FROM relance WHERE id_site=' + id
    const sql = 'DELETE FROM site WHERE id_site=' + id

    await connexion.query(sqlHeb)
    await connexion.query(sqlRel)
    await connexion.query(sql)

    return {
        statut: 'OK',
        message: 'Le site a bien été supprimé'
    }
}

module.exports = deleteSite