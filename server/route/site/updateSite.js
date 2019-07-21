const connexion = require('../../connexion/connexion')
const moment = require('moment')

async function updateSite(site) {
    let setSite = ''
    const id = site.id_site
    const sqlEx = 'SELECT * FROM site WHERE id_site=' + id
    const resEx = await connexion.query(sqlEx)
    if (!resEx.rows.length) {
        return {
            statut: 'NO_EX',
            message: 'Aucun site pour cet id'
        }
    }
    const name = site.name_site
    const url = site.url_site
    const cp = site.cp_site
    const debut = site.debut_hebergement
    const fin = site.fin_hebergement
    const relance = site.date_relance
    if (name) {
        const sqlVerifName = 'SELECT * FROM site WHERE name_site=' + connexion.escapeLiteral(name)
        const resVerifName = await connexion.query(sqlVerifName)
        if (resVerifName.rows.length) {
            return {
                statut: 'NO_NAME',
                message: 'Un site avec le même nom existe déjè'
            }
        }
        setSite += 'name_site=' + connexion.escapeLiteral(name)
    }
    if (url) {
        console.log('tt')
        const sqlVerifUrl = 'SELECT * FROM site WHERE url_site=' + connexion.escapeLiteral(url)
        const resVerifUrl = await connexion.query(sqlVerifUrl)
        if (resVerifUrl.rows.length) {
            return {
                statut : 'NO_URL',
                message: 'Un site avec la même url existe déjà'
            }
        }
        setSite += setSite ? ', url_site=' + connexion.escapeLiteral(url) : 'url_site=' +  connexion.escapeLiteral(url)
    }

    if (cp) {
        setSite += setSite ? ', cp_site=' + connexion.escapeLiteral(cp) : 'cp_site=' +  connexion.escapeLiteral(cp)
    }
    if(moment(debut).isAfter(moment(fin))) {
        return {
            statut: 'NO_HEB_1',
            message: 'La date de fin est antérieure à la date de début'
        }
    }
    if (debut && fin) {
        const sqlHeb = 'SELECT debut_hebergement, fin_hebergement FROM hebergement WHERE id_site=' + id + ' AND ( debut_hebergement >= '+ connexion.escapeLiteral(debut) + ' OR fin_hebergement >= ' + connexion.escapeLiteral(fin) + ')'
        const resHeb = await connexion.query(sqlHeb)
        if (resHeb.rows.length) {
            return {
                statut: 'NO_HEB_2',
                message: 'UNe date de début ou/et de fin d\'hébergement dans la base de donnée est supérieure ou égale à celle que vous avez saisie pour ce site'
            }
        }
    }

    if (relance) {
        const verifRel = 'SELECT * FROM relance WHERE id_site =' + id + ' AND date_relance >=' + connexion.escapeLiteral(relance)
        const resRel = await connexion.query(verifRel)
        if(resRel.rows.length) {
            return {
                statut: 'NO_REL',
                message: 'Une date de relance supérieure existe, veuillez en choisir une encore plus grande pour ce site'
            }
        } 
    }

    if (name || url || cp) {
        const sqlSite = 'UPDATE site SET ' + setSite + ' WHERE id_site=' + id
        await connexion.query(sqlSite)
    }

    if(debut && fin) {
        const sqlInsertHeb = 'INSERT INTO hebergement (id_site, debut_hebergement, fin_hebergement) VALUES (' + id + ', ' + connexion.escapeLiteral(debut) + ', ' + connexion.escapeLiteral(fin) + ')'
        await connexion.query(sqlInsertHeb)
    }
    if (relance) {
        const sqlRel = 'INSERT INTO relance (id_site, date_relance) VALUES (' + id +', ' + connexion.escapeLiteral(relance) + ')'
        await connexion.query(sqlRel)        
    }

    const sqlSite = `
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
                    SELECT date_relance FROM relance WHERE site.id_site=relance.id_site ORDER BY date_relance  DESC LIMIT 1
                ) AS REL ON TRUE
                LEFT OUTER JOIN LATERAL (
                    SELECT debut_hebergement FROM hebergement WHERE site.id_site=hebergement.id_site ORDER BY debut_hebergement LIMIT 1
                ) AS HEBP ON TRUE
            WHERE site.id_site=${id}
        `
    const resSite = await connexion.query(sqlSite)
    return {
        statut: 'OK',
        site: {
            ...resSite.rows[0],
            date_debut_premiere_hebergement: moment(resSite.rows[0].date_debut_premiere_hebergement).format('DD-MM-YYYY'),
            date_debut_hebergement: moment(resSite.rows[0].date_debut_hebergement).format('DD-MM-YYYY'),
            date_fin_hebergement: moment(resSite.rows[0].date_fin_hebergement).format('DD-MM-YYYY'),
            date_relance: resSite.rows[0].date_relance ? moment(resSite.rows[0].date_relance).format('DD-MM-YYYY') : '',
        },
        message: 'Le site a bien été mis à jour'
    }                
}

module.exports = updateSite