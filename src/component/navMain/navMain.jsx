import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListClient from '../page/list_client'
import Site from '../page/site'
import FicheClient from '../page/ficheClient'
import Client from '../page/client'
import FicheSite from '../page/ficheSite'
import Relance from '../page/relance'
import FicheRelance from '../page/ficheRelance'
import './navMain.css'

class navMain extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/list_client/">Client</Link>
                            </li>
                            <li>
                                <Link to="/site/">Site</Link>
                            </li>
                            <li>
                                <Link to="/relance/">Relance</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route path="/client/:id_client" component={Client}/>
                    <Route path="/list_client/" component={ListClient} />
                    <Route path="/site/" component={Site} />
                    <Route path="/relance/" component={Relance} />
                    <Route path="/fiche_client/:id_client" component={FicheClient} />
                    <Route path="/fiche_site/:id_site/:mode" component={FicheSite} />
                    <Route path="/fiche_relance/:id_relance/:mode" component={FicheRelance} />
                </div>
            </Router>
        );
    }
}
  
export default navMain