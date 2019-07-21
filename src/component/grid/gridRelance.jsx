import React from "react";
import Grid from './grid'
import * as ReactRedux from 'react-redux'
import { Link } from "react-router-dom";
import { getAllRelance, deleteRelance } from './../../store/action/index'

class GridRelance extends React.Component {
    componentDidMount() {
        if(!this.props.relance.length) {
            this.props.getAllRelance()
        }
    }

    delete(id) {
      this.props.deleteRelance(id)
    }

    render() {
        return (
            <div>
                <Link to={"/fiche_relance/" + NaN + '/add'}>Ajouter une relance</Link>
                <h2>Liste des relances</h2>
                <Grid dataSource={this.props.relance} actionSource={ [ { title: 'modification', action:(_text, record) => (<Link to={"/fiche_relance/" + record.id_relance + '/edit'}>Modifier</Link>)}, { title: 'suppression', action: (_text, record) =><a onClick={this.delete.bind(this, record.id_relance)}>Supprimer</a>}] }></Grid>
            </div>
        )
    }
}

export default ReactRedux.connect( 
    (state) => {
      return {
        relance: state.relance
      }
    },
    (dispatch) => {
        return {
            getAllRelance: getAllRelance.bind(null, dispatch),
            deleteRelance: deleteRelance.bind(null, dispatch)
        }
      }
)(GridRelance)