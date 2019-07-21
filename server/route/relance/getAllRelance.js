const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function getAllRelance() {
    const sql = `
        SELECT
            relance.id_relance,
            site.name_site,
            relance.date_relance
        FROM
            relance
        INNER JOIN site ON relance.id_site=site.id_site
    `
    const res = await connexion.query(sql)
    res.rows = res.rows.map(elem => {
        return {
            ...elem,
            date_relance: moment(elem.date_relance).format('DD-MM-YYYY')
        }
    })
    return {
        statut: 'OK',
        relance: res.rows
    }
}

module.exports = getAllRelance