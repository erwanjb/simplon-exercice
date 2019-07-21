const connexion = require('../../connexion/connexion')
const moment =require('moment')

async function getSite(id) {
    const sql = `
    SELECT 
        site.id_client,
        site.name_site,
        site.url_site,
        site.cp_site,
        HEB.debut_hebergement AS date_debut_hebergement,
        HEB.fin_hebergement AS date_fin_hebergement,
        REL.date_relance
    FROM
        site
        LEFT OUTER JOIN LATERAL (
            SELECT debut_hebergement, fin_hebergement FROM hebergement WHERE site.id_site=hebergement.id_site ORDER BY debut_hebergement DESC LIMIT 1
        ) AS HEB ON TRUE
        LEFT OUTER JOIN LATERAL (
            SELECT date_relance FROM relance WHERE site.id_site=relance.id_site ORDER BY date_relance DESC LIMIT 1
        ) AS REL ON TRUE
    WHERE
        site.id_site=${id} 
    `
    const result = await connexion.query(sql)
    if (!result.rows.length) {
        return {
            message: 'Aucun site a cet id',
            statut: 'NO'
        }
    }
    const site = result.rows[0]
    return {
        statut: 'OK',
        site: {
            ...site,
            debut_hebergement: moment(site.date_debut_hebergement).format('DD-MM-YYYY'),
            fin_hebergement: moment(site.date_fin_hebergement).format('DD-MM-YYYY'),
            date_relance: site.date_relance ? moment(site.date_relance).format('DD-MM-YYYY') : null
        }
    }
}

module.exports = getSite