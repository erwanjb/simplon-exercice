const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function getHebergement(id) {
    const sql = 'SELECT name_site, debut_hebergement, fin_hebergement FROM hebergement INNER JOIN site ON hebergement.id_site=site.id_site WHERE site.id_client=' + id
    const res = await connexion.query(sql)
    return {
        statut: 'OK',
        hebergement: res.rows.map(elem => {
            return {
                ...elem,
                debut_hebergement: moment(elem.debut_hebergement).format('DD-MM-YYYY'),
                fin_hebergement: moment(elem.fin_hebergement).format('DD-MM-YYYY')
            }
        })
    }
}

module.exports = getHebergement