const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function addRelance(relance) {
    const verif = 'SELECT * FROM relance WHERE date_relance>=' + connexion.escapeLiteral(moment(relance.date_relance).format('YYYY-MM-DD')) + ' AND id_site=' + relance.id_site
    const resVerif = await connexion.query(verif)
    if (resVerif.rows.length) {
        return {
            statut: 'NO',
            message: 'Une relance avec une date supérieure existe pour ce site, choississez une date plus avancée' 
        }
    }
    const sql = 'INSERT INTO relance (id_site, date_relance) VALUES (' + relance.id_site + ', ' + connexion.escapeLiteral(moment(relance.date_relance).format('YYYY-MM-DD')) + ')'
    await connexion.query(sql)
    const sqlSelect = 'SELECT relance.id_relance, site.name_site, relance.date_relance FROM relance INNER JOIN site ON relance.id_site=site.id_site WHERE relance.id_site=' + relance.id_site + ' AND date_relance=' + connexion.escapeLiteral(moment(relance.date_relance).format('YYYY-MM-DD'))
    const resSelect = await connexion.query(sqlSelect)
    return {
        statut: 'OK',
        relance: {
            ...resSelect.rows[0],
            date_relance: moment(resSelect.rows[0]).format('DD-MM-YYYY')
        },
        message: 'La relance a été ajouté'
    }
}

module.exports = addRelance