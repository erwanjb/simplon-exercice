const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function getRelance(id) {
    const verif = 'SELECT * from client WHERE id_client=' +id
    const resVerif = await connexion.query(verif)
    if (!resVerif.rows.length) {
        return {
            statut: 'NO',
            message: 'aucun client a cet id'
        }
    }
    
    const sql = 'SELECT name_site, date_relance FROM relance INNER JOIN site ON relance.id_site=site.id_site WHERE site.id_client=' + id
    const res = await connexion.query(sql)
    return {
        statut: 'OK',
        relance: res.rows.map(elem => {
            return {
                ...elem,
                date_relance: moment(elem.date_relance).format('DD-MM-YYYY')            }
        })
    }
}

module.exports = getRelance