const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function getRelance(id) {
    const sql = 'SELECT * FROM relance WHERE id_relance=' + id
    const res = await connexion.query(sql)
    if (!res.rows.length) {
        return {
            statut: 'NO',
            message: 'Aucune relance à cet id'
        }
    }
    return {
        statut: 'OK',
        relance: {
            ...res.rows[0],
            date_relance: moment(res.rows[0].date_relance).format('DD-MM-YYYY')
        }
    }
}

module.exports = getRelance