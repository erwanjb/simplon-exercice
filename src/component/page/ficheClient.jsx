import React from 'react'
import Grid from '../grid/grid'
import axios from '../../axiosConf'

class FicheClient extends React.Component {
    state = {
        name: '',
        id: parseInt(this.props.match.params.id_client),
        hebergement: [],
        relance: []
    }
    componentDidMount() {
        if(this.state.id) {
            axios({
                method: 'get',
                url: '/client/getName/' + this.state.id
            })
            .then(res => {
                if ( res.data.statut === 'OK') {
                    this.setState({name: res.data.name})  
                }
            })
            axios({
                method: 'get',
                url: '/client/getHebergement/' + this.state.id
            })
            .then(res =>{
                if (res.data.statut === 'OK') {
                    this.setState({hebergement: res.data.hebergement})
                }
            })

            axios({
                method: 'get',
                url: '/client/getRelance/' + this.state.id
            })
            .then(res =>{
                if (res.data.statut === 'OK') {
                    this.setState({relance: res.data.relance})
                }
            })
        }
    }
    render() {
        console.log(this.state.hebergement, this.state.relance)
        return (
            <div>
                <h2>Fiche Client : {this.state.name}</h2>
                <h3>Liste de tous les hebergements</h3>
                <Grid dataSource={this.state.hebergement} actionSource={[]}></Grid>
                <h3>Liste de toutes les relances</h3>
                <Grid dataSource={this.state.relance} actionSource={[]}></Grid>
            </div>
        )
    }
}

export default FicheClient