import React from 'react'
import * as ReactRedux from 'react-redux'
import { addClient, updateClient } from '../../store/action/index'
import { Link } from "react-router-dom";
import axios from '../../axiosConf';

class Client extends React.Component {
    state = {
        oldName: '',
        name:  ''
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    submitAdd() {
        if (this.state.name) {
            this.props.addClient(this.state.name)
        }
    }

    submitUpdate() {
        if (this.state.name !== this.state.oldName && this.state.name) {
            const id_client = parseInt(this.props.match.params.id_client)
            this.props.updateClient({
                id_client,
                name_client: this.state.name
            })
        }
    }

    componentDidMount() {
        const id_client = parseInt(this.props.match.params.id_client)
        if (id_client) {
            axios({
                method: 'get',
                url: '/client/getName/' + id_client
            })
            .then(res => {
                if ( res.data.statut === 'OK') {
                    this.setState({name: res.data.name});
                    this.setState({oldName: res.data.name});   
                }
            })
        }
    }

    render() {
        return (
        <div>
            <h2>Client</h2>
            {(parseInt(this.props.match.params.id_client)) ? <h3>le nom à modifier:{this.state.oldName}</h3> : null}
            <input type="text" placeholder="nom du client" value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
            {(!parseInt(this.props.match.params.id_client)) ? <Link onClick={this.refresh} to="/list_client/"><button onClick={this.submitAdd.bind(this)}>ajouter client</button></Link> : <Link onClick={this.refresh} to="/list_client/"><button onClick={this.submitUpdate.bind(this)}>modifier client</button></Link> }
        </div>
        )
    }
}

export default ReactRedux.connect( 
    null,
    (dispatch) => {
      return {
        addClient: addClient.bind(null, dispatch),
        updateClient: updateClient.bind(null, dispatch)
      }
    }
)(Client)