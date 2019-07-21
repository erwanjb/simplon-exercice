const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function updateRelance(relance) {
    const sqlEx = 'SELECT * FROM relance WHERE id_relance=' + relance.id_relance
    const resEx = await connexion.query(sqlEx)
    if (!resEx.rows.length) {
        return {
            statut: 'NO_EX',
            message: 'Aucune relance n\'existe pour cet id'
        }
    }
    const verif = 'SELECT * FROM relance WHERE date_relance>=' + connexion.escapeLiteral(moment(relance.date_relance).format('YYYY-MM-DD'))
    const resVerif = await connexion.query(verif)
    if (resVerif.rows.length) {
        return {
            statut: 'NO',
            message: 'Une relance avec une date supérieur existe pour le site'
        }
    }
    const sql = 'UPDATE relance SET date_relance=' + connexion.escapeLiteral(moment(relance.date_relance).format('YYYY-MM-DD')) + ' WHERE id_relance=' + relance.id_relance
    await connexion.query(sql)
    const sqlSelect = 'SELECT relance.id_relance, site.name_site, relance.date_relance FROM relance INNER JOIN site ON relance.id_site=site.id_site WHERE id_relance=' + relance.id_relance
    const res = await connexion.query(sqlSelect)
    return {
        statut: 'OK',
        relance: {
            ...res.rows[0],
            date_relance: moment(res.rows[0].date_relance).format('DD-MM-YYYY')
        },
        message: 'La relance a été modifiée'
    }
}

module.exports = updateRelance