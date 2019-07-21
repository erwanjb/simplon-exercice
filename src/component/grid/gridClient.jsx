import React from "react";
import Grid from './grid'
import * as ReactRedux from 'react-redux'
import { Link } from "react-router-dom";
import { getAllClient, deleteClient } from './../../store/action/index'

class GridClient extends React.Component {
    componentDidMount() {
        if(!this.props.client.length) {
            this.props.getAllClient()
        }
    }

    delete(id) {
      this.props.deleteClient(id)
    }

    render() {
        return (
            <div>
                <Link to={"/client/" + NaN}>Ajouter un nouveau client</Link>
                <h2>Liste des clients</h2>
                <Grid dataSource={this.props.client} actionSource={ [ { title: 'modification', action:(_text, record) => (<Link to={"/client/" + record.id_client}>Modifier</Link>)}, { title: 'fiche client', action:(_text, record) => (<Link to={"/fiche_client/" + record.id_client}>ouvrir fiche client</Link>)}, { title: 'suppression', action: (_text, record) =><a onClick={this.delete.bind(this, record.id_client)}>Supprimer</a>}] }></Grid>
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
          getAllClient: getAllClient.bind(null, dispatch),
          deleteClient: deleteClient.bind(null, dispatch)
        }
      }
)(GridClient)