const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function getAllSite() {
    const sql = `
        SELECT 
            site.id_site,
            client.name_client as client,
            site.name_site,
            site.url_site,
            site.cp_site,
            HEBP.debut_hebergement AS date_debut_premiere_hebergement,
            HEB.debut_hebergement AS date_debut_hebergement,
            HEB.fin_hebergement AS date_fin_hebergement,
            REL.date_relance
        FROM
            site
            INNER JOIN client ON site.id_client=client.id_client
            LEFT OUTER JOIN LATERAL (
                SELECT debut_hebergement, fin_hebergement FROM hebergement WHERE site.id_site=hebergement.id_site ORDER BY debut_hebergement DESC LIMIT 1
            ) AS HEB ON TRUE
            LEFT OUTER JOIN LATERAL (
                SELECT date_relance FROM relance WHERE site.id_site=relance.id_site ORDER BY date_relance DESC LIMIT 1
            ) AS REL ON TRUE
            LEFT OUTER JOIN LATERAL (
                SELECT debut_hebergement FROM hebergement WHERE site.id_site=hebergement.id_site ORDER BY debut_hebergement LIMIT 1
            ) AS HEBP ON TRUE
    `
    const res = await connexion.query(sql)
    return {
        statut: 'OK',
        site: res.rows.map(elem => {
            return {
                ...elem,
                date_debut_premiere_hebergement: moment(elem.date_debut_premiere_hebergement).format('DD-MM-YYYY'),
                date_debut_hebergement: moment(elem.date_debut_hebergement).format('DD-MM-YYYY'),
                date_fin_hebergement: moment(elem.date_fin_hebergement).format('DD-MM-YYYY'),
                date_relance: elem.date_relance ? moment(elem.date_relance).format('DD-MM-YYYY') : null
            }
        })
    }
}

module.exports = getAllSite