import React from 'react'
import GridClient from '../grid/gridClient'

class ListClient extends React.Component {

    render() {
        return (
        <div>
            <h2>Client</h2>
            <GridClient></GridClient>
        </div>
        )
    }
}

export default ListClient