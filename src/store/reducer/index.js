export default function reducer(state, action) {
    let client = [...state.client]
    let site = [...state.site]
    let relance = [...state.relance]
    switch (action.type) {
        case "ADD_CLIENT":
            client.push(action.client)
            return {
                ...state,
                client
            }
        case "ADD_SITE":
            site.push(action.site)
            return {
                ...state,
                site
            }
        case "ADD_RELANCE":
            relance.push(action.relance)
            return {
                ...state,
                relance
            }
        case 'GET_ALL_CLIENT':
            client = action.client
            return {
                ...state,
                client
            }
        case 'GET_ALL_SITE':
            site = action.site
            return {
                ...state,
                site
            }
        case 'GET_ALL_RELANCE':
            relance = action.relance
            return {
                ...state,
                relance
            }
        case 'UPDATE_CLIENT':
            const clientToUptdate = client.find(client => client.id_client === action.client.id_client)
            const indexClient = client.indexOf(clientToUptdate)
            client.splice(indexClient, 1, action.client)
            return {
                ...state,
                client
            }
        case 'UPDATE_SITE':
            const siteToUptdate = site.find(site => site.id_site === action.site.id_site)
            const indexSite = site.indexOf(siteToUptdate)
            site.splice(indexSite, 1, action.site)
            return {
                ...state,
                site
            }
        case 'UPDATE_RELANCE':
            const relanceToUptdate = relance.find(relance => relance.id_relance === action.relance.id_relance)
            const indexRelance = relance.indexOf(relanceToUptdate)
            relance.splice(indexRelance, 1, action.relance)
            return {
                ...state,
                relance
            }
        case 'DELETE_CLIENT':
            const clientToDelete = client.find(client => client.id_client === action.id)
            const indexDelClient = client.indexOf(clientToDelete)
            client.splice(indexDelClient, 1) 
            return {
                ...state,
                client
            }
        case 'DELETE_SITE':
            const siteToDelete = site.find(site => site.id_site === action.id)
            const indexDelSite = site.indexOf(siteToDelete)
            site.splice(indexDelSite, 1) 
            return {
                ...state,
                site
            }
        case 'DELETE_RELANCE':
            const relanceToDelete = relance.find(relance => relance.id_relance === action.id)
            const indexDelRelance = relance.indexOf(relanceToDelete)
            relance.splice(indexDelRelance, 1) 
            return {
                ...state,
                relance
            }
        default:
            return state
    }
}