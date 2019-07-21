import React from "react";
import Grid from './grid'
import * as ReactRedux from 'react-redux'
import { Link } from "react-router-dom";
import { getAllSite, deleteSite } from './../../store/action/index'

class GridSite extends React.Component {
    componentDidMount() {
        if(!this.props.site.length) {
          this.props.getAllSite()
        }
    }

    delete(id) {
      this.props.deleteSite(id)
    }

    render() {
        return (
            <div>
                <Link onClick={this.refresh} to={"/fiche_site/" + NaN +'/add'}>Ajouter un nouveau site</Link>
                <h2>Liste des sites</h2>
                <Grid dataSource={this.props.site} actionSource={ [ { title: 'modification', action:(_text, record) => (<Link to={"/fiche_site/" + record.id_site + '/edit'}>Modifier</Link>)}, { title: 'suppression', action: (_text, record) =><a onClick={this.delete.bind(this, record.id_site)}>Supprimer</a>}] }></Grid>
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
          getAllSite: getAllSite.bind(null, dispatch),
          deleteSite: deleteSite.bind(null, dispatch)
        }
      }
)(GridSite)