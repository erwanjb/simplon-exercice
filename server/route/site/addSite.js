const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function addSite(site) {
    const sqlVerif = 'SELECT * FROM site WHERE name_site=' + connexion.escapeLiteral(site.name_site)
    const resVerif = await connexion.query(sqlVerif)
    if (resVerif.rows.length) {
        return {
            statut: 'NO_NAME',
            message: 'Un site avec le même nom existe déjà'
        }
    }
    const sqlVerif2 = 'SELECT * FROM site WHERE url_site=' + connexion.escapeLiteral(site.url_site)
    const resVerif2 = await connexion.query(sqlVerif2)
    if (resVerif2.rows.length) {
        return {
            statut: 'NO_URL',
            message: 'Un site avec la même url existe déjà'
        }
    }
    const sql = `INSERT INTO site (name_site, id_client, url_site, cp_site) VALUES (${connexion.escapeLiteral(site.name_site)}, ${site.id_client}, ${connexion.escapeLiteral(site.url_site)}, ${connexion.escapeLiteral(site.cp_site)})`
    await connexion.query(sql)
    const sqlSelect = 'SELECT * FROM site WHERE name_site=' + connexion.escapeLiteral(site.name_site) +' AND url_site=' + connexion.escapeLiteral(site.url_site)
    const resFound = await connexion.query(sqlSelect)
    const idFound = resFound.rows[0].id_site
    const sqlHeberg = `INSERT INTO hebergement (id_site, debut_hebergement, fin_hebergement) VALUES (${idFound}, ${connexion.escapeLiteral(site.debut_hebergement)}, ${connexion.escapeLiteral(site.fin_hebergement)})`
    await connexion.query(sqlHeberg)
    if (site.date_relance) {
        const sqlRelance = 'INSERT INTO relance (id_site, date_relance) VALUES (' + idFound + ', ' + connexion.escapeLiteral(site.date_relance) + ')'
        await connexion.query(sqlRelance)
    }
    const sqlSelectHeberg = 'SELECT * FROM hebergement WHERE id_site=' + idFound
    const sqlSelectRelance = 'SELECT * FROM relance WHERE id_site=' + idFound
    const resSelectHeb = await connexion.query(sqlSelectHeberg)
    const resSelectRelance = await connexion.query(sqlSelectRelance)
    const sqlClient = 'SELECT name_client FROM client WHERE id_client=' + site.id_client
    const resClient = await connexion.query(sqlClient)

    return {
        statut: 'OK',
        site: {
            id_site: resFound.rows[0].id_site,
            client:  resClient.rows[0].name_client,
            name_site: resFound.rows[0].name_site,
            url_site: resFound.rows[0].url_site,
            cp_site: resFound.rows[0].cp_site,
            date_debut_premiere_hebergement: moment(resSelectHeb.rows[0].debut_hebergement).format('DD-MM-YYYY'),
            date_debut_hebergement: moment(resSelectHeb.rows[0].debut_hebergement).format('DD-MM-YYYY'),
            date_fin_hebergement: moment(resSelectHeb.rows[0].fin_hebergement).format('DD-MM-YYYY'),
            date_relance: resSelectRelance.rows.length ? moment(resSelectRelance.rows[0].date_relance).format('DD-MM-YYYY'): null
        },
        message: 'Le site a été ajouté'
    }
}

module.exports = addSite