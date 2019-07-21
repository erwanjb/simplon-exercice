import axios from './../../axiosConf/index'
import toaster from 'toastr'

export function addClient(dispatch, client) {
    axios({
        method: 'post',
        url: '/client/addClient',
        data: {
            client
        }
    }).then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: "ADD_CLIENT",
                client: res.data.client
            });
            toaster.success(res.data.message)
        } else if (res.data.statut === 'NO') {
            toaster.warning(res.data.message)
        }
    })
}

export function addSite(dispatch, site) {
    axios({
        method: 'post',
        url: '/site/addSite',
        data: {
            site
        }
    }).then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: "ADD_SITE",
                site :res.data.site
            });
            toaster.success(res.data.message)
        } else if(res.data.statut === 'NO_NAME' || res.data.statut === 'NO_URL') {
            toaster.warning(res.data.message)
        }
    })
}

export function addRelance(dispatch, relance) {
    axios({
        method: 'post',
        url: '/relance/addRelance',
        data: {
            relance
        }
    }).then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: "ADD_RELANCE",
                relance: res.data.relance
            });
            getAllSite(dispatch)
            toaster.success(res.data.message)
        } else if (res.data.statut === 'NO') {
            toaster.warning(res.data.message)
        }
    })
}

export function getAllClient(dispatch) {
    
    axios({
        method: 'get',
        url: '/client/getAllClient'
    })
    .then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: 'GET_ALL_CLIENT',
                client: res.data.client
            })
        }
    })
}

export function getAllSite(dispatch) {
    axios({
        method: 'get',
        url: '/site/getAllSite'
    })
    .then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: 'GET_ALL_SITE',
                site: res.data.site
            })
        }
    })
}

export function getAllRelance(dispatch) {
    axios({
        method: 'get',
        url: '/relance/getAllRelance'
    })
    .then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: 'GET_ALL_RELANCE',
                relance: res.data.relance
            })
        }
    })
}

export function updateClient(dispatch, client) {
    axios({
        method: 'put',
        url: '/client/updateClient',
        data: {
            client
        }
    })
    .then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: 'UPDATE_CLIENT',
                client: res.data.client
            })
            getAllSite(dispatch)
            getAllRelance(dispatch)
            toaster.success(res.data.message)
        } else if (res.data.statut === 'NO_EX' || res.data.statut === 'NO'){
            toaster.warning(res.data.message)
        }
    })
}

export function updateSite(dispatch, site) {
    axios({
        method: 'put',
        url: '/site/updateSite',
        data: {
            site
        }
    })
    .then(res => {
        if(res.data.statut === 'OK') {
            dispatch({
                type: 'UPDATE_SITE',
                site: res.data.site
            })
            getAllRelance(dispatch)
            toaster.success(res.data.message)
        } else {
            toaster.warning(res.data.message)
        }
    })
}

export function updateRelance(dispatch, relance) {
    axios({
        method: 'put',
        url: '/relance/updateRelance',
        data: {
            relance
        }
    })
    .then(res => {
        if (res.data.statut === 'OK') {
            dispatch({
                type: 'UPDATE_RELANCE',
                relance: res.data.relance
            })
            getAllSite(dispatch)
            toaster.success(res.data.message)
        } else {
            toaster.warning(res.data.message)
        }
    })
}

export function deleteClient(dispatch, id) {
    axios({
        method: 'delete',
        url: '/client/deleteClient/' + id,
    })
    .then(res => {
        if (res.data.statut === 'OK') {
            dispatch({
                type: 'DELETE_CLIENT',
                id
            })
            getAllSite(dispatch)
            getAllRelance(dispatch)
            toaster.success(res.data.message)
        } else {
            toaster.warning(res.data.message)
        }
    })
}

export function deleteSite(dispatch, id) {
    axios({
        method: 'delete',
        url: '/site/deleteSite/' + id,
    })
    .then(res => {
        if (res.data.statut === 'OK') {
            dispatch({
                type: 'DELETE_SITE',
                id
            })
            getAllRelance(dispatch)
            toaster.success(res.data.message)
        } else {
            toaster.warning(res.data.message)
        }
    })
}

export function deleteRelance(dispatch, id) {
    axios({
        method: 'delete',
        url: '/relance/deleteRelance/' + id,
    })
    .then(res => {
        if (res.data.statut === 'OK') {
            dispatch({
                type: 'DELETE_RELANCE',
                id
            })
            getAllSite(dispatch)
            toaster.success(res.data.message)
        } else {
            toaster.warning(res.data.message)
        }
    })
}