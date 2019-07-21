import React from 'react'
import * as ReactRedux from 'react-redux'
import { addRelance, updateRelance, getAllSite } from '../../store/action/index'
import { Link } from "react-router-dom";
import axios from '../../axiosConf'
import ComboBox from '../comboBox/comboBox'
import moment from 'moment'
import toaster from 'toastr'

class FicheRelance extends React.Component {
    state = {
        mode: this.props.match.params.mode,
        id: parseInt(this.props.match.params.id_relance),
        idSite: NaN,
        date:  '',
        olDate: '',
        disabled: true,
        disabledAdd: true,
    }

    handleChangeDate(event) {
        const value =event.target.value
        this.setState({date: value}, () => {
            if (value) {
                this.setState({disabledAdd: false})
            }
        });
    }

    submitAdd() {
        if (this.state.idSite && this.state.date) {
            this.props.addRelance({
                id_site: this.state.idSite,
                date_relance: this.state.date
            })
        }
    }

    submitUpdate() {
        if (this.state.date !== this.state.oldDate) {
            const id = this.state.id
            this.props.updateRelance({
                id_relance: id,
                id_site: this.state.idSite,
                date_relance: this.state.date
            })
        }
    }

    componentDidMount() {
        if (!this.props.site.length) {
            this.props.getAllSite()
        }
        const id = this.state.id
        if (id) {
            axios({
                method: 'get',
                url: '/relance/getRelance/' + id
            })
            .then(res => {
                if ( res.data.statut === 'OK') {
                    const relance = res.data.relance
                    this.setState({idSite: relance.id_site})
                    this.setState({date: moment(relance.date_relance, 'DD-MM-YYYY').format('YYYY-MM-DD')});
                    this.setState({oldDate: relance.date_relance});
                    this.setState({disabled: false})
                 
                } else {
                    toaster.warning(res.data.message)
                }
            })
        }
    }

    recupIdSite(value) {
        if (value) {
            this.setState({disabled: false})
            this.setState({idSite: value})
        }
    }

    render() {
        return (
        <div>
            <h2>Fiche Relance</h2>
            <span>Site : </span>
            <ComboBox mode={this.state.mode} comboValue={(this.state.idSite)} recupChange={this.recupIdSite.bind(this)} dataSelect={this.props.site.map(site => {
                return {
                    value: site.id_site,
                    displayField: site.name_site
                }
            })}></ComboBox>
            {this.state.id ? <h3>la date à modifier:{this.state.oldDate}</h3> : null}
            <input disabled={this.state.disabled} type="date" placeholder="date de la relance" value={this.state.date} onChange={this.handleChangeDate.bind(this)} min={moment(this.state.olDate, 'DD-MM-YYYY').format('YYYY-MM-DD')} />
            {!this.state.id ? <Link to="/relance/"><button disabled={this.state.disabledAdd} onClick={this.submitAdd.bind(this)}>ajouter relance</button></Link> : <Link to="/relance/"><button onClick={this.submitUpdate.bind(this)}>modifier relance</button></Link> }
        </div>
        )
    }
}

export default ReactRedux.connect( 
    (state) => {
        return {
            site: state.site
        }
    },
    (dispatch) => {
      return {
        addRelance: addRelance.bind(null, dispatch),
        updateRelance: updateRelance.bind(null, dispatch),
        getAllSite: getAllSite.bind(this, dispatch)
      }
    }
)(FicheRelance)