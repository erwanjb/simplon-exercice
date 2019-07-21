const connexion = require('../../connexion/connexion')

async function deleteClient(id) {
    const sqlEx = 'SELECT * FROM client WHERE id_client=' + id
    const resEx = await connexion.query(sqlEx)
    if (!resEx.rows.length) {
        return {
            statut: 'NO',
            message: 'aucun client a cet id'
        }
    }
    const sqlRel = 'DELETE FROM relance WHERE id_site IN (SELECT id_site FROM site WHERE id_client=' + id + ')'
    const sqlHeb = 'DELETE FROM hebergement WHERE id_site IN (SELECT id_site FROM site WHERE id_client=' + id + ')'
    const sqlSite = 'DELETE FROM site WHERE id_client=' + id 
    await connexion.query(sqlRel)
    await connexion.query(sqlHeb)
    await connexion.query(sqlSite)
    const sql = 'DELETE FROM client WHERE id_client=' + id
    await connexion.query(sql)
    return {
        statut: 'OK',
        message: 'le client a bien été supprimé'
    }
}

module.exports = deleteClient