import React from 'react'
import * as ReactRedux from 'react-redux'
import { addSite, updateSite, getAllClient } from '../../store/action/index'
import { Link } from "react-router-dom";
import axios from '../../axiosConf';
import ComboBox from '../comboBox/comboBox'
import moment from 'moment'
import './ficheSite.css'
import toaster from 'toastr'

class FicheClient extends React.Component {
    state = {
        mode: this.props.match.params.mode,
        id: parseInt(this.props.match.params.id_site),
        idClient: NaN,
        oldName: '',
        name:  '',
        oldUrl: '',
        url: '',
        oldCp: '',
        cp: '',
        oldDebut: '',
        debut: '',
        oldFin: '',
        fin: '',
        oldRelance: '',
        relance: '',
        disabled: true,
        disabledAdd: true,
        debutMin:  '',
        debutMax: '',
        finMin: '',
        finMax: ''
    }

    recupIdClient(value) {
        if (value) {
            this.setState({disabled: false})
            this.setState({idClient: value})
        }
    }

    handleChange(prop, event) {
        const state = {}
        state[prop] = event.target.value
        this.setState(state, () => {
            if (this.state.name && this.state.idClient && this.state.url && this.state.cp && this.state.debut && this.state.fin) {
                if(moment(this.state.debut).isBefore(moment(this.state.fin))) {
                    this.setState({disabledAdd: false})
                }
            }
        });
        if (prop === 'debut') {
            this.setState({finMin: event.target.value})
        }
        if(prop === 'fin') {
            this.setState({debutMax: event.target.value})
        }
    }

    submitAdd() {
        this.props.addSite({
            name_site: this.state.name,
            id_client: this.state.idClient,
            url_site: this.state.url,
            cp_site: this.state.cp,
            debut_hebergement: this.state.debut,
            fin_hebergement: this.state.fin,
            date_relance: this.state.relance
        })
    }

    submitUpdate() {
        if (this.state.name === this.state.oldName && this.state.url === this.state.oldUrl && this.state.cp === this.state.oldCp && this.state.debut === this.state.oldDebut && this.state.fin === this.state.oldFin && this.state.relance === this.state.oldRelance) {

        } else {
            const name_site = (this.state.name === this.state.oldName) ? null : this.state.name
            const url_site = (this.state.url === this.state.oldUrl) ? null : this.state.url
            const cp_site = (this.state.cp === this.state.oldCp) ? null : this.state.cp
            const debut_hebergement = (this.state.debut === moment(this.state.oldDebut, 'DD-MM-YYYY').format('YYYY-MM-DD')) ? null : this.state.debut
            const fin_hebergement = (this.state.fin === moment(this.state.oldFin, 'DD-MM-YYYY').format('YYYY-MM-DD')) ? null : this.state.fin
            const date_relance = (this.state.relance === moment(this.state.oldRelance, 'DD-MM-YYYY').format('YYYY-MM-DD')) ? null : this.state.relance
            const id_site = this.state.id
            this.props.updateSite({
                id_site,
                name_site,
                url_site,
                cp_site,
                debut_hebergement,
                fin_hebergement,
                date_relance,
            })
        }
    }

    componentDidMount() { 
        if (!this.props.client.length) {
            this.props.getAllClient()
        }
        const id_site = parseInt(this.props.match.params.id_site)
        if (id_site) {
            axios({
                method: 'get',
                url: '/site/getSite/' + id_site
            })
            .then(res => {
                if ( res.data.statut === 'OK') {
                    const site = res.data.site
                    this.setState({idClient: site.id_client})
                    this.setState({name: site.name_site});
                    this.setState({oldName: site.name_site});   
                    this.setState({url: site.url_site});   
                    this.setState({oldUrl: site.url_site});   
                    this.setState({cp: site.cp_site});   
                    this.setState({oldCp: site.cp_site});   
                    this.setState({debut: moment(site.debut_hebergement, 'DD-MM-YYYY').format('YYYY-MM-DD')});   
                    this.setState({oldDebut: site.debut_hebergement}, () => {
                        this.setState({debutMin: moment(site.debut_hebergement, 'DD-MM-YYYY').format('YYYY-MM-DD')})
                    });   
                    this.setState({fin: moment(site.fin_hebergement, 'DD-MM-YYYY').format('YYYY-MM-DD')});   
                    this.setState({oldFin: site.fin_hebergement}, () => {
                        this.setState({finMin: moment(site.fin_hebergement, 'DD-MM-YYYY').format('YYYY-MM-DD')})
                    });   
                    this.setState({relance: site.date_relance ? moment(site.date_relance, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''});   
                    this.setState({oldRelance: site.date_relance});
                    this.setState({disabledAdd: false})
                    this.setState({disabled: false})   
                } else {
                    toaster.warning(res.data.message)
                }
            })
        }
    }

    render() {
        return (
        <div>
            <h2>Fiche site</h2>
            {(parseInt(this.props.match.params.id_site)) ? <h3>le site à modifier:{this.state.oldName}</h3> : null}
            <div className="content">
                <input disabled={this.state.disabled} type="text" placeholder="nom du site" value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
                <div className="combo">
                    <span>Choisir un client : </span>
                    <ComboBox mode={this.state.mode} comboValue={(this.state.idClient)} recupChange={this.recupIdClient.bind(this)} dataSelect={this.props.client.map(client => {
                        return {
                            value: client.id_client,
                            displayField: client.name_client
                        }
                    })}></ComboBox>
                </div>
                {(parseInt(this.state.id)) ? <h3>l'url à modifier:{this.state.oldUrl}</h3> : null}
                <input disabled={this.state.disabled} type="text" placeholder="url du site" value={this.state.url} onChange={this.handleChange.bind(this, 'url')} />
                {(parseInt(this.state.id)) ? <h3>le cp à modifier:{this.state.oldCp}</h3> : null}
                <input disabled={this.state.disabled} type="text" placeholder="cp du site" value={this.state.cp} onChange={this.handleChange.bind(this, 'cp')} />
                {(parseInt(this.state.id)) ? <h3>la nouvelle date de début d'hébergement doit être supérieure à : {this.state.oldDebut}</h3> : null}
                <div>
                    <label htmlFor="debut">date de début d'hébergement : </label>
                    <input disabled={this.state.disabled} id="debut" type="date" min={this.state.debutMin} max={this.state.debutMax} value={this.state.debut} onChange={this.handleChange.bind(this, 'debut')} />
                </div>
                {(parseInt(this.state.id)) ? <h3>la nouvelle date de début d'hébergement doit être supérieure à : {this.state.oldFin}</h3> : null}
                <div>
                    <label  htmlFor="fin">date de fin d'hébergement : </label>
                    <input disabled={this.state.disabled} id="fin" type="date" min={this.state.finMin} max={this.state.findMax} value={this.state.fin} onChange={this.handleChange.bind(this, 'fin')} />
                </div>
                {(parseInt(this.state.id)) ? <h3>la nouvelle date de relance doit être supérieure à : {this.state.oldRelance}</h3> : null}
                <div>
                    <label htmlFor="relance">date de relance : </label>
                    <input disabled={this.state.disabled} id="relance" type="date" min={this.state.oldRelance ? moment(this.state.oldRelance, 'DD-MM-YYYY').format('YYYY-MM-DD') : ''} value={this.state.relance} onChange={this.handleChange.bind(this, 'relance')} />
                </div>
                {(!parseInt(this.state.id)) ? <p>Tous les champs sont obligatoires sauf la date de relance</p> : null}
            </div>
            {(!parseInt(this.props.match.params.id_site)) ? <Link to="/site/"><button disabled={this.state.disabledAdd} onClick={this.submitAdd.bind(this)}>ajouter site</button></Link> : <Link onClick={this.refresh} to="/site/"><button onClick={this.submitUpdate.bind(this)}>modifier site</button></Link> }
        </div>
        )
    }
}

export default ReactRedux.connect( 
    (state) => {
        return {
            client: state.client
        }
    },
    (dispatch) => {
      return {
        addSite: addSite.bind(null, dispatch),
        updateSite: updateSite.bind(null, dispatch),
        getAllClient: getAllClient.bind(null, dispatch)
      }
    }
)(FicheClient)